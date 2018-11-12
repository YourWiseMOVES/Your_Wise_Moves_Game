import React, { Component } from 'react';
import { connect } from 'react-redux';
import FinalReflection from './FinalReflection';
import Results from './Results';

class PostGame extends Component {



    render() {
        return (
            <div>
                {this.props.state.game.game_stateReducer[1] == '0' &&
                    <FinalReflection />
                }
                {this.props.state.game.game_stateReducer[1] > '1' && 
                    <Results />
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(PostGame);