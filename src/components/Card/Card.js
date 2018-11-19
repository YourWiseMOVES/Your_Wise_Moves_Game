import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionForm from '../InfoPage/QuestionForm'

class Card extends Component {
  state = {
    newContent: {
      stage_id: '',
      text: ''
    },
    editing: false,
    isFlipped: false
  }
  flipCard = () => this.setState({
    isFlipped: !this.state.isFlipped,
    editing: !this.state.editing
  });
  componentDidMount = () => {
    this.setState({
      newContent: {
        stage_id: this.props.question.stage_id,
        text: this.props.question.text,
        id: this.props.question.id
      }
    })
  }
  render() {
    return (
      <div className="scene" onClick={this.state.editable ? this.flipCard() : null}>
        <div className={`card-wrapper ${this.state.isFlipped ? 'is-flipped' : null}`}>
          <div className="card-content card-front">
            <div className={`card-header ${this.props.question.type}`}>
              <h6>{this.props.question.type}</h6>
            </div>
            <h5>{this.props.question.text}</h5>

            {this.props.editable ?
              <div className="edit-buttons">
                <button onClick={() => this.flipCard()}>
                  {this.state.editing ? 'close' : 'edit'}
                </button>

              </div> : null}
          </div>
          <div className={`card-content card-back ${this.props.question.type}`}>
            {
              this.state.editing ?
                <QuestionForm flipCard={this.flipCard} question={this.props.question} /> : null
            }
          </div>
        </div >
      </div>
    )
  }
}

export default connect()(Card)