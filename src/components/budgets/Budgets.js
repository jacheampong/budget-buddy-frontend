import { Component } from 'react';
import Budget from './Budget'
import {getAllBudgetsForUser, deleteBudgetById} from '../../api'

export default class Budgets extends Component { 

    componentDidMount() {
      const loggedIn = localStorage.getItem('loggedIn') === 'true';
      const loginUserId = loggedIn ? localStorage.getItem('loginUserId') : null
      getAllBudgetsForUser(loginUserId)
        .then((response) => {
            console.log('allBudgetsForUser', response)
            // response.data - axios response
            this.props.setBudgets(response.data.budgets)

        }).catch((error) => {
            console.log('API ERROR', error)
        })
    }

  render() {
      // let allBudgets = <h4>No Budget!</h4>
      let allBudgets = <Budget 
                        budgetid={null} 
                        budgetname={`${this.props.user}_budget`}
                        saveBudget={this.props.saveBudget}
                      />

      if(this.props.budgets && this.props.budgets.length > 0) {
        allBudgets = this.props.budgets.map((budget, index) => {
            return <Budget 
                    budgetid={budget._id}
                    budgetname={budget.budgetname}
                    wages={budget.wages}
                    rent={budget.rent} 
                    grocery={budget.grocery} 
                    insurance={budget.insurance} 
                    phonebill={budget.phonebill} 
                    carpayment={budget.carpayment}
                    gasoline={budget.gasoline}
                    others={budget.others} 
                    total={budget.total}
                    user={budget.user}
                    saveBudget={this.props.saveBudget}
                    deleteBudget={this.deleteBudget}
                    
                    key={index}
                    />
        })
      }

    return (
      <div className="App">

        {allBudgets }
        
        <button onClick={this.props.logout}>Logout</button>
        <br /><br />
      </div>
    )
  }

  // Make a call to API to Delete Budget
  deleteBudget = (id) => {
    console.log('Budget Id: ', id)
    deleteBudgetById(id)
      .then((response) => {
        console.log(`The Budget to be deleted: ${id}`)
        alert(`BUDGET DELETED!`)

        this.props.setBudgets(null)
      })
      .catch((error) => {
        console.log('API ERROR', error)
      })
  }

}