import React from 'react';
import './MessageBar.css';


class MessageBar extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = {messageText: ""};
  }

  onKeyDown(event) {
    if (event.key === "Enter") {
      this.submitMessage();
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  handleInputChange(event) {
    this.setState({messageText: event.target.value});
  }

  submitMessage() {
    const messageText = this.state.messageText;
    if (messageText) {
      this.setState({messageText: ""});
      this.props.onSubmitMessage(messageText);
    }
  }

  render() {
    return (
      <div className="MessageBar">
        <input 
          type="text" 
          value={this.state.messageText}
          onChange={this.handleInputChange}
          placeholder="Type your message here..." 
        />
        <div className="btn-holder">
          <button onClick={this.submitMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default MessageBar;