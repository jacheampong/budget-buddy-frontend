import { Component } from "react";

export default class Budget extends Component {
  render() {
    return (
      <div className="budget">
        <h4>Name: {this.props.budgetname}</h4>
          <form onSubmit={this.props.update} >
          <label htmlFor="Wages">Wages:</label>
          <input type="text" name="Wages" defaultValue={this.props.wages} required/>
          <br />
          <label htmlFor="rent">rent:</label>
          <input type="text" name="rent"  defaultValue={this.props.grocery} />
          <br />

          <label htmlFor="grocery">grocery:</label>
          <input type="text" name="grocery" defaultValue={this.props.grocery | 0} />
          <br />
          <label htmlFor="insurance">insurance:</label>
          <input type="text" name="insurance" defaultValue={this.props.insurance | 0} />
          <br />
          <label htmlFor="phonebill">phonebill:</label>
          <input type="text" name="phonebill" defaultValue={this.props.phonebill} />
          <br />
          <label htmlFor="carpayment">carpayment:</label>
          <input type="text" name="carpayment" defaultValue={this.props.carpayment} />
          <br />
          <label htmlFor="gasoline">gasoline:</label>
          <input type="text" name="gasoline" defaultValue={this.props.gasoline} />
          <br />
          <label htmlFor="others">others:</label>
          <input type="text" name="others" defaultValue={this.props.others} />
          <br />

          <input type="submit" value="Save" onSubmit={this.props.update} ></input>
          </form>

      </div>
    );
  }
}
