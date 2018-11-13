import React, { Component } from 'react';
import { connect } from 'react-redux';

class FacilitatorCreateGame extends Component {
  render() {
    return (
      <div>
        <h1>Create New Game</h1>
        <h2>Facilitator View</h2>
        <h3>Facilitator chooses settings for new game</h3>  
        <h2>Your Code: {this.props.gameCode}</h2>
        <button onClick={this.props.createGame}>Create Game</button>   
        <button onClick={() => this.props.dispatch({type: 'SET_CODE', payload: this.props.gameCode})}>Proceed to Game</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FacilitatorCreateGame);