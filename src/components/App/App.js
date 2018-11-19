import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Background from './Background';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import AdminPage from '../AdminPage/AdminPage';
import ResultsPage from '../ResultsPage/ResultsPage';
import Game from '../Game/Game';

import '../../stylesheets/main.css';
import PreGame from '../Game/PreGame/PreGame';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Redirect exact from="/" to="/home/game" />
            <Route
              exact
              path="/home/game"
              render={()=> { return (<React.Fragment><Game /> <Background /> </React.Fragment>);}}
            />
            <Route
              exact
              path="/info"
              render={()=> { return (<React.Fragment><Nav /> <InfoPage /> </React.Fragment>);}}
            />
            <Route
              exact
              path="/admin"
              render={()=> { return (<React.Fragment><Nav /> <AdminPage /> </React.Fragment>);}}
            />
            <Route
              path="/results"
              component={ResultsPage}
            />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect()(App);
