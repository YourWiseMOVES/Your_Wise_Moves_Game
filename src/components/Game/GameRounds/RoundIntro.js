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
        {this.props.state.user.userReducer && this.props.state.user.userReducer.id &&
          <button onClick={() => {
            //deal cards
            this.props.dealCards();
            //advance game
            this.props.advanceStage(this.props.calculateNextStage('1'))
          }
          }>Deal Cards</button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(RoundIntro);