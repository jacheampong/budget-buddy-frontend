import { Component } from 'react';
import './App.css';
import Budgets from './components/budgets/Budgets'

export default class App extends Component { 

  constructor(props) {
    super(props)

    this.state = {
      budgets: []
    }
  }

  setBudgets = (budgets) => {
    this.setState({ budgets: budgets})
  }

  render() {
    return (
      <div className="App">
        <h1>React Budget Buddy!</h1>

        <Budgets 
          budgets={this.state.budgets}
          setBudgets={this.setBudgets} 
        />
      </div>
    )
  }
}

