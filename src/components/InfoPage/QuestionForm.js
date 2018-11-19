import React, { Component } from "react";
import { connect } from 'react-redux'
import swal from 'sweetalert';

class QuestionForm extends Component {
  state = {
    newContent: {
      stage_id: '1',
      text: ''
    },
    editing: false
  }
  componentDidMount = () => {
    if (this.props.question) {
      this.setState({
        newContent: {
          stage_id: this.props.question.stage_id,
          text: this.props.question.text,
          id: this.props.question.id
        }
      })
    }
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
    console.log(this.state.newContent)
    this.props.add ?
      this.props.dispatch({ type: 'ADD_CARD', payload: this.state.newContent }) :
      this.props.dispatch({ type: 'EDIT_CARD', payload: this.state.newContent })
    swal(this.props.add ? 'Card Added' : 'Card Edited');
    if (this.props.flipCard){
      this.props.flipCard();
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="select">Select a movement: </label>
          <select name="select" onChange={this.handleChangeFor('stage_id')} value={this.state.newContent.stage_id}>
            <option value="1">Map</option>
            <option value="2">Open</option>
            <option value="3">Visualize</option>
            <option value="4">Engage</option>
            <option value="5">Sustain</option>
          </select>
          <br />
          <label htmlFor="text">Type a question: </label>
          <input name="text" type="text" onChange={this.handleChangeFor('text')} value={this.state.newContent.text} />
          <input type="submit" />
        </form>
        <button onClick={() => this.handleDelete(this.props.question.id)}>Delete</button>
      </div>
    );
  }
}

export default connect()(QuestionForm);