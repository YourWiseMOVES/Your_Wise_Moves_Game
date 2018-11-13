import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Socket } from 'net';

class IntentionInput extends Component {

  render() {
    return (
      <div>
        <h1>Intention or Question Input</h1>
        <button onClick={() => this.props.advanceStage('10')}>Next</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(IntentionInput);