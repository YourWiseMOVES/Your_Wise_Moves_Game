import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoundIntro extends Component {

  render() {
    return (
      this.props.state.user.userTypeReducer === 'player'
      ?
      <div>
        <h1>Round Introduction</h1>
        <h2>Player View</h2>
        <h2>Round {this.props.state.game.game_stateReducer.game_state.round}</h2>
        <h3>Players are introduced to this round by the facilitator</h3>  
        <button onClick={() => this.props.history.push("/answercard")}>AnswerCard (players don't have this option)</button>   
      </div>
      :
      <div>
        <h1>Round Introduction</h1>
        <h2>Facilitator View</h2>
        <h2>Round {this.props.state.game.game_stateReducer.game_state.round}</h2>
        <h3>Introduce players to the round and it's concepts</h3>
        <button onClick={() => this.props.history.push("/answercard")}>AnswerCard</button>   
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