import React, { Component } from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card'
import QuestionForm from './QuestionForm';
class InfoPage extends Component {
  state = {
    flipEm: false,
    allCardsWithCheckBoxes: [],
    deckToAdd: {
      description: '',
      viewing: 'false',
      cards: [],
    },
    cards: [],
    decks: [],
    deckSelectOptions: [],
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
        allCardsWithCheckBoxes: this.props.cards.cards.map(card => ({ ...card, checked: false }))
      })
    }
    if (this.props.decks.decks !== prevProps.decks.decks) {
      this.setState({
        decks: this.props.decks.decks,
        allCardsWithCheckBoxes: this.props.cards.cards.map(card => ({ ...card, checked: false }))
      })
    }
    if (this.state.filter !== prevState.filter) {
      this.combinedFilter(this.state.filter)
    }
    if (this.state.allCardsWithCheckBoxes !== prevState.allCardsWithCheckBoxes) {
      this.setState({
        deckToAdd: {
          ...this.state.deckToAdd,
          cards: this.state.cards.filter((card) => (this.state.allCardsWithCheckBoxes.filter(card => card.checked === true).map(card => card.id).indexOf(card.id) !== -1)
          )
        }
      })
    }
    if (this.state.deckToAdd.cards.length === 0 && prevState.deckToAdd.cards.length === 1) {
      this.setState({
        deckToAdd: {
          ...this.state.deckToAdd,
          description: '',
          viewing: 'false'
        }
      })
    }
  }
  dispatchDeckToPost = () => {
    this.props.dispatch({
      type: 'ADD_DECK', payload: {
        description: this.state.deckToAdd.description,
        cards_in_deck: this.state.deckToAdd.cards.map(card => card.id)
      }
    })
    this.setState({
      deckToAdd: {
        ...this.state.deckToAdd,
        description: '',
        viewing: 'false'
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
  handleChangeFor = (input, subState) => (event) => {
    this.setState({
      [subState]: {
        ...this.state[subState],
        [input]: event.target.value,
      }
    })
  }

  handleChangeForDeckCheckbox = (id) => (event) => {
    let copy = [...this.state.allCardsWithCheckBoxes];
    let copyIndex = copy.findIndex(card => card.id === id)
    let item = { ...copy[copyIndex] };
    item.checked = event.target.checked;
    copy[copyIndex] = item;
    this.setState({ allCardsWithCheckBoxes: copy });

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
            onChange={this.handleChangeFor('categorySelected', 'filter')}
            value={this.state.filter.categorySelected}>
            <option value="0">All Categories</option>
            <option value="1">Map</option>
            <option value="2">Open</option>
            <option value="3">Visualize</option>
            <option value="4">Engage</option>
            <option value="5">Sustain</option>
          </select>
          <label htmlFor="select">Filter By Deck: </label>
          <select name="select"
            onChange={this.handleChangeFor('deckSelected', 'filter')}
            value={this.state.deckSelected}>
            <option value="0">All Cards</option>
            {this.props.decks.decks.map(deck =>
              <option key={deck.id} value={`${deck.id}`}>{deck.description}</option>)}
          </select>
          <input placeholder="search for a card by content" onChange={this.handleChangeFor('searchText', 'filter')}></input>
          <br />
          {this.state.deckToAdd.cards.length === 0 ? null :
            <>
              <label htmlFor="cardsToAdd">
                <input style={{ width: '20px' }} name="cardsToAdd" type="radio" value="true" checked={this.state.deckToAdd.viewing === 'true'} onChange={this.handleChangeFor('viewing', 'deckToAdd')} />
                see cards in deck to be added
              </label>
              <br />
              <label htmlFor="allCards">
                <input style={{ width: '20px' }} name="allCards" type="radio" value="false" checked={this.state.deckToAdd.viewing === 'false'} onChange={this.handleChangeFor('viewing', 'deckToAdd')} />
                see all cards
              </label>
              <br />
              {this.state.deckToAdd.viewing === 'true' ?
                <>
                  <input type="text" placeholder="Name the new deck here" onChange={this.handleChangeFor('description', 'deckToAdd')} />
                  <button onClick={this.dispatchDeckToPost}>Add checked cards to deck</button>
                </>
                : null}
            </>
          }
        </div>
        <pre>{JSON.stringify(this.state.deckToAdd.description, null, 2)}</pre>
        <div className="card-collection">
          {this.state.deckToAdd.viewing === 'false' ?
            this.state.cards.map((question) =>
              <div key={question.id} style={{ margin: '4px' }}>
                {this.state.allCardsWithCheckBoxes === [] ? null :
                  <input type="checkbox" className={question.id} onChange={this.handleChangeForDeckCheckbox(question.id)}
                    checked={this.state.allCardsWithCheckBoxes[this.state.allCardsWithCheckBoxes.findIndex(card => card.id === question.id)].checked} />}
                <br />
                <Card
                  question={question}
                  editable={true}
                  flipped={this.state.flipEm} />
              </div>) :
            this.state.deckToAdd.cards.map((question) =>
              <div key={question.id} style={{ margin: '4px' }}>
                {this.state.allCardsWithCheckBoxes === [] ? null :
                  <input type="checkbox" className={question.id} onChange={this.handleChangeForDeckCheckbox(question.id)}
                    checked={this.state.allCardsWithCheckBoxes[this.state.allCardsWithCheckBoxes.findIndex(card => card.id === question.id)].checked} />}
                <br />
                <Card
                  question={question}
                  editable={true}
                  flipped={this.state.flipEm} />
              </div>)
          }
        </div>
      </div>
    )
  }
}
const mapReduxStateToProps = ({ cards, decks }) => ({ cards, decks })
export default connect(mapReduxStateToProps)(InfoPage);
