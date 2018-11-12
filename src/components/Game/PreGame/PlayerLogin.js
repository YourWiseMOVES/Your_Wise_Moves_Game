import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerLogin extends Component {
  state = {
    player: '',
    code: '',
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }

  joinGame = () => {
    //socket stuff here
  }

  render() {
    return (
      <div>
        <h1>Player Login</h1>
        <h2>Player View</h2>
        <h3>Insert your player name and code from facilitator</h3>
        <label>
          <input onChange={this.handleChange} placeholder="Name" name="player" value={this.state.player}></input>
        </label>
        <label>
          <input onChange={this.handleChange} placeholder="Code" name="code" value={this.state.code}></input>
        </label>
        <button onClick={this.joinGame}>Join Game</button>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(PlayerLogin);
