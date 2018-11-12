import React, { Component } from 'react';
import { connect } from 'react-redux';

class FinalReflection extends Component {

  render() {
    return (
      <div>
        <h1>Final Reflection</h1>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(FinalReflection);