import React, { Component } from 'react';
import { connect } from 'react-redux';

//include sub components
import PlayerLogin from './PreGame/PlayerLogin';
import FacilitatorLogin from './PreGame/FacilitatorLogin';
import FacilitatorCreateGame from './PreGame/FacilitatorCreateGame';

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
                        {this.props.user && this.props.user.id ?
                            <FacilitatorCreateGame />
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