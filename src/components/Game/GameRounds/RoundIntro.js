import React, { Component } from 'react';
import { connect } from 'react-redux';
import receiver from '../modules/receiver';

class RoundIntro extends Component {
  advanceStage = (oldGameState) => {
    oldGameState = Number(oldGameState);
    let newState = toString(oldGameState + 1)
    let action = receiver({
      type: 'advance',
      data: {
        newGameState: newState,
      },
      facilitatorId: 1,
    })
    this.props.dispatch(action);
  }

  advanceRound = (oldGameState) => {
    oldGameState = Number(oldGameState);
    let newState = toString(oldGameState - oldGameState[1] + 10)
    let action = receiver({
      type: 'advance',
      data: {
        newGameState: newState,
      },
      facilitatorId: 1,
    })
    this.props.dispatch(action);
  }

  render() {
    return (
      <div>
        <h1>Round Introduction</h1>
        <h2>Player View</h2>
        <h3>Players are introduced to this round by the facilitator</h3>  
        <button onClick={() => this.props.history.push("/answercard")}>AnswerCard (players don't have this option)</button>   
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(RoundIntro);