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
                        calculateNextStage={this.props.calculateNextStage}
                    />
                }
                {this.props.state.game.gameState[1] == '1' &&
                    <IntentionInput
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.props.calculateNextStage}
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