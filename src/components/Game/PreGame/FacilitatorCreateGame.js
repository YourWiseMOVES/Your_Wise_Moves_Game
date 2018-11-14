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
  render() {
    return (
      <div>
        <h1>Create New Game</h1>
        <h2>Facilitator View</h2>
        <h3>Facilitator chooses settings for new game</h3>  
        <h2>Your Code: {this.props.gameCode}</h2>
        <button onClick={this.props.createGame}>Create Game</button>
        <ol>
          {this.props.state.game.allPlayers.map(player => {
            return(
              <li key={player.id}>{player.name}</li>
            )
          })}
        </ol>   
        {/* 
        routing here currently works by checking redux state if there is a game code, to advance
        a facilitator sets the game code in their own redux state
        */}
        <button onClick={() => this.props.dispatch({type: 'SET_CODE', payload: this.props.gameCode})}>Proceed to Game</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FacilitatorCreateGame);