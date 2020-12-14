import { Component } from 'react';
import './App.css';
import Budgets from './components/budgets/Budgets'

export default class App extends Component { 

  constructor(props) {
    super(props)

    this.state = {
      budgets: [
        {
          budgetname: 'test-budget',
          wages: 2500,
          rent: 700,
          grocery: 200,
          insurance: 30,
          phonebill: 45,
          carpayment: 0,
          gasoline: 0,
          others: 50,
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <h1>React Budget Buddy!</h1>

        <Budgets budgets={this.state.budgets} />
      </div>
    )
  }
}

