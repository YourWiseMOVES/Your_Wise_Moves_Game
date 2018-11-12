import React, { Component } from 'react';
import { connect } from 'react-redux';

class AnswerCard extends Component {

  render() {
    return (
      this.props.state.user.userTypeReducer === 'player'
      ?
      <div>
        <h1>Answer Card</h1>
        <h2>Player View</h2>
        <h2>Round {this.props.state.game.game_stateReducer.game_state.round}</h2>
        <h3>Input your answer to the card you were dealt</h3>  
        <button onClick={() => this.props.history.push("/discussion")}>Discussion</button>   
      </div>
      :
      <div>
        <h1>Answer Card</h1>
        <h2>Facilitator View</h2>
        <h2>Round {this.props.state.game.game_stateReducer.game_state.round}</h2>
        <h3>Waiting for players to complete their answers</h3>  
        <button onClick={() => this.props.history.push("/discussion")}>Discussion</button>   
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(AnswerCard);