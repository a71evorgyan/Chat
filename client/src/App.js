import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import Chat from './components/Chat';
import SignInForm from './components/SignInForm'

class App extends Component {
  state = {
    username: ''
  }
  getUserName = (username) => {
    this.setState({
      username
    })
  }

  render() {
    console.log("username", this.state.username);
    return (
    <Router>
      <div className="App">
        <Link to="/login" style={{marginRight:"16px"}} >Login</Link>
        <Route exact path="/login" render={({history}) => <SignInForm getUserName={this.getUserName} history={history}/>}/>
        <Route exact path="/chat" render={({history}) => <Chat username={this.state.username} history={history}/>}/>        
      </div>
    </Router>
    );    
  }
}

export default App;
