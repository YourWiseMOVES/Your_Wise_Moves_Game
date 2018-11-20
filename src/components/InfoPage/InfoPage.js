import React, { Component } from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card'
import QuestionForm from './QuestionForm';

class InfoPage extends Component {
  state = {
    data: [],
    filter: '1',
    filtering: false,
    flipEm: false,
  }
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CARDS' });
  }
  filterCards = (event) => {
    event.preventDefault();
    // this.props.dispatch({ type: 'FETCH_CARDS' });
    this.props.dispatch({ type: 'FILTER_CARDS', payload: this.state.filter })
    this.setState({
      data: this.props.cards.filterCards,
      filtering: true
    })
  }
  toggleFilter = () => {
    this.setState({
      filtering: false,
      data: this.props.cards.allCards
    })
  }
  handleChangeFor = (input) => event => {
    this.setState({
      ...this.state,
      [input]: event.target.value,
    })
  }
  flipEmAll=()=> { 
    this.setState({flipEm:!this.state.flipEm})
  }
  render() {
    return (
      <div>

        <div>
          <h4>Add a new question here:</h4>
          <button onClick={this.flipEmAll}>FLIP EM ALL</button>
        </div>
        <div>
          <form onSubmit={this.filterCards}>
            <label htmlFor="select">Select a movement: </label>
            <select name="select" onChange={this.handleChangeFor('filter')} selected={this.state.filter}>
              <option value="1">Map</option>
              <option value="2">Open</option>
              <option value="3">Visualize</option>
              <option value="4">Engage</option>
              <option value="5">Sustain</option>

            </select>

            <input type="submit" />
          </form>
          <button disabled={!this.state.filtering} onClick={this.toggleFilter}>Clear filter</button>
        </div>
        <div>
          <QuestionForm add={true} />
        </div>
        {!this.props.cards ? null :
          <div className="card-collection">
            {!this.state.filtering ?
              this.props.cards.allCards.map(question =>
                <Card
                  key={question.id}
                  question={question}
                  editable={true}
                  flipped={this.state.flipEm} />)
              :
              this.props.cards.filteredCards.map(question =>
                <Card
                  key={question.id}
                  question={question}
                  editable={true}
                  flipped={this.state.flipEm} />)}
          </div>}
      </div>
    )
  }
}
const mapReduxStateToProps = ({ cards }) => ({ cards })


export default connect(mapReduxStateToProps)(InfoPage);
