import { Component } from "react";

export default class Login extends Component {
    render() {
        return(
            <div className="login-form">
                <h2>Login to Buddy Account!</h2>
                <form onSubmit={this.props.login} >
                <label htmlFor="name">User Name:</label>
                <input type="text" name="username" required/>
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" />
                <br />
                <input type="submit" value="Submit" onSubmit={this.props.login} ></input>
                </form>
            </div>
        )
    }
}