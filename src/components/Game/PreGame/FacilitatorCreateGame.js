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

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_GAMES' });
  }

  render() {
    return (
      <div className="threeContentContainer">
        <div>
          {this.props.state.selectedGame && this.props.state.selectedGame.id &&
            <div>
              <h3>{this.props.state.selectedGame.name}</h3>
              <h5>{this.props.state.selectedGame.code}</h5>
              <ul>
                <h5>Players</h5>
                <li>{this.props.state.selectedGame.players}</li>
                <li>{this.props.state.selectedGame.active}</li>
                <li><button onClick={() => this.props.facilitatorJoinGame(this.props.state.selectedGame)}>Join</button></li>
              </ul>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FacilitatorCreateGame);