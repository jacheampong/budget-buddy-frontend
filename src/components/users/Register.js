import { Component } from "react";

export default class Register extends Component {
    render() {
        return(
            <div className="register-form">
                <h2>You have to register!</h2>
                <form onSubmit={this.props.createNewUser} >
                <label htmlFor="name">User Name:</label>
                <input type="text" name="username" required/>
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" />
                <br />
                <label htmlFor="phone">phone:</label>
                <input type="phone" name="phone" />
                <br />
                <input type="submit" value="Submit" onSubmit={this.props.createNewUser} ></input>
                </form>
            </div>
        )
    }
}