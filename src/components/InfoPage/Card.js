import React, { Component } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert';
import QuestionForm from './QuestionForm'


class Card extends Component {
  state = {
    newContent: {
      stage_id: '',
      text: ''
    },
    editing: false
  }
  componentDidMount = () => {
    this.setState({
      newContent: {
        stage_id: this.props.question.stage_id,
        text: this.props.question.text,
        id: this.props.question.id
      }
    })
  }
  handleChangeFor = (input) => event => {
    this.setState({
      newContent: {
        ...this.state.newContent,
        [input]: event.target.value,
      }
    })
  }
  handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this file.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch({ type: 'DELETE_CARD', payload: id });
        swal("Your file has been deleted.", {
          icon: "success",
        });
      } else {
        swal("Your card is safe!");
      }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'EDIT_CARD', payload: this.state.newContent })
  }
  render() {
    return (
      <div className="card-wrapper">
        <div className="card-content">
        <div className={`card-header ${this.props.question.type}`}>
          <h6>{this.props.question.type}</h6>
          </div>
          <h5>{this.props.question.text}</h5>

          {this.props.editable?
          <div className="edit-buttons">
          <button onClick={() => this.setState({ editing: !this.state.editing })}>
            {this.state.editing ? 'close' : 'edit'}
          </button>
          <button onClick={() => this.handleDelete(this.props.question.id)}>Delete</button>
          </div>: null}
          
        </div>
        {
          this.state.editing ?
            <QuestionForm question={this.props.question}/> : null
        }
      </div >
    )
  }
}

export default connect()(Card)