import React from 'react';
import UserCard from './UserCard';
import './UserList.css';


class UserList extends React.Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {selected: null};
  }

  handleSelect(user) {
    this.props.onSelect(user);
    this.setState({selected: user});
  }

  getUnreadMessages(messages) {
    return messages.filter(message => message.unread);
  }

  render() {
    const unreadMessages = this.getUnreadMessages(this.props.messages);
    const users = this.props.users.map(user => {
      let selected = false;
      let unreadMessage = false;

      if (this.state.selected != null && 
          this.state.selected.id === user.id) {
        selected = true;
      }

      unreadMessages.forEach(message => {
        if (message.sender.name === user.name) {
          unreadMessage = true;
        }
      });

      return ( 
        <UserCard 
          selected={selected} 
          key={user.id} 
          user={user}
          unreadMessage={unreadMessage}
          onSelect={this.handleSelect}
        />
      );
    });

    return (
      <div className="UserList">
        {users}
      </div>
    );
  }
}

export default UserList;