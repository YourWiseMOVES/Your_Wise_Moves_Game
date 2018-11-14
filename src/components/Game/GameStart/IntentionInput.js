/** IntentionInput
 * player can input an intention and dispatch it to server
 * facilitator can see which players have submitted their intention
 * facilitator can advance to next game state
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class IntentionInput extends Component {
  state = {
    intention: '',
  }

  handleChange = event => {
    this.setState({
      intention: event.target.value,
    })
  }
  render() {
    return (
      <div>
        <h1>Intention or Question Input</h1>
        <input
          type="text"
          placeholder="Set your Intention or Question"
          onChange={this.handleChange}
        />
        <button
          onClick={() => this.props.editIntention(this.state.intention)}
        >
          Save Intention
        </button>
        <button onClick={() => this.props.advanceStage(
           this.props.calculateNextStage('0')
        )}>Next</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(IntentionInput);