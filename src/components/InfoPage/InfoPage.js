import React, { Component } from 'react';
import axios from 'axios';
import QuestionForm from './QuestionForm';
import './InfoPage.css';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
// 'Fancy' theme - boilerplate styles for all components:
import 'react-accessible-accordion/dist/fancy-example.css';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  state = {
    data: [],
  }

  componentDidMount() {
    this.getCardInfo(); // call getCardInfo on page load to display all the default questions
  }


  getCardInfo = () => {
    axios.get('/api/card')
      .then((response) => {
        console.log('this is the response for the card questions', response);
        this.setState({ ...this.state, data: response.data }); // master list of all default cards
        console.log(this.state);
      }).catch((error) => {
        console.log('error making get', error);
      });
  }

  createHtmlForPanel(question) {
    
      return (   //this creates the html for the panel for each question

        <AccordionItem>
          {/* style={{ border: '1px solid lightgray', color: 'gray', width: '70vw', align: 'center' }} */}
          <AccordionItemTitle >
            <h3>{question.text} Stage: {question.stage_id}</h3>
          </AccordionItemTitle>
          <AccordionItemBody>
            <QuestionForm
              action="edit"  // updates the question form based on this function or add
              question={question}  // javascript variable in html code
            />
          </AccordionItemBody>
        </AccordionItem>
      )
    }
    
  

  render() {
    let questionCards = this.state.data.map(question => this.createHtmlForPanel(question)) // card created outside of the render

    return (

      <div>
        <div className="preAccordion" >
          <h4>1. To add a new question to database, enter it into the form.</h4>
          <h4>2. To edit a question in the database: Select a question below.</h4>
        </div>
        <div className="preAccordion">
            <h4>Add a new question here:</h4>
          </div>
        <div className="accordion">
            <QuestionForm
              action="add"  // updates the question form based on this function or edit
            />
          </div>
        <div className="accordion">
          <Accordion>
            {questionCards}
          </Accordion>
        </div>
        <div>
          
          
        </div>


      </div>

    )


  }

}


export default InfoPage;
