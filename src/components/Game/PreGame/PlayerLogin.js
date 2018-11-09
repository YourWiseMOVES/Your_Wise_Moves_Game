import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerLogin extends Component {

  render() {
    return (
      <div>
        <h1>Player Login</h1>
        <h2>Player View</h2>
        <h3>Insert your player name and code from facilitator</h3>  
        <button onClick={() => this.props.history.push("/intentionintro")}>IntentionIntro</button>   
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

export default connect(mapStateToProps)(PlayerLogin);
