import { Component } from 'react';
import './App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import Budgets from './components/budgets/Budgets'
import { 
  registerNewUser, loginUser, 
  updateBudgetForCurrentUser, createBudgetForCurrentUser } from './api'
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
                    <h2>Welcome {this.state.loginUser}</h2>
                    <Budgets 
                      budgets={this.state.budgets}
                      setBudgets={this.setBudgets} 
                      saveBudget={this.saveBudget}
                      user={this.state.loginUser}
                      logout={this.logout}
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
        <h1>Budget 💸 Buddy!</h1>
        <Route path="/homing" exact render={() => <h2>Welcome Homing!</h2>} />

        <Route path="/logout" exact render={
          () => <div>
                  <h2>Thanks for using Budget 💸  Buddy!</h2>
                  <li>
                    <Link to={'/login'}>Login</Link>
                  </li>
                </div>
        } 
        />

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
          loggedIn: userLogged ? true : false
        })

        localStorage.setItem('loginUser', userLogged)
        localStorage.setItem('loginUserId', userLogged ? response.data.currentUser._id : null)
        localStorage.setItem('loggedIn', userLogged ? true : false)
        this.props.history.push('/');

      })
      .catch((error) => {
        localStorage.setItem('loggedInFailed', true)
        localStorage.setItem('loginUser', null)
        localStorage.setItem('loggedIn', false)
        localStorage.setItem('loginUserId', null)
        console.log('API ERROR', error)
        this.props.history.push('/register');
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
    this.props.history.push('/logout');
  }

  /**
   * saveBudget - Handles both SAVE and UPDATE budget changes
   * if Budget form Id is null/empty, it is a form. Call save/create
   * method. If form Id is present, call update/patch
   * @param {*} event 
   */
  saveBudget = (event) => {
    event.preventDefault();
    console.log('In saveBudget .. ', event.target)
    const form = event.target
    const formData = new FormData(form)
    const data = {}

    // get all form fields
    for (let [key, value] of formData.entries()) {
      data[key] = parseInt(value)
      console.log(key, value)
    }
    console.log(form['budgetname'].value)
    data['_id'] = form['id']
    data['user'] = this.state.loginUserId
    data['budgetname'] = form['budgetname'].value
    console.log('data => ', data);

    /**
     * if Budget form has an Id then update budget form
     * else create new Budget form
     */
    if(form['id']) {

      const budgetId = data['_id']
      console.log(`Budget ID: ${budgetId} updated`)
      updateBudgetForCurrentUser(budgetId, data)
      .then((response) => {
        console.log('Budget Update => ', response.data.budget)
        let alerText = response.data.budget
        alert(`${alerText} UPDATED!`)
      })
      .catch((error) => {
        console.log('API ERROR', error)
      })
    } else {
      // New form 
      console.log('Save New Budget form!')
      // Remove empty _id before sending post request
      delete data._id
      console.log('Create New Data => ', data)
      createBudgetForCurrentUser(data)
      .then((response) => {
        console.log('New Budget => ', response.data.budget)
        let budget = response.data.budget
        alert(`${budget.budgetname} CREATED!`)
      })
      .catch((error) => {
        console.log('API ERROR', error)
      })
    }
  }

}

export default withRouter(App)

