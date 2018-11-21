import React, { Component } from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card'
import QuestionForm from './QuestionForm';
class InfoPage extends Component {
  state = {

    flipEm: false,
    filterCategory: '1',
    filterDeck:'1',

  }
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CARDS' });
  }
  filterCards = (actionType,filterType) => () => {
    this.props.dispatch({ type: actionType, payload: this.state[filterType] })
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
          <label htmlFor="select">Filter By Category: </label>
          <select name="select"
            onChange={this.handleChangeFor('filterCategory')}
            selected={this.state.filterCategory}>
            <option value="1">Map</option>
            <option value="2">Open</option>
            <option value="3">Visualize</option>
            <option value="4">Engage</option>
            <option value="5">Sustain</option>
          </select>
          <button onClick={this.filterCards('FILTER_CARDS_BY_CATEGORY','filterCategory')}>Filter</button>
          <label htmlFor="select">Filter By Deck: </label>
          {<select name="select"
            onChange={this.handleChangeFor('filterDeck')}
            selected={this.state.filterDeck}>
            
            {this.props.decks.decks.map(deck=>
            <option value={`${deck.id}`}>{deck.description}</option>)}
           
          </select>}
          <button onClick={this.filterCards('FETCH_DECK_CARDS','filterDeck')}>Filter</button>
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
            {this.props.cards.cards.map(question =>
              <Card
                key={question.id}
                question={question}
                editable={true} 
                flipped={this.state.flipEm}/>)}
          </div>}
      </div>
    )
  }
}
const mapReduxStateToProps = ({ cards,decks }) => ({ cards,decks })
export default connect(mapReduxStateToProps)(InfoPage);
