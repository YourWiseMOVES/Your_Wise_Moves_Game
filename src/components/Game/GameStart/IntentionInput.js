import React, { Component } from 'react';
import { connect } from 'react-redux';

class IntentionInput extends Component {

  render() {
    return (
      <div>
        <h1>Intention or Question Input</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(IntentionInput);