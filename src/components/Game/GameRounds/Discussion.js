import React, { Component } from 'react';
import { connect } from 'react-redux';

class Discussion extends Component {

  render() {
    return (
      <div>
        <h1>Discussion Phase</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(Discussion);