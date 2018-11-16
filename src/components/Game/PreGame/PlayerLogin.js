/** PlayerLogin
 * player can
 * --> input name and code
 * --> press button to join game
 * --> be redirected to the first view of the game
 */

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


  render() {
    return (
      <div>
        <h1>Player Login</h1>
        <button onClick={this.props.facilitator}>Log in as facilitator</button>
        <h2>Player View</h2>
        <h3>Insert your player name and code from facilitator</h3>
        <label>
          <input onChange={this.handleChange} placeholder="Name" name="player" value={this.state.player}></input>
        </label>
        <label>
          <input onChange={this.handleChange} placeholder="Code" name="code" value={this.state.code}></input>
        </label>
        {/* user join game function from props to emit socket event */}
        <button onClick={() => this.props.joinGame(this.state.player, this.state.code)}>Join Game</button>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(PlayerLogin);
