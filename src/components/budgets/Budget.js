import { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import '../../App.css'
import { Row } from 'react-materialize';

export default class Budget extends Component {
  // initializing Javascript materialize-css components
  componentDidMount() {
    M.Tabs.init(this.Tabs);
  }

  constructor(props) {
    super(props) 
    this.state = {
      total: this.props.total,
    }
  }

  render() {
    return (
      <div className="budget">

          <div class="card">
            <div class="card-content">
              <h4>{this.props.budgetname}</h4>
            </div>
            <div>
              <ul
                ref={Tabs => { this.Tabs = Tabs; }}
                id="tabs-swipe-demo"
                className="tabs"
              >
                <li className="tab col s3">
                  <a href="#test-swipe-1">Monthly Estimate</a>
                </li>
                <li className="tab col s3">
                  <a href="#test-swipe-2">50/30/20 Budget Rule</a>
                </li>
              </ul>

              <div id="test-swipe-1" className="col s8">
                <div className="container">
                  <Row class="container">
                    <div class="col s10 m8">
                      <div class="card hoverable teal accent-1">

                        <form name="form-budget" id={this.props.budgetid} onSubmit={this.props.saveBudget} >
                          <input hidden name="budgetname" defaultValue={this.props.budgetname} />
                          <label htmlFor="Wages">Wages:</label>
                          <input type="number" ref="wages" name="wages" defaultValue={this.props.wages} required onChange={this.changeHandler} />
                          <label htmlFor="rent">rent:</label>
                          <input type="number" ref="rent" name="rent" defaultValue={this.props.rent | 0}  onChange={this.changeHandler} />
                          <label htmlFor="grocery">grocery:</label>
                          <input type="number" ref="grocery" name="grocery" defaultValue={this.props.grocery | 0}  onChange={this.changeHandler} />
                          <label htmlFor="insurance">insurance:</label>
                          <input type="number" ref="insurance" name="insurance" defaultValue={this.props.insurance | 0}  onChange={this.changeHandler} />
                          <label htmlFor="phonebill">phonebill:</label>
                          <input type="number" ref="phonebill" name="phonebill" defaultValue={this.props.phonebill | 0}  onChange={this.changeHandler} />
                          <label htmlFor="carpayment">carpayment:</label>
                          <input type="number" ref="carpayment" name="carpayment" defaultValue={this.props.carpayment | 0}  onChange={this.changeHandler} />
                          <label htmlFor="gasoline">gasoline:</label>
                          <input type="number" ref="gasoline" name="gasoline" defaultValue={this.props.gasoline | 0}  onChange={this.changeHandler} />
                          <label htmlFor="others">others:</label>
                          <input type="number" ref="others" name="others" defaultValue={this.props.others | 0}  onChange={this.changeHandler} />
                          <label htmlFor="total"><h6 >Total Expense:</h6></label>
                          <input type="number" name="total" value={this.state.total | 0} readOnly />
                          <br /><br />

                          <input type="submit" value="Save" onSubmit={this.props.saveBudget} ></input>
                          <br /><br />
                        </form>

                      </div>
                    </div>
                    </Row>
                </div>
              </div>

              <div id="test-swipe-2" className="col s12">
                <div>
                  <Row class="container">
                    <div class="col s10 m8">
                      <div class="card hoverable teal accent-1">

                        <div class="card-image">
                          <img src="/images/50-30-20_budget.jpg" alt="budget-buddy" ></img>
                        </div>

                        <div class="card-action">
                          <div class="row">
                            <div class="col s6">
                              <h6>50/30/20 ESTIMATOR</h6>
                              <div class="divider"></div>
                              <div class="row">
                                <form class="col s12">
                                  <label htmlFor="income">Monthly Income (after-tax)</label>
                                  <input type="number" ref="income" id="income" name="income" required onBlur={this.calculate50Budget} />
                                  <label htmlFor="necessities">Essentials:</label>
                                  <input type="number" ref="necessities" name="necessities" id="necessities" readOnly />
                                  <label htmlFor="wants">Wants:</label>
                                  <input type="number" ref="wants" name="wants" id="wants" readOnly />
                                  <label htmlFor="savings">Savings:</label>
                                  <input type="number" ref="savings" name="savings" id="savings" readOnly />
                                  <br /><br />
                                  {/* <input type="submit" value="Calculate" onClick={this.calculate50Budget} ></input> */}
                                  <button 
                                    class="btn waves-effect waves-light" 
                                    type="submit" name="action" 
                                    onClick={this.calculate50Budget} 
                                    >
                                        Calculate <i class="material-icons right">calculate</i>
                                </button>
                                </form>
                              </div>
                            </div>
                            <div class="col s6">
                              <h6>BUDGET BREAKDOWN</h6>
                              <div class="divider"></div>
                              <div class="section">
                                <h6>50% for Essentials:</h6>
                                <ul>
                                  <li>Housing, Groceries</li>
                                  <li>Utilities, Insurance</li>
                                </ul>
                              </div>
                              <div class="divider"></div>
                              <div class="section">
                                <h6>30% for Wants:</h6>
                                <ul>
                                  <li>Travel, entertainment</li>
                                  <li>Dining out, </li>
                                </ul>
                              </div>
                              <div class="divider"></div>
                              <div class="section">
                                <h6>20% Savings & Debt:</h6>
                                <p>
                                <ul>
                                  <li>emergency fund, 401K, IRA</li>
                                  <li>Savings, Debt payment</li>
                                </ul>
                                </p>
                              </div>
                            </div>
                          </div>
                          <br /><br/>
                        </div>
                      
                      </div>
                    </div>
                    </Row>
                </div>
              </div>
            </div>
          </div>

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

  /**
   * calculate50Budget - 50/30/20 Estimator calculator
   * @param {*} event 
   */
  calculate50Budget = (event) => {
    console.log('in calculate50Budget ...')
    event.preventDefault();

    let incomeInput = document.querySelector("#income").value
    console.log('event.target.value => ', event.target.value)
    console.log('incomeInput => ', incomeInput)

    // if event.target.value is not present, get value with
    // document.querySelector. This workaround for onClick 
    // returning null for event.target.value
    let income = event.target.value ? event.target.value : incomeInput

    // check if income is a valid not before calculating
    if (!Number(income) || parseInt(income) < 0) {
      alert("Monthly Income must be a valid number");
      return
    }

    let nec = parseInt(income) * 0.5
    let wants = parseInt(income) * 0.3
    let savings = parseInt(income) * 0.2

    // assign value to form input
    document.querySelector("#necessities").value = nec
    document.querySelector("#wants").value = wants
    document.querySelector("#savings").value = savings

  }

}
