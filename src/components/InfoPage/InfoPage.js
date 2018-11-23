import React, { Component } from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card'
import QuestionForm from './QuestionForm';
class InfoPage extends Component {
  state = {
    flipEm: false,
    initialCards:[],
    cards: [],
    decks: [],
    deckSelectOptions: [],
    deckToBeCreated:[],
    filter: {
      categorySelected: '0',
      deckSelected: '0',
      searchText: '',
    }

  }
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CARDS' });
    this.props.dispatch({ type: 'FETCH_DECKS' });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.cards.cards !== prevProps.cards.cards) {
      this.setState({
        cards: this.props.cards.cards,
        initialCards: this.props.cards.cards.map(card=>({id:card.id, checked:false}))
      })
    }
    if (this.props.decks.decks !== prevProps.decks.decks) {
      this.setState({
        decks: this.props.decks.decks
      })
    }
    if (this.state.filter !== prevState.filter) {
      this.combinedFilter(this.state.filter)
    }

  }
  dispatchDeckToPost=()=>{
    this.props.dispatch({type:'ADD_DECK', payload:{
      description:'hard coded description',
      cards_in_deck: this.state.initialCards.filter(card=>card.checked===true).map(card=>card.id)
    }
    })
  }
  filterByText = (searchText, updatedCards) => {
    return updatedCards.filter(
      (card => {
        return card.text.toLowerCase().search(searchText.toLowerCase()) !== -1;
      })
    );
  }
  filterByCategory = (categoryId, updatedCards) => {
    if (categoryId === '0') {
      return updatedCards
    } else {
      return updatedCards.filter(card => card.stage_id === Number(categoryId))
    }
  }
  filterByDeck = (deckId, updatedCards) => {
    if (deckId === '0') {
      return updatedCards
    } else {
      return updatedCards.filter(card =>
        this.state.decks.filter(deck =>
          deck.id === Number(deckId))[0].cards_in_deck.indexOf(card.id) !== -1);
    }
  }
  combinedFilter = (filter) => {
    this.setState({
      cards: this.filterByText(filter.searchText, this.filterByCategory(filter.categorySelected, this.filterByDeck(filter.deckSelected, this.props.cards.cards)))
    })
  }
  handleChangeForFilter = (input) => (event) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [input]: event.target.value,
      }
    })
  }
  handleChangeForDeckCheckbox = (id,) => (event) => {
    let copy = [...this.state.initialCards];
    let copyIndex = copy.findIndex(card=>card.id===id)
    let item = {...copy[copyIndex]};
    item.checked = event.target.checked;
    copy[copyIndex] = item;
    this.setState({initialCards:copy});
    
  }
  flipEmAll = () => {
    this.setState({ flipEm: !this.state.flipEm })
  }
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state.initialCards, null, 2)}</pre>
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
            onChange={this.handleChangeForFilter('categorySelected')}
            value={this.state.filter.categorySelected}>
            <option value="0">All Categories</option>
            <option value="1">Map</option>
            <option value="2">Open</option>
            <option value="3">Visualize</option>
            <option value="4">Engage</option>
            <option value="5">Sustain</option>
          </select>
          <label htmlFor="select">Filter By Deck: </label>
          {<select name="select"
            onChange={this.handleChangeForFilter('deckSelected')}
            value={this.state.deckSelected}>
            <option value="0">All Cards</option>
            {this.props.decks.decks.map(deck =>
              <option key={deck.id} value={`${deck.id}`}>{deck.description}</option>)}
          </select>}
          <input placeholder="search for a card by content" onChange={this.handleChangeForFilter('searchText')}></input>
          <button onClick={this.dispatchDeckToPost}>Add checked cards to deck</button>
        </div>
        <div className="card-collection">
          {this.state.cards.map((question) =>
            <div key={question.id} style={{ margin: '4px' }}>
            {this.state.initialCards===[]?null:
            <input type="checkbox" className={question.id} onChange={this.handleChangeForDeckCheckbox(question.id)} 
            checked={this.state.initialCards[this.state.initialCards.findIndex(card=>card.id===question.id)].checked}/>}
              <br/>
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
