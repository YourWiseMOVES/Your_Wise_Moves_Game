import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import receiver from '../modules/receiver';
let socket;

class FacilitatorCreateGame extends Component {
  state = {
    gameCode: '',
  }
  createGame = () => {
    axios({
      method: 'POST',
      data: { id: 1 }, //will pull user id from redux state (facilitator)
      url: '/game/start',
    })
      .then(response => {
        this.setState({
          gameCode: response.data.code,
        })
        socket = io.connect(`/${this.state.gameCode}`);
        socket.on('moves', data => {
          let action = receiver(data);
          this.props.dispatch(action);
          console.log('Back from server with', data);
        })
        socket.on('join', data => {
          console.log('Back from server with', data);
        })
      })
      .catch(err => {
        console.log(err);
      })
      socket.emit('moves', {
        type: 'advance',
        data: {
          newGameState: '01',
        },
        facilitatorId: 1,
      })
  }

  render() {
    return (
      <div>
        <h1>Create New Game</h1>
        <h2>Facilitator View</h2>
        <h3>Facilitator chooses settings for new game</h3>  
        <p>{this.state.gameCode}</p>
        <button onClick={this.createGame}>Create Game</button>   
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FacilitatorCreateGame);