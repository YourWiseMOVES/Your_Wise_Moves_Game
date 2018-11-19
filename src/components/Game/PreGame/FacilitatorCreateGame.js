/** FacilitatorCreateGame
 * facilitator can
 * --> start a game
 * --> share code (by saying it to people aloud)
 * --> watch as players join and their names show up
 * --> choose to advance to the game
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class FacilitatorCreateGame extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_GAMES'});
  }

  render() {
    return (
      <div>
        <h1>Your Games</h1>
        <ol>
          {this.props.state.games.map(game => {
            return(
              <li key={game.id}>{game.name}, {game.code}, {game.players} players, {game.active} active <button onClick={() => this.props.facilitatorJoinGame(game)}>Join</button></li>
            );
          })}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FacilitatorCreateGame);