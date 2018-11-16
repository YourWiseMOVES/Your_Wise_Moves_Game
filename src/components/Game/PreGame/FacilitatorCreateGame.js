/** FacilitatorCreateGame
 * facilitator can
 * --> start a game
 * --> share code (by saying it to people aloud)
 * --> watch as players join and their names show up
 * --> choose to advance to the game
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class FacilitatorCreateGame extends Component {

  state = {
    name: '',
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_GAMES'});
  }

  render() {
    return (
      <div>
        <h1>Manage Games</h1>
        <h2>Facilitator View</h2>
        <label>
          Name your game!
          <input onChange={this.handleChange} placeholder="Name" name="name" value={this.state.name}></input>
        </label>
        <button onClick={() => this.props.createGame(this.state.name)}>Create A New Game</button>
        <ol>
          {this.props.state.games.map(game => {
            return(
              <li key={game.id}>{game.name}, {game.code}, {game.players} players, {game.active} active <button onClick={() => this.props.facilitatorJoinGame(game)}>Join</button></li>
            );
          })}
        </ol>
        {/* <ol>
          {this.props.state.game.allPlayers.map(player => {
            return(
              <li key={player.id}>{player.name}</li>
            )
          })}
        </ol>    */}
        {/* 
        routing here currently works by checking redux state if there is a game code, to advance
        a facilitator sets the game code in their own redux state
        */}
        {/* <button onClick={() => this.props.dispatch({type: 'SET_CODE', payload: this.props.gameCode})}>Proceed to Game</button> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FacilitatorCreateGame);