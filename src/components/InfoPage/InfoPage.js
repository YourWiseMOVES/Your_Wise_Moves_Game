import React, { Component } from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card'
import QuestionForm from './QuestionForm';
class InfoPage extends Component {
  state = {

    flipEm: false,
    cards: [],
    searchText: '',
    categorySelected:'0',
    filterDeck:'0'

  }
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CARDS' });
  }
  componentDidUpdate(prevProps) {
    if (this.props.cards.cards !== prevProps.cards.cards) {
      this.setState({
        cards: this.props.cards.cards
      })
    }
  }
  textFilter = (event) => {
    let updatedCards = this.props.cards.cards;
    updatedCards = updatedCards.filter((card => {
      return card.text.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    }));
    this.setState({
      cards: updatedCards,
    });
  }
  categoryFilter = (event) => {
    let updatedCards = this.props.cards.cards;
    if (event.target.value === '0') {
      this.setState({
        cards: updatedCards,
        categorySelected: event.target.value
      })
    } else {
      updatedCards = updatedCards.filter(card => card.stage_id === Number(event.target.value))
      this.setState({
        cards: updatedCards,
        categorySelected:event.target.value
      });
    }
  }
  filterByDeck = () => (event) => {
    this.setState({categorySelected:'0'})
    this.props.dispatch({ type: 'FETCH_DECK_CARDS', payload: event.target.value })
  }
  clearFilter = () => {
    this.props.dispatch({ type: 'CLEAR_CARD_FILTER' })
  }
  handleChangeFor = (input) => (event) => {
    this.setState({
      ...this.state,
      [input]: event.target.value,
    })
  }
  flipEmAll = () => {
    this.setState({ flipEm: !this.state.flipEm })
  }
  render() {
    return (
      <div>

        <div>
          <h4>Add a new question here:</h4>
          <div>
            <QuestionForm add={true} />
          </div>
          <button onClick={this.flipEmAll}>FLIP EM ALL</button>
        </div>
        <div>
          <label htmlFor="select">Filter By Category: </label>
          <select name="select"
            onChange={this.categoryFilter}
            value={this.state.categorySelected}
          >
            <option value="0">All Categories</option>
            <option value="1">Map</option>
            <option value="2">Open</option>
            <option value="3">Visualize</option>
            <option value="4">Engage</option>
            <option value="5">Sustain</option>
          </select>
          <label htmlFor="select">Filter By Deck: </label>
          {<select name="select"
            onChange={this.filterByDeck()}
            selected={this.state.filterDeck}>
            <option value="0">All Cards</option>
            {this.props.decks.decks.map(deck =>
              <option value={`${deck.id}`}>{deck.description}</option>)}
          </select>}
          <input placeholder="search for a card by content" onChange={this.textFilter}></input>
        </div>
        <div className="card-collection">
          {this.state.cards.map(question =>
            <div key={question.id} style={{ margin: '4px' }}>
              <Card
                question={question}
                editable={true}
                flipped={this.state.flipEm} />
            </div>)}
        </div>
      </div>
    )
  }
}
const mapReduxStateToProps = ({ cards, decks }) => ({ cards, decks })
export default connect(mapReduxStateToProps)(InfoPage);
