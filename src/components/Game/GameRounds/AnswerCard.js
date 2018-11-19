/** AnswerCard
 * player can input an answer to the question and dispatch it to server
 * facilitator can see which players have submitted their response
 * facilitator can advance to next game state
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class AnswerCard extends Component {
  state = {
    response: '',
  }

  handleChange = event => {
    this.setState({
      response: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <h1>Answer Card</h1>
        <h2>Round: {this.props.state.game.roundNumber}</h2>
        {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
          <div className="threeContentContainer">
            <ol>
              {this.props.state.game.allPlayers.map(player => {
                return(
                <li key={player.id}>{player.name} ready: {player.in_discussion ? <p>yes</p> : <p>no</p>}</li>
                )
              })}
            </ol>
            <button onClick={() => this.props.advanceStage(
              this.props.calculateNextStage('2')
            )}>Next</button>
          </div>
          :
          <div className="threeContentContainer">
            <h2>Your Intention: {this.props.state.game.player.intention}</h2>
            <h2>Your Question: {this.props.state.game.player.current_card}</h2>
            <input
              type="text"
              placeholder="Answer the question please"
              onChange={this.handleChange}
            />
            <button
              onClick={() => this.props.editJournal(this.state.response)}
            >
              Save
        </button>
            <button
              onClick={() => {
                this.props.editJournal(this.state.response)
                this.props.advanceToDiscussion(this.props.state.game.player.id);
              }}
            >
              Save and continue
        </button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(AnswerCard);