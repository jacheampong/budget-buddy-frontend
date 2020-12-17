import { Component } from "react";
import { Card, Row, Col } from 'react-materialize';
import { Link } from 'react-router-dom'

export default class Register extends Component {
    render() {
        return(
            <div className="register-form">
                <Row class="container">
                    <Col m={6} s={12} >
                        <Card
                            className="#80cbc4 teal lighten-4"
                            textClassName="blue-text text-darken-2"
                            title="Register"
                        >
                            <div class="row" >
                                <form class="col s12" onSubmit={this.props.createNewUser} >
                                <div class="row">
                                    <div class="input-field col s11">
                                    <i class="material-icons prefix">account_circle</i>
                                    <input id="icon_prefix" type="text" name="username" class="validate" />
                                    <label htmlFor="icon_prefix">User Name</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s11">
                                    <i class="material-icons prefix">password</i>
                                    <input id="password" type="password" name="password" class="validate" />
                                    <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s11">
                                    <i class="material-icons prefix">email</i>
                                    <input id="email" name="email" type="email" class="validate" />
                                    <label htmlFor="email">Email</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s11">
                                    <i class="material-icons prefix">phone</i>
                                    <input name="phone" id="icon_telephone" type="tel" class="validate" />
                                    <label htmlFor="icon_telephone">Telephone</label>
                                    </div>
                                </div>
                                <button 
                                    class="btn waves-effect waves-light" 
                                    type="submit" name="action" 
                                    onSubmit={this.props.createNewUser}
                                    >
                                        Register <i class="material-icons right">send</i>
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