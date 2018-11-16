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

    componentDidMount(){
        setTimeout(
            () => {
                if(this.props.state.user.userReducer.id){
                    this.setState({
                        userType: 'facilitator',
                    })
                } else {
                    this.setState({
                        userType: 'player',
                    })
                }
            }, 100
        )
    }

    facilitator = () => {
        this.setState({
            userType: 'facilitator',
        })
    }

    player = () => {
        this.setState({
            userType: 'player',
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.userType === '' &&
                    null
                }
                {
                    this.state.userType === 'player' &&
                    <div>
                        <PlayerLogin
                            //sub component requires
                            joinGame={this.props.joinGame}
                            facilitator={this.facilitator}
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
                            <FacilitatorLogin
                                player={this.player}
                            />
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