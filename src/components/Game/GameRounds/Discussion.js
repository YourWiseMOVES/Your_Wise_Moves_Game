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
        {/* Players who are ready yet to speak */}
        <h2>Yet to speak</h2>
        <ol>
          {this.props.state.game.allPlayers.map(player => {
            if (player.in_discussion && !player.discussed) {
              return (
                <li key={player.id}>Name: {player.name} {this.props.state.user.userReducer && this.props.state.user.userReducer.id &&
                  !this.props.state.game.selectedPlayer.id && //only show the select button when there is no selected player
                  <button
                    onClick={() => this.props.selectPlayer(player)}
                  >Select</button>}</li>
              );
            }
          })
          }
        </ol>

        {/* Selected player */}
        <h2>Selected Player</h2>
        <h2>{this.props.state.game.selectedPlayer.name}</h2>
        <h3>Selected Player Intention: {this.props.state.game.selectedPlayer.intention}</h3>
        <h3>Selected Player Question: {this.props.state.game.selectedPlayer.current_card}</h3>
        {this.props.state.user.userReducer && this.props.state.user.userReducer.id &&
          <button
            onClick={() => this.props.markDone(this.props.state.game.selectedPlayer)}
          >Mark Complete</button>
        }

        {/* Spoken players */}
        <h2>Spoken</h2>
        <ol>
          {this.props.state.game.allPlayers.map(player => {
            if (player.discussed === true) {
              return (
                <li key={player.id}>Name: {player.name}</li>
              );
            }
          })}
        </ol>
        {this.props.state.user.userReducer && this.props.state.user.userReducer.id &&
          <button onClick={() => this.props.advanceStage(
            this.props.calculateNextStage('0'), true
          )}>Next</button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(Discussion);