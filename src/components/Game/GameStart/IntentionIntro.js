/** IntentionIntro
 * waiting view *
 * facilitator can advance to next game state
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class IntentionIntro extends Component {

  render() {
    return (
      <div>
        <h1>Introduction to Intention or Question</h1>
      { this.props.state.user.userReducer && this.props.state.user.userReducer.id &&
        <button onClick={() => {this.props.advanceStage(
           this.props.calculateNextStage('1')
        )
        }
      }>Next</button>
    }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(IntentionIntro);
