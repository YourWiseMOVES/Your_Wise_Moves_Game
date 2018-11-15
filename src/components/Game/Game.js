/** Game.js
 * Main component for game
 * Creates socket connection
 * Conditional rendering for different game stages
 * Sub components for different game phases
 * -->pregame
 * -->game start
 * -->game rounds
 * -->post game
 * functions for all socket emissions and three.js background live here
 * -->these functions are passed down as props to sub-components
 * imported module 'receiver' handles incoming socket events
 */


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
    axios({
      method: 'POST',
      data: { id: this.props.state.user.userReducer.id }, //pass facilitator id to be added to game table
      url: '/game/start',
    })
      .then(response => {
        this.setState({
          gameCode: response.data.code, //server generated game code used as socket namespace
        })
        this.props.dispatch({ type: 'SET_GAME', payload: response.data.gameId }) //sets the gameId in redux state
        socket = io.connect(`/${this.state.gameCode}`); //connecting to socket namespace with code
        socket.on('moves', data => { //set event handler for 'moves' events
          try {
            //pass the custom action object to receiver to be formatted into a redux action
            let action = receiver(data);
            //if the action includes a fetchPlayers directive
            if (action.payload.fetchPlayers) {
              //trigger a saga that fetches the players from the database
              this.props.dispatch({ type: 'FETCH_PLAYERS', payload: this.props.state.game.gameId })
            }
            //dispatch the returned redux action
            this.props.dispatch(action);
          } catch (err) {
            console.log('Error in moves handler', err);
          }
        })
        socket.on('players', data => { //set event handler for 'players' events
          //trigger saga to refresh players
          this.props.dispatch({ type: 'FETCH_PLAYERS', payload: this.props.state.game.gameId })
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  endGame = () => { //function triggers game end on server
    axios({
      method: 'POST',
      data: { id: this.props.state.user.userReducer.id },
      url: '/game/end',
    }) //will later clear all of the appropriate redux store items
  }

  advanceStage = (newGameState, resetDiscussion) => { //function emits an 'advance' action
    //function is passed as props to sub-components
    socket.emit('moves', {
      type: 'advance',
      data: {
        newGameState,
        resetDiscussion: resetDiscussion, //if a reset discussion exists it will reset all players discussed bool to false
      },
      facilitatorId: this.props.state.user.userReducer.id,
    })
  }

  editJournal = response => { //function emits a 'journal' action to edit journal body
    socket.emit('moves', {
      type: 'journal',
      intention: false, //boolean server uses to process editIntention function's emission
      data: {
        playerId: this.props.state.game.player.id,
        question: this.props.state.game.player.current_card, 
        response: response, //user input
        roundNumber: this.props.state.game.roundNumber,
      }
    })
  }

  editIntention = intention => {  //function emits a 'journal' action to edit journal intention
    socket.emit('moves', {
      type: 'journal',
      intention: true, //boolean set to true for server process
      data: {
        playerId: this.props.state.game.player.id,
        intention: intention, //user input
      }
    })
  }

  joinGame = (playerName, code) => {
    try {
      socket = io.connect(`/${code}`); //connect to socket based on user input
      socket.on('moves', data => { // set event handler for 'moves' events
        try {
          let action = receiver(data); //call the receiver module on received action
          if (data.type === 'advance') { //if it is an advance action
            this.props.dispatch({ //update the round number in redux state
              type: 'UPDATE_ROUND_NUMBER',
              payload: data.data.newGameState[0],
            }) //game state is a string of two numbers '00', index 0 is the round number, index 1 is step number within round
          }
          if (action.payload.fetchPlayers) { //if the action directs to refresh players
            //trigger fetch players saga
            this.props.dispatch({ type: 'FETCH_PLAYERS', payload: this.props.state.game.gameId })
          }
          this.props.dispatch(action); //dispatch the redux action
        } catch (err) {
          console.log('Error in moves handler', err);
        }
      })
      socket.on('join', data => { //set join event handler
        let actions = receiver(data); //pass data to receiver
        //receiver returns an array of two actions
        this.props.dispatch(actions[0]); //dispatch first
        this.props.dispatch(actions[1]); //dispatch second
      })
      socket.on('players', data => { //set players event handler
        //trigger fetch players saga
        this.props.dispatch({ type: 'FETCH_PLAYERS', payload: this.props.state.game.gameId })
      })
      socket.on('player', data => { //set event handler for 'player' events
      //trigger saga to refresh single player
      this.props.dispatch({ type: 'FETCH_PLAYER', payload: this.props.state.game.player.id })
    })
      socket.emit('join', { //emit an action to join game on server
        type: 'join',
        data: {
          playerName,
        },
      })
      this.props.dispatch({ //set the game code in redux state (for view redirect)
        type: 'SET_CODE',
        payload: code,
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  calculateNextStage = nextStage => { //function determines the appropriate game state to send to server
    if (nextStage === '0') { //if next stage is start of a new round
      //make the round number a number type
      let number = Number(this.props.state.game.roundNumber);
      //add one to the round number
      number = number + 1
      //make the round number a string again
      let newRound = number.toString();
      //update the round number in redux state
      this.props.dispatch({
        type: 'UPDATE_ROUND_NUMBER',
        payload: newRound,
      })
      //return the proper game state to be dispatched
      return (newRound + nextStage);
    }
    //else return the game state based on current redux state round number
    return (this.props.state.game.roundNumber + nextStage);
  }

  selectPlayer = player => { //function emits action when facilitator selects a player to speak
    socket.emit('moves', {
      type: 'discussion',
      data: {
        player: player,
        set: 'next', //for server to distinguish between select and set done actions
      },
      facilitatorId: this.props.state.user.userReducer.id,
    })
  }

  markDone = player => { //function emits action to mark a player as done discussing
    socket.emit('moves', {
      type: 'discussion',
      data: {
        player: player,
        set: 'done', //lets the server know to update the boolean value in the database
      },
      facilitatorId: this.props.state.user.userReducer.id,
    })
    this.props.dispatch({ type: 'CLEAR_SELECTED_PLAYER' }) //clears the selected player in redux state
  }

  dealCards = () => { //function emits action to deal cards to all players
    socket.emit('moves', {
      type: 'deal',
      data: {
        roundNumber: this.props.state.game.roundNumber,
      },
      facilitatorId: this.props.state.user.userReducer.id,
    })
  }

  advanceToDiscussion = player => {
    socket.emit('moves', {
      type: 'discussion',
      data: {
        player: player,
        set: 'ready',
      }
    })
    this.props.dispatch({type: 'UPDATE_GAME_STATE', payload: {newGameState: this.calculateNextStage('2')}})
  }

  render() {
    return (
      <div>
        {this.props.state.game.gameState[0] === '0' &&
          this.props.state.gameCode !== '' ?
          <GameStart
            advanceStage={this.advanceStage} //function to advance the game forward
            calculateNextStage={this.calculateNextStage}  //function required if advancing to a new round
            editIntention={this.editIntention} //function allows user to input their intention
          />
          :
          this.props.state.game.gameState[0] === '0' ?
            <PreGame
              gameCode={this.state.gameCode} //game code used in sub component (later redux)
              createGame={this.createGame} //function to create a new game as facilitator
              advanceStage={this.advanceStage} //function to advance the game forward
              joinGame={this.joinGame} //function to join a game as player
            />
            :
            null
        }
        {this.props.state.game.gameState[0] > 0 && this.props.state.game.gameState[0] < 6 &&
          <GameRounds
            advanceStage={this.advanceStage} //function to advance the game forward
            calculateNextStage={this.calculateNextStage} //function required if advancing to a new round
            selectPlayer={this.selectPlayer} //function to select which player is going to speak next
            markDone={this.markDone} //function to mark a player as done speaking
            editJournal={this.editJournal} //function for player to input their answers to provided questions
            dealCards={this.dealCards} //function for facilitator to deal cards to all players
            advanceToDiscussion={this.advanceToDiscussion}//single player can advance from answer stage to discussion phase
          />
        }
        {this.props.state.game.gameState[0] == '6' &&
          <PostGame
            advanceStage={this.advanceStage} //function to advance the game forward
            endGame={this.endGame} //function to end the game
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
