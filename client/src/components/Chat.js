import React from 'react';
import io from 'socket.io-client';
import { deauthenticateToken } from  '../helpers/setAuthorizationToken';

class Chat extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        username: '',
        message: '',
        messages: []
    };

    this.socket = io('localhost:3000');

    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });

    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      console.log('here', this.props.username);
      
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            author: this.props.username,
            message: this.state.message
        })
        this.setState({message: ''});

    }
  }

  signOutHandler = () => {
    deauthenticateToken();
    this.props.history.push("/")
  }

  render() {
    return (
      <div>

        <div>
          {this.state.messages.map((message, i) => {
            return (
              <div key={i}>{message.author}: {message.message}</div>
            )
          })}
        </div>
        <div>
         <input type='text' placeholder='Message' value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
        </div>
        <div>
          <button onClick={this.sendMessage}>Send</button>
          <button onClick={this.signOutHandler} >Sign out</button>
        </div>
      </div>
    )
  }
}

export default Chat;
