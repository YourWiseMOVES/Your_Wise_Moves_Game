import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {

  setUserType = (string) => {
    if (string === 'player') {
      this.props.history.push("/playerlogin")
    } else if (string === 'facilitator' ) {
      this.props.history.push("/facilitatorlogin")
    }
    this.props.dispatch({type: 'SET_USER_TYPE', payload: string})
  }

  render() {
    return (
      <div>
        <h1>Game View</h1>
        <h2>Choose if you are a player or facilitator</h2>
        <button onClick={() => this.setUserType('player')}>PlayerLogin</button>
        <button onClick={() => this.setUserType('facilitator')}>FacilitatorLogin</button>
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

export default connect(mapStateToProps)(Game);
