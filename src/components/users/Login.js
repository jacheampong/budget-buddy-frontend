import { Component } from "react";
import { Card, Row, Col } from 'react-materialize';
import { Link } from 'react-router-dom'

export default class Login extends Component {
    render() {
        return(
            <div className="login-form">
                <Row class="container">
                    <Col m={6} s={12} >
                        <Card
                            className="#80cbc4 teal lighten-4"
                            textClassName="blue-text text-darken-2"
                            title=" Login "
                        >
                            <div class="row">
                                <form class="col s12" onSubmit={this.props.login} >
                                <div class="row">
                                    <div class="input-field col s10">
                                    <i class="material-icons prefix">account_circle</i>
                                    <input id="icon_prefix" type="text" name="username" class="validate" />
                                    <label htmlFor="icon_prefix">User Name</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s10">
                                    <i class="material-icons prefix">password</i>
                                    <input id="password" type="password" name="password" class="validate" />
                                    <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <button 
                                    class="btn waves-effect waves-light" 
                                    type="submit" name="action" 
                                    onSubmit={this.props.login} 
                                    >
                                        Login In <i class="material-icons right">send</i>
                                </button>
                                </form>

                                <Link to={`/`}>HOME</Link>
                            </div>
                            
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}