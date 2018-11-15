/** PostGame
 * module routes between final views of game 
 * sub components conditionally rendered based on game state in redux
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

//import sub components
import FinalReflection from './FinalReflection';
import Results from './Results';

class PostGame extends Component {



    render() {
        return (
            <div>
                {this.props.state.game.gameState[1] == '0' &&
                    <FinalReflection
                        advanceStage={this.props.advanceStage}
                    />
                }
                {this.props.state.game.gameState[1] == '1' &&
                    <Results
                        advanceStage={this.props.advanceStage}
                        endGame={this.props.endGame} //facilitator ends game from this component
                    />
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(PostGame);