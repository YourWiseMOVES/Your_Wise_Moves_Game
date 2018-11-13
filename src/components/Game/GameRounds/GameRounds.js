import React, { Component } from 'react';
import { connect } from 'react-redux';
import Discussion from './Discussion';
import RoundIntro from './RoundIntro';
import AnswerCard from './AnswerCard';


class GameRounds extends Component {

    componentDidMount(){
        this.setState({
            roundNumber: this.props.state.game.gameState[0],
        })
    }

    render() {
        return (
            <div>
                {this.props.state.game.gameState[1] == '0' &&
                    <RoundIntro
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.props.calculateNextStage}
                    />
                }
                {this.props.state.game.gameState[1] == '1' &&
                    <AnswerCard
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.props.calculateNextStage}
                        editJournal={this.props.editJournal}
                    />
                }
                {this.props.state.game.gameState[1] == '2' &&
                    <Discussion
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.props.calculateNextStage}
                        selectPlayer={this.props.selectPlayer}
                        markDone={this.props.markDone}
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