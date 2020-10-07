import React from 'react';
import MessagesWindow from './MessagesWindow';
import MessageBar from './MessageBar';
import InfoBar from './InfoBar';
import { generateId } from './utils/id';
import MessageService from './services/MessageService';
import './TalkSection.css';

class TalkSection extends React.Component {
  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.getMessagesWithPartner = this.getMessagesWithPartner.bind(this);
    this.updateMessagesToBeRead = this.updateMessagesToBeRead.bind(this);
    this.showUserList = this.showUserList.bind(this);
    this.messageService = new MessageService();
  }

  handleLogout() {
    this.props.onLogout();
  }

  sendMessage(messageText) {
    if (this.props.partner) {
      this.messageService.postMessage(this.createMessage(messageText));
    }
  }

  createMessage(messageText) {
    const message = {
      id: generateId(),
      sender: this.props.host,
      recipient: this.props.partner,
      date: Date.now().toString(),
      content: messageText,
      unread: true
    }
    return message;
  }

  getMessagesWithPartner() {
    if (this.props.partner) {
      return this.props.messages.filter(message => {
        if (message.recipient != null && message.sender != null) {
          return (message.recipient.name === this.props.partner.name) ||
                 (message.sender.name === this.props.partner.name)
        } else {
          return false;
        }
      });
    } else {
      return [];
    }
  }

  updateMessagesToBeRead(messages) {
    const host = this.props.host;
    messages.forEach((message, index) => {
      if (message.unread && message.recipient.id === host.id) {
        messages[index].unread = false;
        this.messageService.updateMessage(messages[index]);
      }
    });
  }

  showUserList() {
    this.props.onShowUserList();
  }

  render() {
    const messagesToShow = this.getMessagesWithPartner();
    this.updateMessagesToBeRead(messagesToShow);
    return (
      <div className="TalkSection">
        <InfoBar 
          host={this.props.host}
          partner={this.props.partner}
          onLogout={this.handleLogout}
          onShowUserList={this.showUserList}
        />
        <MessagesWindow 
          messages={messagesToShow} 
          host={this.props.host} 
        />
        <MessageBar 
          onSubmitMessage={this.sendMessage} 
        />
      </div>
    );
  }
}

export default TalkSection;