import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameRounds from './GameRounds/GameRounds';
import PostGame from './PostGame/PostGame';


class Game extends Component {



  render() {
    return (
      <div>
        {this.props.state.game.game_stateReducer.game_state[0] > '0' && this.props.state.game.game_stateReducer[0] < '6' &&
          <GameRounds />
        }
        {this.props.state.game.game_stateReducer.game_state[0] == '6' &&
          <PostGame />
        }
      </div>
    )
  }



}


// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(Game);
