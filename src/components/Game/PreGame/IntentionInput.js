import React, { Component } from 'react';
import { connect } from 'react-redux';

class IntentionInput extends Component {


  
  render() {
    return (
      this.props.state.user.userTypeReducer === 'player'
      ?
      <div>
        <h1>Intention or Question Input</h1>
        <h2>Player View</h2>
        <h2>Input your intention/question</h2>  
        <button onClick={() => this.props.history.push("/roundintro")}>RoundIntro</button>   
      </div>
      :
      <div>
        <h1>Intention or Question Input</h1>
        <h2>Facilitator View</h2>
        <h2>Waiting for players to complete intention/question.  Facilitator will be able to see updates below.</h2>
        <button onClick={() => this.props.history.push("/roundintro")}>RoundIntro</button>   
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

export default connect(mapStateToProps)(IntentionInput);