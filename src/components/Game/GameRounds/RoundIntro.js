import React, { Component } from 'react';
import { connect } from 'react-redux';
import receiver from '../modules/receiver';

class RoundIntro extends Component {

  render() {
    return (
      <div>
        <h1>Round Introduction</h1>
        <h2>Round: {this.props.roundNumber}</h2>
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