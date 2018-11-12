import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component {

  render() {
    return (
      <div>
        <h1>Results</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(Results);