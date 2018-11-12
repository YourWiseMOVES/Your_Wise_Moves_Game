import React, { Component } from 'react';
import { connect } from 'react-redux';
import Discussion from './Discussion';
import RoundIntro from './RoundIntro';
import AnswerCard from './AnswerCard';


class GameRounds extends Component {



    render() {
        return (
            <div>
                {this.props.state.game.gameState[1] == '0' &&
                    <RoundIntro />
                }
                {this.props.state.game.gameState[1] > '1' && 
                    <AnswerCard />
                }
                {this.props.state.game.gameState[1] == '2' &&
                    <Discussion />
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(GameRounds);