/** FinalReflection
 * waiting view *
 * facilitator can advance to game end
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class FinalReflection extends Component {

  render() {
    return (
      <div>
        <h1>Final Reflection</h1>
        {this.props.state.user.userReducer && this.props.state.user.userReducer.id &&
          <button onClick={() => this.props.advanceStage('61')}>Next</button>
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(FinalReflection);