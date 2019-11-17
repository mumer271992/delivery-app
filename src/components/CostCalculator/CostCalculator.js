import React from 'react';

import './CostCalculator.scss';
import graphService from '../../helpers/graph'; 

class CostCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeInput: '',
      calculatedCost: -1,
      errorMessage: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const regex = /^([a-z]*)+$/i;
    if(!regex.test(value)){
      this.setState(() => ({ errorMessage: 'Only nodes are allowed' }));
      return false;
    }
    this.setState(() => ({ [name]: value, errorMessage: '' }));
  }

  handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    const { routeInput } = this.state;
    const cost = graphService.calculateRouteCost(routeInput);
    this.setState(() => ({ calculatedCost: cost }));
  }

  render() {
    const { routeInput, calculatedCost, errorMessage } = this.state;
    return (
      <div className="case cost-calculator">
        <h3>Cost Calculator</h3>
        <form data-test="costcalculator-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Enter route to calculate delivery cost</label>
            <input type="text" className="form-control"  name="routeInput" placeholder="e.g. ABE" value={routeInput} onChange={this.handleChange} />
            {
              errorMessage !== '' && (
                <div className="alert alert-danger">
                  <small>{errorMessage}</small>
                </div>
              )
            }
          </div>
          <div className="action-btns">
            <button type="submit" className="btn btn-info">Calculat</button>
          </div>
        </form>
        <div>
          Cost of the route: 
          { 
            calculatedCost === 0 ? (
              <span>No route found</span>
            ) : (
              <span> { calculatedCost }</span>
            )
          }
        </div>
      </div>
    );
  }
}

export default CostCalculator;
