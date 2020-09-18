import React from 'react';
import Message from './Message';
import './MessagesWindow.css';


class MessagesWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
  }

  render() {
    const messages = this.props.messages.map(message => {
      return (
        <Message key={message.id} message={message} host={this.props.host} />
      );
    }).reverse();

    return (
      <div className="MessagesWindow">
        {messages}
      </div>
    );
  }
}

export default MessagesWindow;