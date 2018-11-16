import React, { Component } from "react";
import { connect } from 'react-redux'
import swal from 'sweetalert';

class QuestionForm extends Component {
    state = {
        newContent: {
            stage_id: '',
            text: ''
        },
        editing: false
    }

    handleChangeFor = (input) => event => {
        this.setState({
          newContent: {
            ...this.state.newContent,
            [input]: event.target.value,
          }
        })
      }

      handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.newContent)
        this.props.dispatch({ type: 'ADD_CARD', payload: this.state.newContent })
        swal('Card added');
      }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <h6>Add a question</h6>
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
            </div>
        );
    }
}

export default connect()(QuestionForm);