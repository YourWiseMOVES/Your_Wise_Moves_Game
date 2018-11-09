import React from 'react';
import axios from 'axios';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';



// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  state = {
    data: [],
  }

  

  // <div>
  //   <p>
  //     Info Page
  //   </p>
  // </div>


getCardInfo = () => {
  axios.get('/api/card')
  .then((response) => {
    console.log('this is the respons for the card questions', response);
    this.setState({ ...this.state,data: response.data }); // master list of all default cards
    console.log(this.state);
  }).catch((error) => {
    console.log('error making get', error);
  });
}

createQuestionPanels() {
// map method to populate AccordionItems
// will show the question and the move
// give option to edit or delete
}

}

export default InfoPage;
