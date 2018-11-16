import React, { Component } from 'react';
import {connect} from 'react-redux'
import Card from './Card'
import QuestionForm from './QuestionForm';

class InfoPage extends Component {
  state = {
    data: [],
  }
  componentDidMount() {
    this.props.dispatch({type:'FETCH_CARDS'}); // call getCardInfo on page load to display all the default questions
  }
  render() {
    return (
      <div>
        <div >
          <h4>1. To add a new question to database, enter it into the form.</h4>
          <h4>2. To edit a question in the database: Select a question below.</h4>
        </div>
        <div>
          <h4>Add a new question here:</h4>
        </div>
        <div>
         <QuestionForm/>
        </div>
        {!this.props.cards ? null :
          <div>
            {this.props.cards.map(question => <Card key={question.id} question={question}/>)}
          </div>}
      </div>
    )
  }
}
const mapReduxStateToProps = ({cards})=>({cards})


export default connect(mapReduxStateToProps) (InfoPage);
