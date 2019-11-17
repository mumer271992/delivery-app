import React from 'react';

import './App.scss';
import InputGraph from './components/InputGraph/InputGraph';
import CostCalculator from './components/CostCalculator/CostCalculator';
import ShortestPath from './components/ShortestPath/ShortestPath';
import PossibleRoutes from './components/PossibleRoutes/PossibleRoutes';
import Graph from './components/Graph/Graph';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGraphGenerated: false,
    }
    this.graphGenerated = this.graphGenerated.bind(this);
  }

  graphGenerated() {
    this.setState(() => ({ isGraphGenerated: true }));
  }

  render() {
    const { isGraphGenerated } = this.state;
    return (
      <div className="App">
        <header><h1>Eko Deliver Service App</h1></header>
        <div className="app-body">
        <div className="container">
            {
              !isGraphGenerated ? (
                  <InputGraph onSuccess={this.graphGenerated}/>
              ) : (
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <Graph />
                  </div>
                  <div>
                    <CostCalculator />
                    <PossibleRoutes />
                    <ShortestPath />
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
