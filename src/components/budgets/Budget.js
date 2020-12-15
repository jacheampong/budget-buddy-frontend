import { Component } from "react";

export default class Budget extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      total: this.props.total,
    }
  }

  render() {
    return (
      <div className="budget">
        <h4>Name: {this.props.budgetname}</h4>
          <form id={this.props.budgetid} onSubmit={this.props.saveBudget} >
          <input hidden name="budgetname" defaultValue={this.props.budgetname} />
          <label htmlFor="Wages">Wages:</label>
          <input type="number" ref="wages" name="wages" defaultValue={this.props.wages} required onChange={this.changeHandler} />
          <br />
          <label htmlFor="rent">rent:</label>
          <input type="number" ref="rent" name="rent" defaultValue={this.props.rent | 0}  onChange={this.changeHandler} />
          <br />
          <label htmlFor="grocery">grocery:</label>
          <input type="number" ref="grocery" name="grocery" defaultValue={this.props.grocery | 0}  onChange={this.changeHandler} />
          <br />
          <label htmlFor="insurance">insurance:</label>
          <input type="number" ref="insurance" name="insurance" defaultValue={this.props.insurance | 0}  onChange={this.changeHandler} />
          <br />
          <label htmlFor="phonebill">phonebill:</label>
          <input type="number" ref="phonebill" name="phonebill" defaultValue={this.props.phonebill | 0}  onChange={this.changeHandler} />
          <br />
          <label htmlFor="carpayment">carpayment:</label>
          <input type="number" ref="carpayment" name="carpayment" defaultValue={this.props.carpayment | 0}  onChange={this.changeHandler} />
          <br />
          <label htmlFor="gasoline">gasoline:</label>
          <input type="number" ref="gasoline" name="gasoline" defaultValue={this.props.gasoline | 0}  onChange={this.changeHandler} />
          <br />
          <label htmlFor="others">others:</label>
          <input type="number" ref="others" name="others" defaultValue={this.props.others | 0}  onChange={this.changeHandler} />
          <br />
          <label htmlFor="total">Total Expense:</label>
          <input type="number" name="total" value={this.state.total | 0} readOnly />
          <br />

          <input type="submit" value="Save" onSubmit={this.props.saveBudget} ></input>
          </form>

      </div>
    );
  }

  /**
   * changeHandler - Update Total Expense value when other
   * values change
   * @param {*} event 
   */
  changeHandler = (event) => {
    const formData = {};
    let sumTotal = 0
    let subTotal = 0
    let wages = this.refs["wages"].value
    for (const data in this.refs) {
      // formData[data] = this.refs[data].value;
      if(Number(this.refs[data].value)) {
        subTotal += parseInt(this.refs[data].value)
        formData[data] = this.refs[data].value;
      } else {
        subTotal += 0
        formData[data] = 0
      }
      
    }
    // calculating total monthly expense
    // subTotal includes wages from the form
    // therefore have to balance for calculation
    sumTotal = parseInt(wages) + parseInt(wages) - parseInt(subTotal)
    console.log('wages => ', wages);
    // console.log('subTotal => ', subTotal);
    console.log('formData => ', formData);
    console.log('sumTotal => ', sumTotal);
    this.setState({
      total: sumTotal,
    })
  }

  /**
   * validateField -  value field input
   * @param {*} event 
   */
  validateField = (event) => {
    event.preventDefault();
    if (!Number(event.target.value) || parseInt(event.target.value) < 0) {
      alert([event.target.name] + " must be a valid number");
      return
    }
  }

}
