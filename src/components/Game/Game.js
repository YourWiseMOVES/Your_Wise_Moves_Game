import React, { Component } from 'react';
import { connect } from 'react-redux';
import PreGame from './PreGame/PreGame';
 

class Game extends Component {

  

  render() {
    if (this.props.state.game.game_stateReducer.game_state === '00') {
    return (
      <PreGame /> 
    )} 
      
      
    
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(Game);
