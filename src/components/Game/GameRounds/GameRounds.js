import React, { Component } from 'react';
import { connect } from 'react-redux';
import Discussion from './Discussion';
import RoundIntro from './RoundIntro';
import AnswerCard from './AnswerCard';


class GameRounds extends Component {
    state = {
        roundNumber: '',
    }
    calculateNextStage = nextStage => {
        if (nextStage === '0'){
            let number = Number(this.state.roundNumber);
            number = number + 1
            let newRound = number.toString();
            this.setState({
                roundNumber: newRound,
            })
        }
        return (this.state.roundNumber + nextStage);
    }

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
                        calculateNextStage={this.calculateNextStage}
                        roundNumber={this.state.roundNumber}
                    />
                }
                {this.props.state.game.gameState[1] == '1' &&
                    <AnswerCard
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.calculateNextStage}
                        roundNumber={this.state.roundNumber}
                    />
                }
                {this.props.state.game.gameState[1] == '2' &&
                    <Discussion
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.calculateNextStage}
                        roundNumber={this.state.roundNumber}
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