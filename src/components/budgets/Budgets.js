import { Component } from 'react';
import Budget from './Budget'

export default class Budgets extends Component { 
  render() {
    return (
      <div className="App">
        <h1>All Budgets !</h1>

        <Budget />
      </div>
    )
  }
}