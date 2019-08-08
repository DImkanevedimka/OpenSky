import React, { Component } from 'react';
import './App.css';
import Login from '../Login'
import Dashboard from '../Dashboard'
import Modal from 'react-modal';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { ProctectedRoute } from '../../blocks/ProtectedRoute'

Modal.setAppElement('#root')

class App extends Component {
  state = {
    isLoged: localStorage.getItem('logedIn') === 'true' || false
  }

  login = () => {
    this.setState({isLoged: true})
  }

  render () {
    const isAuthed = localStorage.getItem('logedIn')
    console.log('isAuth', isAuthed)
    return (
      <Router>
         <ProctectedRoute isAuthed={isAuthed} path="/dashboard" component={Dashboard}/>
         <Route path="/login" render={() => <Login onLogin={this.login} />}/>
         <Redirect to={isAuthed  ? '/dashboard' : '/login'} />
        <Route />
      </Router>
    );
  }
}

export default App;
