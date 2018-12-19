import React, { Component } from 'react';
import axios from "axios";
import { authenticateToken } from '../helpers/setAuthorizationToken';

class SignInForm extends React.Component {
  state = {
    username: '',
    password: ''
  }

  changeHandler = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async () => {
    const data = this.state;
    const res = await axios.post("/login", data);
    const token = res.data.access_token;
    authenticateToken(token);
    this.props.history.push("/chat");
    this.props.getUserName(this.state.username);
    
  }
  render() {
    const {username, password} = this.state;
    console.log(username, password);
    
    return (
      <div>      
        <div>
          <input type='text' placeholder='username' name='username' value={username} onChange={this.changeHandler}/>
        </div>
        <div>
          <input type='password' placeholder='password' name='password' value={password} onChange={this.changeHandler}/>
        </div>
        <div>
          <button onClick={this.handleSubmit}>Sign In</button>
        </div>
      </div> 
    );
  }
}

export default SignInForm;
