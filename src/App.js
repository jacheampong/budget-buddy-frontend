import { Component } from 'react';
import './App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import Budgets from './components/budgets/Budgets'
import { 
  registerNewUser, loginUser, logoutUser,
  updateBudgetForCurrentUser, createBudgetForCurrentUser } from './api'
import Register from './components/users/Register'
import Login from './components/users/Login'
import './index.css';
import { Row } from 'react-materialize';
import "materialize-css/dist/css/materialize.min.css";


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
                    <h3 class="greeting-text" >Welcome {this.state.loginUser}</h3>
                    <Budgets 
                      budgets={this.state.budgets}
                      setBudgets={this.setBudgets} 
                      saveBudget={this.saveBudget}
                      user={this.state.loginUser}
                      deleteBudget={this.deleteBudget}
                      logout={this.logout}
                    />
                  </div>
    } else {
      homePage = <div>
                  <Row class="container">
                    <div class="col s10 m8">
                      <div class="card hoverable">
                        <div class="card-image">
                          <img src="/images/budget-buddy.jpg" alt="budget-buddy" ></img>
                          <span class="card-title purple-text text-accent-3"><h4 class="welcome-text" >Welcome to Buddy! ...</h4></span>
                          <a href="/login" class="btn-floating halfway-fab waves-effect waves-light green pulse">
                            <Link to={`/login`}><i class="material-icons">login</i></Link>
                          </a>
                        </div>
                        <div class="card-content">
                          <p class="home-text">
                            Enjoy your path to Financial Freedom<br/>
                            with worlds simplest budgeting app <br/>
                            BUDGET 💸  BUDDY
                          </p>
                        </div>
                        <div class="card-action">
                          <i class="material-icons prefix">login</i>
                          <Link to={'/login'}>Login</Link>
                          <br /><br/>
                          <i class="material-icons prefix">how_to_reg</i>
                          <Link to={`/register`}>Register</Link>
                        </div>
                        <a href="/register" class="btn-floating halfway-fab waves-effect waves-light green pulse">
                          <Link to={`/register`}><i class="material-icons">how_to_reg</i></Link>
                        </a>
                      </div>
                    </div>
                    </Row>
                </div>
    }

    return (
      <div className="App">
        <h2 class="budget-header">Budget 💸  Buddy!</h2>
        <Route path="/logout" exact render={
          () => <div>
                  <Row class="container">
                    <div class="col s10 m8">
                      <div class="card hoverable">
                        <div class="card-image">
                          <img src="/images/budget-buddy-2.jpg" alt="budget-buddy" ></img>
                          {/* <span class="card-title blue-text text-lighten-5"><h4>Welcome to Buddy!</h4></span> */}
                          <a href="/login" class="btn-floating halfway-fab waves-effect waves-light red pulse">
                            <Link to={`/`}><i class="material-icons">home</i></Link>
                          </a>
                        </div>
                        <div class="card-content">
                          <h3>Thanks for using <br/> Budget <Link to={'/'}>💸</Link>  Buddy!</h3>
                        </div>
                        <div class="card-action">
                          <br/>
                          <Link to={'/'}>
                            {/* <i class="material-icons prefix waves-effect waves-light teal lighten-2 large square pulse"><h4> 💸 </h4></i> */}
                            <i class="material-icons prefix waves-effect waves-light teal lighten-2 large "> account_balance </i>
                          </Link>
                          <br /><br/>
                        </div>
                      </div>
                    </div>
                    </Row>
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
        let newUser = response.data.user.username
        alert(`New User ${newUser} CREATED!`)
      })
      .catch((error) => {
        console.log('API ERROR', error)
      })
      this.props.history.push('/');
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
        let loginUserId = response.data.currentUser._id
        this.setState({
          loginUserId: loginUserId,
          loginUser: userLogged,
          reqMessage: response.data.message,
          loggedIn: userLogged ? true : false
        })

        localStorage.setItem('loginUser', userLogged)
        localStorage.setItem('loginUserId', userLogged ? loginUserId : null)
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

    // localStorage.setItem('loginUser', null)
    // localStorage.setItem('loggedIn', false)
    // localStorage.setItem('loginUserId', null)
    logoutUser()
      .then((response) => {
        console.log('Budget Update => ', response.data.currentUser)
        let loggedOutUser = response.data.currentUser
        localStorage.setItem('loginUser', loggedOutUser)
        localStorage.setItem('loggedIn', false)
        localStorage.setItem('loginUserId', response.data.currentUser)
        
        // update states
        this.setState({
          currentUser: loggedOutUser,
          newUser: '',
          reqMessage: '',
          loginUser: '',
          loginUserId: '',
          loggedIn: false,

        })
      })
      .catch((error) => {
        console.log('API ERROR', error)
      })
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

    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const loginUserId = loggedIn ? localStorage.getItem('loginUserId') : null

    // get userId from component state or localStorage
    data['user'] = this.state.loginUserId ? this.state.loginUserId : loginUserId
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

  deleteBudget = (event) => {
    console.log('In deleteBudget ...')
    event.preventDefault();

  }

}

export default withRouter(App)

