import { Component } from 'react';
import Budget from './Budget'

export default class Budgets extends Component { 
  render() {
      let allBudgets = <h4>No Budget!</h4>;
      if(this.props.budgets.length > 0) {
        allBudgets = this.props.budgets.map((budget, index) => {
            return <Budget 
                    budgetname={budget.budgetname}
                    wages={budget.wages}
                    rent={budget.rent} 
                    grocery={budget.grocery} 
                    insurance={budget.insurance} 
                    phonebill={budget.phonebill} 
                    carpayment={budget.carpayment}
                    gasoline={budget.gasoline}
                    others={budget.others} 
                    key={index}
                    />
        })
      }

    return (
      <div className="App">
        <h1>All Budgets !</h1>

        {allBudgets}
      </div>
    )
  }
}