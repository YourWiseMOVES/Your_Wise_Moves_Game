import React, { Component } from 'react';
import { connect } from 'react-redux';

class IntentionIntro extends Component {

  render() {
    return (
      <div>
        <h1>Introduction to Intention or Question</h1>
        <button onClick={() => this.props.advanceStage('01')}>Next</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(IntentionIntro);
