import React, { Component } from 'react';
import { connect } from 'react-redux';

class IntentionIntro extends Component {

  render() {
    return (
      this.props.state.user.userTypeReducer === 'player'
      ?
      <div>
        <h1>Introduction to Intention or Question</h1>
        <h2>Player View</h2>
        <h3>Facilitator tells you how to form your question or intention</h3>  
        <button onClick={() => this.props.history.push("/intentioninput")}>IntentionInput  (Players don't have this option)</button>   
      </div>
      :
      <div>
        <h1>Introduction to Intention or Question</h1>
        <h2>Facilitator View</h2>
        <h3>Tell players how to form their question or intention</h3>  
        <button onClick={() => this.props.history.push("/intentioninput")}>IntentionInput</button>   
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

export default connect(mapStateToProps)(IntentionIntro);
