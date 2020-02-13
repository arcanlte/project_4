import React, { Component } from 'react';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      trainername: "",
      password: ""
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    // Same as const name = e.target.name // const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        {this.props.errorText && <p>{this.props.errorText}</p>}
        <form onSubmit={(e) => this.props.handleRegister(e, this.state)}>
          <h2>Register!</h2>
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="trainername">Trainername</label>
          <input
            type="text"
            name="trainername"
            value={this.state.trainername}
            onChange={this.handleChange}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Submit!</button>
        </form>
      </div>
    )
  }
}