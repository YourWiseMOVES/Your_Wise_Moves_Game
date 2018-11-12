import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component {

  render() {
    return (
      this.props.state.user.userTypeReducer === 'player'
      ?
      <div>
        <h1>Results</h1>
        <h2>Player View</h2>
        <h3>Choose whether or not you would like to get your answers emailed to you.</h3>  
        <button onClick={() => this.props.history.push("/game")}>Home</button>   
      </div>
      :
      <div>
        <h1>Results</h1>
        <h2>Facilitator View</h2>
        <h3>Players are deciding whether or not they want to get emailed results.  Facilitator can clean up.</h3>  
        <button onClick={() => this.props.history.push("/game")}>Home</button>   
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

export default connect(mapStateToProps)(Results);