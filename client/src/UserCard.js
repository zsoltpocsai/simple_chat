import React from 'react';
import './UserCard.css';

class UserCard extends React.Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    this.props.onSelect(this.props.user);
  }

  render() {
    let className = "UserCard";
    
    if (this.props.selected) {
      className += " selected";
    } else if (this.props.unreadMessage) {
      className += " new-msg";
    }

    return (
      <div 
        onClick={this.handleSelect} 
        className={className}
      >
        <div className="name">
          <span><strong>{this.props.user.name}</strong></span>
        </div>
      </div>
    );
  }
}

export default UserCard;