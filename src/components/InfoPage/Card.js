import React, { Component } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert';


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
      <div style={{ width: '250px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', margin:'8px' }} >
        <div style={{ padding: '2px 16px' }}>
          <h6>{this.props.question.type}</h6>
          <h5>{this.props.question.text}</h5>
          <button onClick={() => this.setState({ editing: !this.state.editing })}>
            {this.state.editing ? 'close' : 'edit'}
          </button>
          <button onClick={() => this.handleDelete(this.props.question.id)}>Delete</button>
        </div>
        {
          this.state.editing ?
            <form onSubmit={this.handleSubmit}>
              <select onChange={this.handleChangeFor('stage_id')} value={this.state.newContent.stage_id}>
                <option value="1">Map</option>
                <option value="2">Open</option>
                <option value="3">Visualize</option>
                <option value="4">Engage</option>
                <option value="5">Sustain</option>
              </select>
              <input type="text" onChange={this.handleChangeFor('text')} value={this.state.newContent.text} />
              <input type="submit" />
            </form> : null
        }
      </div >
    )
  }
}

export default connect()(Card)