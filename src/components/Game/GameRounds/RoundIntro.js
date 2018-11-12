import React, { Component } from 'react';
import { connect } from 'react-redux';
import receiver from '../modules/receiver';

class RoundIntro extends Component {

  render() {
    return (
      <div>
        <h1>Round Introduction</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(RoundIntro);