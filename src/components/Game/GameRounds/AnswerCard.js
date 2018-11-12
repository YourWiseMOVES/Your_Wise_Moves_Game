import React, { Component } from 'react';
import { connect } from 'react-redux';

class AnswerCard extends Component {

  render() {
    return (
      <div>
        <h1>Answer Card</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(AnswerCard);