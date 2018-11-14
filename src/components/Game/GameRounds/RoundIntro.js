/** RoundIntro
 * waiting view *
 * facilitator can advance to next game state
 * advancing to next game state also deals cards to players
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoundIntro extends Component {

  render() {
    return (
      <div>
        <h1>Round Introduction</h1>
        <h2>Round: {this.props.state.game.roundNumber}</h2>
        <button onClick={() => this.props.advanceStage(
          this.props.calculateNextStage('1')
        )}>Next</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(RoundIntro);