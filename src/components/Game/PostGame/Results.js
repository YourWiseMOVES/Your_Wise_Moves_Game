/** Results
 * facilitator can end game
 * player can enter email and press button to get their results emailed
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component {

  render() {
    return (
      <div>
        <h1>Results</h1>
        {this.props.state.user.userReducer && this.props.state.user.userReducer.id &&
        <button onClick={this.props.endGame}>End Game</button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(Results);