import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionForm from '../InfoPage/QuestionForm'

class Card extends Component {
  state = {
    newContent: {
      stage_id: '',
      text: ''
    },
    isFlipped: false
  }

  flipCard = () => this.setState({
    isFlipped: !this.state.isFlipped,
  });
  classNameSwitch=(prop)=>{
    switch(prop){
      case '1':
      return 'Map'
      case '2':
      return 'Open'
      case '3':
      return 'Visualize'
      case '4':
      return 'Engage'
      case '5':
      return 'Sustain'
      case 1:
      return 'Map'
      case 2:
      return 'Open'
      case 3:
      return 'Visualize'
      case 4:
      return 'Engage'
      case 5:
      return 'Sustain'
      default:
      return prop
    }
  }
  componentDidMount() {
    this.setState({
      isFlipped:this.props.flipped,
      newContent: {
        stage_id: this.props.question.stage_id,
        text: this.props.question.text,
        id: this.props.question.id
      }
    })
  }

  componentDidUpdate(prevProps){
    if (this.props.flipped !== prevProps.flipped){
      this.flipCard()
    }
  }

  render() {
    return (
      !this.props.question?null:
      <div className="scene" onClick={!this.props.editable ? this.flipCard : null}>
        <div className={`card-wrapper ${this.state.isFlipped ? 'is-flipped' : null}`}>
          <div className={`card-content card-front ${this.classNameSwitch(this.props.question.stage_id)}`}>
            <div className={`card-header`}>
              <h6>{this.props.question.type}</h6>
            </div>
            <div>
            <h5>{this.props.question.text}</h5>
            </div>
            {this.props.editable ?
              <div className="edit-buttons">
                <button onClick={() => this.flipCard()}>
                  Edit
                </button>

              </div> : null}
          </div>
          <div className={`card-content card-back ${this.classNameSwitch(this.props.question.stage_id)}`}>
            {
              this.props.editable ?
                <QuestionForm 
                flipCard={this.flipCard} 
                question={this.props.question} /> : null
            }
          </div>
        </div >
      </div>
    )
  }
}

export default connect()(Card)