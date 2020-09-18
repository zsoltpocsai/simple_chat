import React from 'react';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {error: "", username: ""};
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
    if (this.state.error) {
      this.setState({ error: "" });
    }
  }

  handleSubmit(e) {
    const usernames = this.props.users.map(user => user.name);
    const submittedName = this.state.username;

    if (!submittedName) {
      this.setState({ error: "Empty field!" });
    } else if (!usernames.includes(submittedName)) {
      this.props.onLogin(submittedName);
    } else {
      this.setState({ error: "User already exist!" });
    }
  }

  render() {
    const errorMessage = <div className="error">{this.state.error}</div>;

    return (
      <div className="Login">
        <h1>Welcome to SimpleChat!</h1>
        <input type="text" placeholder="Type in your name!" 
          value={this.state.username} onChange={this.handleChange} />
        <button onClick={this.handleSubmit} >Enter</button>
        {this.state.error && errorMessage}
      </div>
    )
  }
}

export default Login;