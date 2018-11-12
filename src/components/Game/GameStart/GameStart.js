import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntentionInput from './IntentionInput';
import IntentionIntro from './IntentionIntro';

class GameRounds extends Component {
    render() {
        return (
            <div>
                {this.props.state.game.gameState[1] == '0' &&
                    <IntentionIntro />
                }
                {this.props.state.game.gameState[1] == '1' && 
                    <IntentionInput />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(GameRounds);