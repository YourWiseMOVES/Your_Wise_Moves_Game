/** GameLobby
 * player can input an intention and dispatch it to server
 * facilitator can see which players have submitted their intention
 * facilitator can advance to next game state
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameLobby extends Component {
    state = {
        intention: '',
    }

    handleChange = event => {
        this.setState({
            intention: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <h1>Game Lobby</h1>
                <div className="facilitator">
                    <ol>
                        {
                            this.props.state.game.allPlayers.map(player => {
                                if (player.in_game) {
                                    return (
                                        <li key={player.id}>{player.name}</li>
                                    )
                                }
                            })
                        }
                    </ol>
                    {this.props.state.user.userReducer && this.props.state.user.userReducer.id ?
                        <button onClick={() => this.props.advanceStage(
                            this.props.calculateNextStage('0')
                        )}>Next</button>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(GameLobby);