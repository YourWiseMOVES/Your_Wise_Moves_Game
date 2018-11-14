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
        <input
          type="text"
          placeholder="Answer the question please"
          onChange={this.handleChange}
        />
        <button
          onClick={() => this.props.editJournal(this.state.response)}
        >
          Save response
        </button>
        <button onClick={() => this.props.advanceStage(
          this.props.calculateNextStage('2')
        )}>Next</button>     
       </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(AnswerCard);