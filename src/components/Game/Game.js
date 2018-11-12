import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameRounds from './GameRounds/GameRounds';
import PostGame from './PostGame/PostGame';


class Game extends Component {



  render() {
    return (
      <div>
        {this.props.state.game.gameState[0]}
        {this.props.state.game.gameState[0] > 0 && this.props.state.game.gameState[0] < 6 &&
          <GameRounds />
        }
        {this.props.state.game.gameState[0] == '6' &&
          <PostGame />
        }
      </div>
    )
  }



}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(Game);
