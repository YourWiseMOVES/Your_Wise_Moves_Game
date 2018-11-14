/** Discussion
 * facilitator can see which players have spoken and which haven't
 * facilitator can select a player to speak
 * facilitator can mark a player as done speaking
 * facilitator can advance to next game state
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Discussion extends Component {
 
  render() {
    return (
      <div>
        <h1>Discussion Phase</h1>
        <h2>Round: {this.props.state.game.roundNumber}</h2>
        <h3>Yet to speak</h3>
        <ol>
          {this.props.state.game.allPlayers.map(player => {
            if(player.discussed === false) {
            return(
              <li key={player.id}>Name: {player.name} Discussed: {player.discussed} <button
                onClick={() => this.props.selectPlayer(player)}
              >Select</button></li>
            );
            }
          })}
        </ol> 
        <h3>Selected Player</h3>
        <h3>Selected Player Intention {this.props.state.game.selectedPlayer.intention}</h3>
        <h3>Selected Player Question {this.props.state.game.selectedPlayer.current_card}</h3>
        <h4>{this.props.state.game.selectedPlayer.name}</h4>
        <button>Cancel</button>
        <button
          onClick={() => this.props.markDone(this.props.state.game.selectedPlayer)}
        >Mark Complete</button>
        <h3>Spoken</h3>
        <ol>
          {this.props.state.game.allPlayers.map(player => {
            if(player.discussed === true) {
            return(
              <li key={player.id}>Name: {player.name}</li>
            );
            }
          })}
        </ol>  
        <button onClick={() => this.props.advanceStage(
          this.props.calculateNextStage('0'), true
        )}>Next</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(Discussion);