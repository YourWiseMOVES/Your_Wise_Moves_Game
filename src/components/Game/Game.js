import React, { Component } from 'react';
import { connect } from 'react-redux';

//game component imports
import GameRounds from './GameRounds/GameRounds';
import PostGame from './PostGame/PostGame';
import GameStart from './GameStart/GameStart';
import PreGame from './PreGame/PreGame';

//game start imports
import axios from 'axios';
import io from 'socket.io-client';
import receiver from './modules/receiver';
let socket;

class Game extends Component {

  state = {
    gameCode: '',
  }

  createGame = () => { //function to create the game, triggers the game start on server
    console.log('in create game');
    axios({
      method: 'POST',
      data: { id: this.props.state.user.userReducer.id },
      url: '/game/start',
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          gameCode: response.data.code,
        })
        this.props.dispatch({ type: 'SET_GAME', payload: response.data.gameId })
        socket = io.connect(`/${this.state.gameCode}`);
        //socket will need to be global 
        socket.on('moves', data => {
          try {
            console.log('Back from server with', data);
            let action = receiver(data);
            this.props.dispatch(action);
          } catch (err) {
            console.log('Error in moves handler', err);
          }
        })
        socket.on('join', data => {
          this.props.dispatch({ type: 'FETCH_PLAYERS', payload: this.props.state.game.gameId })
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  endGame = () => {
    axios({
      method: 'POST',
      data: { id: this.props.state.user.userReducer.id },
      url: '/game/end',
    })
  }

  advanceStage = newGameState => {
    socket.emit('moves', {
      type: 'advance',
      data: {
        newGameState,
      },
      facilitatorId: this.props.state.user.userReducer.id,
    })
  }

  joinGame = (playerName, code) => {
    //socket stuff here
    try {
      socket = io.connect(`/${code}`);
      socket.on('moves', data => {
        try {
          console.log('Back from server with', data);
          let action = receiver(data);
          if (data.type === 'advance') {
            this.props.dispatch({
              type: 'UPDATE_ROUND_NUMBER',
              payload: data.data.newGameState[0],
            })
          }
          this.props.dispatch(action);
        } catch (err) {
          console.log('Error in moves handler', err);
        }
      })
      socket.on('join', data => {
        if (data.type === 'join') {
          let action = receiver(data);
          this.props.dispatch(action);
        }
        console.log('Back from server with', data);
      })
      socket.emit('join', {
        type: 'join',
        data: {
          playerName,
        },
      })
      this.props.dispatch({
        type: 'SET_CODE',
        payload: code,
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  calculateNextStage = nextStage => {
    if (nextStage === '0') {
      let number = Number(this.props.state.game.roundNumber);
      console.log(number);
      number = number + 1
      console.log(number);
      let newRound = number.toString();
      this.props.dispatch({
        type: 'UPDATE_ROUND_NUMBER',
        payload: newRound,
      })
      return (newRound + nextStage);
    }
    return (this.props.state.game.roundNumber + nextStage);
  }

  render() {
    return (
      <div>
        {this.props.state.game.gameState[0] === '0' &&
          this.props.state.gameCode !== '' ?
          <GameStart
            advanceStage={this.advanceStage}
            calculateNextStage={this.calculateNextStage}
          />
          :
          this.props.state.game.gameState[0] === '0' ?
            <PreGame
              gameCode={this.state.gameCode}
              createGame={this.createGame}
              advanceStage={this.advanceStage}
              joinGame={this.joinGame}
            />
            :
            null
        }
        {this.props.state.game.gameState[0] > 0 && this.props.state.game.gameState[0] < 6 &&
          <GameRounds
            advanceStage={this.advanceStage}
            calculateNextStage={this.calculateNextStage}
          />
        }
        {this.props.state.game.gameState[0] == '6' &&
          <PostGame
            advanceStage={this.advanceStage}
            endGame={this.endGame}
          />
        }
      </div>
    )
  }



}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(Game);
