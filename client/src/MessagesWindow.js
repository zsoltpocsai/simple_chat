import React from 'react';
import Message from './Message';
import './MessagesWindow.css';


class MessagesWindow extends React.Component {
  constructor() {
    super();
    this.state = {messages: []};
  }

  componentDidUpdate() {
    const length = this.props.messages.length;
    if (length > 0) {
      let lastMessageId = this.props.messages[length - 1].id;
      document.getElementById(lastMessageId).scrollIntoView();
    }
  }

  render() {
    const messages = this.props.messages.map(message => {
      return (
        <Message 
          key={message.id} 
          message={message} 
          host={this.props.host} 
          id={message.id} 
        />
      );
    }).reverse();

    return (
      <div className="MessagesWindow">
        <div className="flex-container">
          {messages}
        </div>
      </div>
    );
  }
}

export default MessagesWindow;