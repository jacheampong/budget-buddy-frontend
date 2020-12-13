import { Component } from 'react';
import './App.css';
import Budgets from './components/budgets/Budgets'

export default class App extends Component { 
  render() {
    return (
      <div className="App">
        <h1>React Budget Buddy!</h1>

        <Budgets />
      </div>
    )
  }
}

