import React from 'react';

import './InputGraph.scss';
import graphService from '../../helpers/graph'; 

class InputGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphInput: '',
      errorMessage: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const regex = /^([a-z]+[\s]*[0-9]+[,]*)+$/i;
    if(!regex.test(value)){
      this.setState(() => ({ errorMessage: 'Only , allowed other special charaacters are not' }));
      return false;
    }
    this.setState(() => ({ [name]: value, errorMessage: '' }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { graphInput } = this.state;
    if (!graphInput) {
      this.setState(() => ({ errorMessage: 'Please enter the route e.g: AB or ABE or etc...' }));
      return;
    }
    const str = this.state.graphInput.replace(/ /g, '');
    graphService.generateGraph(str);
    
    console.log("handleSubmit: ");
    console.log(graphService.totalPaths);
    console.log(graphService.routes);
    console.log(graphService.weights);
    console.log(graphService.graph);
    this.props.onSuccess();
  }

  render() {
    const { graphInput, errorMessage } = this.state;
    return (
      <div className="input-graph">
        <form data-test="inputgraph-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Enter the directed graph like placeholder. e.g: AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1</label>
            <input type="text" className="form-control"  name="graphInput" placeholder="AB1,AC4,AD10,..." value={graphInput} onChange={this.handleChange} />
            {
              errorMessage !== '' && (
                <div className="alert alert-danger">
                  <small>{errorMessage}</small>
                </div>
              )
            }
          </div>
          <div className="action-btns">
            <button type="submit" className="btn btn-info">Gennerate Graph</button>
          </div>
        </form>
      </div>
    );
  }
}

export default InputGraph;
