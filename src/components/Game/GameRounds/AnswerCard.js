import React, { Component } from 'react';
import { connect } from 'react-redux';

class AnswerCard extends Component {

  render() {
    return (
      <div>
        <h1>Answer Card</h1>
        <h2>Round: {this.props.roundNumber}</h2>
        <button onClick={() => this.props.advanceStage(
          this.props.calculateNextStage('2')
        )}>Next</button>     
       </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(AnswerCard);