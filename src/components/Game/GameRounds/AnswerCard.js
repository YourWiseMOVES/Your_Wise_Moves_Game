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
        {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
          <div className="threeContentContainer">
            <button onClick={() => this.props.advanceStage(
              this.props.calculateNextStage('2')
            )}>Next</button>
          </div>
          :
          <div className="threeContentContainer">
            <h2>Your Intention: {this.props.state.game.player.intention}</h2>
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