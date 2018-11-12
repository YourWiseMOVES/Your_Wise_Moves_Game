import React, { Component } from 'react';
import { connect } from 'react-redux';

class FinalReflection extends Component {

  render() {
    return (
      this.props.state.user.userTypeReducer === 'player'
      ?
      <div>
        <h1>Final Reflection</h1>
        <h2>Player View</h2>
        <h3>Final discussion of the game with players</h3>  
        <button onClick={() => this.props.history.push("/results")}>Results (players don't have this option)</button>   
      </div>
      :
      <div>
        <h1>Final Reflection</h1>
        <h2>Facilitator View</h2>
        <h3>Lead a final discussion of the game with players</h3>  
        <button onClick={() => this.props.history.push("/results")}>Results</button>   
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

export default connect(mapStateToProps)(FinalReflection);