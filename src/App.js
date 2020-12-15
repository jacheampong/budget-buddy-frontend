import { Component } from 'react';
import './App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import Budgets from './components/budgets/Budgets'
import { registerNewUser, loginUser } from './api'
import Register from './components/users/Register'
import Login from './components/users/Login'

class App extends Component { 

  componentDidMount() {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const loginUser = loggedIn ? localStorage.getItem('loginUser') : '';
    const loginUserId = loggedIn ? localStorage.getItem('loginUserId') : null
    this.setState({ loginUser, loggedIn, loginUserId });
  }
  
  constructor(props) {
    super(props)

    this.state = {
      currentUser: '',
      newUser: '',
      reqMessage: '',
      loginUser: '',
      loginUserId: '',
      loggedIn: false,
      budgets: [],
    }
  }

  setBudgets = (budgets) => {
    this.setState({ budgets: budgets})
  }

  setCurrentUser = (currentUser) => {
    this.setState({ currentUser: currentUser})
  }

  render() {

    let homePage = ''
    if(this.state.loggedIn) {
      homePage = <div>
                    <h2>Welcome {this.state.loginUser} </h2>
                    <Budgets 
                      budgets={this.state.budgets}
                      setBudgets={this.setBudgets} 
                    />
                  </div>
    } else {
      homePage = <div>
                  <h2>Welcome to Buddy!</h2>
                  <ul>
                    <li>
                      <Link to={`/register`}>Register</Link>
                    </li>
                    <li>
                      <Link to={'/login'}>Login</Link>
                    </li>
                  </ul>
                </div>
    }

    return (
      <div className="App">
        <h1>React Budget Buddy!</h1>
        <Route path="/homing" exact render={() => <h2>Welcome Homing!</h2>} />

        <Route path="/" exact render={
          () => homePage
        } 
        />

        <Route path="/login" exact render={(props) => {
          return <Login {...props}
            login={this.login}
          />
        }} />

        <Route path="/register" exact render={(props) => {
          return <Register {...props}
            createNewUser={this.createNewUser}
          />
        }} /> 

      </div>
    )
  }

  /**
   * call to create a new user in DB
   * @param {*} event 
   */
  createNewUser = (event) => {
    event.preventDefault();
    const target = event.target;
    
    const username = target.username.value
    const password = target.password.value
    const email = target.email.value
    const phone = target.phone.value
    registerNewUser(username, password, email, phone)
      .then((response) => {
        console.log('newUser', response)
        // response.data - axios response
        this.setCurrentUser(response.data.user.username)
        this.setState({
          newUser: response.data.user.username
        })
      })
      .catch((error) => {
        console.log('API ERROR', error)
      })
  }

  /**
   * call to login a registered user
   * @param {*} event 
   */
  login = (event) => {
    console.log('Login to Budget Buddy ...')
    event.preventDefault();
    const target = event.target;
    const username = target.username.value
    const password = target.password.value

    loginUser(username, password)
      .then((response) => {
        console.log('loginUser', response)
        let userLogged = response.data.currentUser 
                          ? response.data.currentUser.username 
                          : null
        // response.data - axios response
        this.setCurrentUser(response.data.currentUser)
        this.setState({
          loginUser: userLogged,
          reqMessage: response.data.message,
          loggedIn: true
        })

        localStorage.setItem('loginUser', userLogged)
        localStorage.setItem('loginUserId', response.data.currentUser._id)
        localStorage.setItem('loggedIn', true)
        this.props.history.push('/');

      })
      .catch((error) => {
        console.log('API ERROR', error)
      })

  }

  /**
   * logout current user
   * @param {*} event 
   */
  logout = (event) => {
    console.log('Logout Buddy ...')
    event.preventDefault();

    localStorage.setItem('loginUser', null)
    localStorage.setItem('loggedIn', false)
    localStorage.setItem('loginUserId', null)
    this.props.history.push('/');
  }

}

export default withRouter(App)

