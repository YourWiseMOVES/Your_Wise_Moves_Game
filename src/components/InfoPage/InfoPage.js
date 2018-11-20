import React, { Component } from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card'
import QuestionForm from './QuestionForm';
class InfoPage extends Component {
  state = {
    filterCategory: '1',
  }
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CARDS' });
  }
  filterCards = () => {
    this.props.dispatch({ type: 'FILTER_CARDS_BY_CATEGORY', payload: this.state.filterCategory })
  }
  clearFilter = () => {
    this.props.dispatch({ type: 'CLEAR_CARD_FILTER' })
  }
  handleChangeFor = (input) => event => {
    this.setState({
      ...this.state,
      [input]: event.target.value,
    })
  }
  render() {
    return (
      <div>
        <div>
          <h4>Add a new question here:</h4>
        </div>
        <div>
          <label htmlFor="select">Select a movement: </label>
          <select name="select"
            onChange={this.handleChangeFor('filterCategory')}
            selected={this.state.filterCategory}>
            <option value="1">Map</option>
            <option value="2">Open</option>
            <option value="3">Visualize</option>
            <option value="4">Engage</option>
            <option value="5">Sustain</option>
          </select>
          <button onClick={this.filterCards}>Filter</button>
          <button
            disabled={this.props.cards.originalCards === this.props.cards.cards ? true : false}
            onClick={this.clearFilter}>
            Clear filter
          </button>
        </div>
        <div>
          <QuestionForm add={true} />
        </div>
        {!this.props.cards ? null :
          <div className="card-collection">
            {this.props.cards.originalCards.map(question =>
              <Card
                key={question.id}
                question={question}
                editable={true} />)}
          </div>}
      </div>
    )
  }
}
const mapReduxStateToProps = ({ cards }) => ({ cards })
export default connect(mapReduxStateToProps)(InfoPage);
