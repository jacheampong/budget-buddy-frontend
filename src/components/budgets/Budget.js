import { Component } from "react";

export default class Budget extends Component {
  render() {
    return (
      <div className="budget">
        <h4>Name: {this.props.budgetname}</h4>
        <p>
            Wages: ${this.props.wages} <br />
            rent: ${this.props.rent} <br />
            grocery: ${this.props.grocery}  <br />
            insurance: ${this.props.insurance}  <br />
            phonebill: ${this.props.phonebill}  <br />
            carpayment: ${this.props.carpayment} <br />
            gasoline: ${this.props.gasoline} <br />
            others: ${this.props.others}
        </p>
      </div>
    );
  }
}
