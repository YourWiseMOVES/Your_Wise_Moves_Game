import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntentionInput from './IntentionInput';
import IntentionIntro from './IntentionIntro';

class GameRounds extends Component {
    render() {
        return (
            <div>
                {this.props.state.game.gameState[1] == '0' &&
                    <IntentionIntro
                        advanceStage={this.props.advanceStage}
                    />
                }
                {this.props.state.game.gameState[1] == '1' &&
                    <IntentionInput
                        advanceStage={this.props.advanceStage}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(GameRounds);