import React, { Component } from 'react';
import { connect } from 'react-redux';

class FacilitatorLogin extends Component {

  render() {
    return (
      <div>
        <h1>Login View</h1>
        <h2>Facilitator View</h2>
        <h3>Input your user name and password</h3>  
        <button onClick={() => this.props.history.push("/intentionintro")}>IntentionIntro</button>   
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(FacilitatorLogin);