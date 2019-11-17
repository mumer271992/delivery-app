import React from 'react';

import './PossibleRoutes.scss';
import graphService from '../../helpers/graph'; 

class PossibleRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeInput: '',
      totalPaths: -1,
      errorMessage: '',
      maxStops: 0,
      allowedWeight: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const regex = /^[a-z]{0,2}$/i;
    if(name === 'routeInput' && !regex.test(value)){
      this.setState(() => ({ errorMessage: 'Only two nodes are allowed. e.g AB or ED etc...' }));
      return false;
    }
    this.setState(() => ({ [name]: value, errorMessage: '' }));
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const { routeInput, allowedWeight, maxStops } = this.state;
    const regex = /^[a-z]{2}$/i;
    if(!regex.test(routeInput)){
      this.setState(() => ({ errorMessage: 'Please enter the route. e.g AB or ED etc...' }));
      return false;
    }
    debugger;
    const pathsCount = graphService.totalroutes(routeInput[0], routeInput[1], parseInt(allowedWeight), parseInt(maxStops));
    this.setState(() => ({ totalPaths: pathsCount }));
  }

  render() {
    const { routeInput, totalPaths, errorMessage, maxStops, allowedWeight } = this.state;
    return (
      <div className="case possible-routes">
        <h3>Possible Routes</h3>
        <form data-test="possibleroutes-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Enter two nodes to calculat all possible routes beween them</label>
            <input type="text" className="form-control"  name="routeInput" placeholder="e.g. AB or ED etc..." value={routeInput} onChange={this.handleChange} />
            {
              errorMessage !== '' && (
                <div className="alert alert-danger">
                  <small>{errorMessage}</small>
                </div>
              )
            }
          </div>
          <div className="form-group">
            <label>Enter maximum stops</label>
            <input type="number" className="form-control"  name="maxStops" value={maxStops} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Enter maximum allowed weight</label>
            <input type="number" className="form-control"  name="allowedWeight" value={allowedWeight} onChange={this.handleChange} />
          </div>
          <div className="action-btns">
            <button type="submit" className="btn btn-info">Calculat</button>
          </div>
        </form>
        <div>
          Total Possible routes: 
          { 
            totalPaths === 0 ? (
              <span>No route found</span>
            ) : (
              <span> { totalPaths }</span>
            )
          }
        </div>
      </div>
    );
  }
}

export default PossibleRoutes;
