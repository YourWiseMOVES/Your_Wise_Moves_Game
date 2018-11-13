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

  createGame =  () => { //function to create the game, triggers the game start on server
    console.log('in create game');
    axios({
      method: 'POST',
      data: { id: this.props.state.user.userReducer.id },
      url: '/game/start',
    })
      .then( response => {
        this.setState({
          gameCode: response.data.code,
        })
        socket = io.connect(`/${this.state.gameCode}`);
        //socket will need to be global 
        socket.on('moves', async data => {
          try {
            console.log('Back from server with', data);
            let action = receiver(data);
            this.props.dispatch(action);
          } catch (err) {
            console.log('Error in moves handler', err);
          }
        })
        socket.on('join', data => {
          console.log('Back from server with', data);
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


  advance
  render() {
    return (
      <div>
        {this.props.state.game.gameState[0] === '0' &&
          this.props.state.gameCode !== '' ?
          <GameStart
            advanceStage={this.advanceStage}
          />
          :
          this.props.state.game.gameState[0] === '0' ?
          <PreGame
            gameCode={this.state.gameCode}
            createGame={this.createGame}
            advanceStage={this.advanceStage}
          />
          :
          null
        }
        {this.props.state.game.gameState[0] > 0 && this.props.state.game.gameState[0] < 6 &&
          <GameRounds
            advanceStage={this.advanceStage}
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
