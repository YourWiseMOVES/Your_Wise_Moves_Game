/** PreGame
 * module for routing within the pregame stage
 * first view offers choice of facilitator or player
 * players
 * --> join game with code and name
 * facilitators
 * --> log in with username and password
 * --> create game and share code
 * --> choose to advance to game
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

//include sub components
import PlayerLogin from './PlayerLogin';
import FacilitatorLogin from './FacilitatorLogin';
import FacilitatorCreateGame from './FacilitatorCreateGame';

class PreGame extends Component {

    //user type for routing through pregame binary paths
    state = {
        userType: '',
    }

    render() {
        return (
            <div>
                {
                    this.state.userType === '' &&
                    <div>
                        <button onClick={() => {
                            this.setState({
                                userType: 'player',
                            })
                        }}>
                            Player
                    </button>
                        <button onClick={() => {
                            this.setState({
                                userType: 'facilitator',
                            })
                        }}>
                            Facilitator
                    </button>
                    </div>
                }
                {
                    this.state.userType === 'player' &&
                    <div>
                        <PlayerLogin
                            //sub component requires
                            joinGame={this.props.joinGame}
                        />
                    </div>
                }
                {
                    this.state.userType === 'facilitator' &&
                    <div>
                        {this.props.state.user.userReducer && this.props.state.user.userReducer.id ?
                            <FacilitatorCreateGame
                                //sub component requires 
                                createGame={this.props.createGame}
                                gameCode={this.props.gameCode}
                            />
                            :
                            <FacilitatorLogin />
                        }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(PreGame);