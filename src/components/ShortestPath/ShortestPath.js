import React from 'react';

import './ShortestPath.scss';
import graphService from '../../helpers/graph'; 

class ShortestPath extends React.Component {
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
    const regex = /^[a-z]{0,2}$/i;
    if(!regex.test(value)){
      this.setState(() => ({ errorMessage: 'Only two nodes are allowed. e.g AB or ED etc...' }));
      return false;
    }
    this.setState(() => ({ [name]: value, errorMessage: '' }));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.routeInput);
    const { routeInput } = this.state;
    console.log(routeInput);
    const regex = /^[a-z]{2}$/i;
    if(!regex.test(routeInput)){
      this.setState(() => ({ errorMessage: 'Please enter the route. e.g AB or ED etc...' }));
      return false;
    }
    const cost = graphService.cheapestRoute(routeInput[0], routeInput[1]);
    this.setState(() => ({ calculatedCost: cost }));
  }

  render() {
    const { routeInput, calculatedCost, errorMessage } = this.state;
    return (
      <div className="case shortest-path">
        <h3>Cheapest Path</h3>
        <form data-test="shortestpath-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Calculate shortest path cost between two points</label>
            <input type="text" className="form-control"  name="routeInput" placeholder="e.g. AB" value={routeInput} onChange={this.handleChange} />
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
          Cheapest route cost: 
          { 
            calculatedCost === 0 ? (
              <span> No route found</span>
            ) : (
              <span> { calculatedCost }</span>
            )
          }
        </div>
      </div>
    );
  }
}

export default ShortestPath;
