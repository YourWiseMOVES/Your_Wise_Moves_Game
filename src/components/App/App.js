import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import AdminPage from '../AdminPage/AdminPage';
import Game from '../Game/Game';
import PlayerLogin from '../Game/PreGame/PlayerLogin';
import FacilitatorLogin from '../Game/PreGame/FacilitatorLogin';
import IntentionIntro from '../Game/PreGame/IntentionIntro';
import IntentionInput from '../Game/PreGame/IntentionInput';
import RoundIntro from '../Game/GameRounds/RoundIntro';
import AnswerCard from '../Game/GameRounds/AnswerCard';
import Discussion from '../Game/GameRounds/Discussion';
import FinalReflection from '../Game/PostGame/FinalReflection';
import Results from '../Game/PostGame/Results';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <Route
              exact
              path="/info"
              component={InfoPage}
            />
            <Route
              exact
              path="/admin"
              component={AdminPage}
            />
            {/* Routes for Game */}
            <Route
              path="/game"
              component={Game}
            />
            {/* Routes for player side of the game */}
            <Route
              path="/playerlogin"
              component={PlayerLogin}
            />
            <Route
              path="/facilitatorlogin"
              component={FacilitatorLogin}
            />
            <Route 
              path="/intentionintro"
              component={IntentionIntro}
            />
            <Route
              path="/intentioninput"
              component={IntentionInput}
            />
            <Route
              path="/roundintro"
              component={RoundIntro}
            />
            <Route
              path="/answercard"
              component={AnswerCard}
            />
            <Route
              path="/discussion"
              component={Discussion}
            />
            <Route
              path="/finalreflection"
              component={FinalReflection}
            />
            <Route
              path="/results"
              component={Results}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
