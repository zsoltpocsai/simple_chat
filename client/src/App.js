import React from 'react';

import UserList from './UserList';
import TalkSection from './TalkSection';
import Login from './Login';
import { generateId } from './utils/id';
import User from './common/User';
import UserService from './services/UserService';
import MessageService from './services/MessageService';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.setPartner = this.setPartner.bind(this);
    this.pingHost = this.pingHost.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);

    this.userService = new UserService();
    this.messageService = new MessageService();
    this.state = { host: null, partner: null, users: [], messages: [] };
  }

  componentDidMount() {
    const pingHostInterval = setInterval(this.pingHost, 10000);
    const fetchDataInterval = setInterval(() => {
      this.fetchUsers();
      this.fetchMessages();
    }, 2000);
    window.addEventListener("beforeunload", () => {
      clearInterval(fetchDataInterval);
      clearInterval(pingHostInterval);
    });
  }

  fetchUsers() {
    this.userService.getAllUsers(users => {
      if (this.state.host != null) {
        // the host should not be shown in the list of available users
        const filteredUserList = users.filter(
            user => user.id !== this.state.host.id);
        this.setState({users: filteredUserList});
      } else {
        this.setState({ users: users });
      }
    });
  }

  fetchMessages() {
    if (this.state.host) {
      this.messageService.getAllMessagesOfUser(
        this.state.host, 
        messages => {
          this.setState({messages: messages});
        }
      )
    } else {
      this.setState({messages: []});
    }
  }

  pingHost() {
    this.userService.postUser(this.state.host);
  }

  loginUser(userName) {
    const host = new User(generateId(), userName);
    this.setState({ host: host });
    this.pingHost();
  }

  logoutUser() {
    this.setState({host: null, partner: null});
  }

  setPartner(user) {
    this.setState({ partner: user });
  }

  render() {
    const host = this.state.host;
    const users = this.state.users;
    const partner = this.state.partner;

    if (host) {
      return (
        <div className="App">
          <UserList 
            users={users}
            messages={this.state.messages}
            onSelect={this.setPartner} 
          />
          <TalkSection 
            messages={this.state.messages} 
            host={host} 
            partner={partner} 
            onLogout={this.logoutUser}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Login users={users} onLogin={this.loginUser} />
        </div>
      );
    }
  }
}

export default App;
