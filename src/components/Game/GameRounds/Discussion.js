import React, { Component } from 'react';
import { connect } from 'react-redux';

class Discussion extends Component {

    //Determine if game proceeds to the next discussion round or to the post game process
    determineRound = () => {
        if (this.props.state.round.setGameRound < 5) {
            this.props.dispatch({type: 'PROCEED_TO_NEXT_ROUND'})
            this.props.history.push("/roundintro")
        } else {
        this.props.history.push("/finalreflection")
        }
    }

  render() {
    return (
      this.props.state.user.userTypeReducer === 'player'
      ?
      <div>
        <h1>Discussion Phase</h1>
        <h2>Player View</h2>
        <h2>Round {this.props.state.round.setGameRound}</h2>
        <h3>Players discuss their answers.  Normally, after this screen you will head back to RoundIntro, but for the new round</h3>
        <h3>This will also act as a waiting page while you are waiting for other players to answer their question</h3> 
        <button onClick={this.determineRound}>RoundIntro/FinalReflection (players don't have this option)</button>   
      </div>
      :
      <div>
        <h1>Discussion Phase</h1>
        <h2>Facilitator View</h2>
        <h2>Round {this.props.state.round.setGameRound}</h2>
        <h3>Lead discussion of players answers, facilitator will choose the order in which players speak</h3>  
        <button onClick={this.determineRound}>RoundIntro/FinalReflection</button>   
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(Discussion);