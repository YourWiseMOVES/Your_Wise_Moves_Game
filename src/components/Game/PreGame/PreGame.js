import React, { Component } from 'react';
import { connect } from 'react-redux';

//include sub components
import PlayerLogin from './PlayerLogin';
import FacilitatorLogin from './FacilitatorLogin';
import FacilitatorCreateGame from './FacilitatorCreateGame';

class PreGame extends Component {
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
                        <PlayerLogin />
                    </div>
                }
                {
                    this.state.userType === 'facilitator' &&
                    <div>
                        {this.props.state.user.userReducer && this.props.state.user.userReducer.id ?
                            <FacilitatorCreateGame
                                createGame={this.props.createGame}
                                gameCode={this.props.gameCode}
                                socket={this.props.socket}
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