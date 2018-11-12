import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerLogin from './PlayerLogin';
import FacilitatorLogin from './FacilitatorLogin';
import FacilitatorCreateGame from './FacilitatorCreateGame';
import IntentionIntro from './IntentionIntro';
import IntentionInput from './IntentionInput';

class PreGame extends Component {
    state = {
        userType: '',
    }

    setUserType = (string) => {
        this.setState({
            userType: string
        }
        )
    }

    render() {
        if (this.state.userType === '') {
            return (
                <div>
                    <h1>Game View</h1>
                    <h2>Choose if you are a player or facilitator</h2>
                    <button onClick={() => this.setUserType('player')}>PlayerLogin</button>
                    <button onClick={() => this.setUserType('facilitator')}>FacilitatorLogin</button>
                    {/* <pre>{JSON.stringify(this.props.state, null, 2)}</pre> */}
                </div>
            )
        } else if (this.state.userType === 'player') {
            if (this.props.state.game.playerReducer.name === '') {
                return (
                    <PlayerLogin />
                )
            } else if (this.props.state.game.playerReducer.name !== '') {
                return (
                    <IntentionIntro />
                )
            } else if (this.props.state.game.game_stateReducer.game_state === '02') {
                return (
                    <IntentionInput />
                )
            }

        } else if (this.state.userType === 'facilitator') {
            if (this.props.state.game.game_stateReducer.game_state === '00')
                return (
                    <FacilitatorLogin />
                )
        } else if (this.props.state.game.game_stateReducer.game_state === '00' &&
            this.props.state.game.personReducer.id !== '') {
            return (
                <FacilitatorCreateGame />
            )
        } else if (this.props.state.game.gameReducer.id !== '') {
            return (
                <IntentionIntro />
            )
        } else if (this.props.state.game.game_stateReducer === '02') {
            return (
                <IntentionInput />
            )
        }
    }
}



// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(PreGame);