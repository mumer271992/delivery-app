import React from 'react';
import vis from 'vis-network';

import './Graph.scss';
import graphService from '../../helpers/graph'; 

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Graph component is mounted");
    const graph = graphService.graph;
    this.drawGraph(graph);
  }

  drawGraph(graph) {
    const keys = Object.keys(graph);
    let nodesList = [];
    let edgesList = [];
    keys.forEach((key, index) => {
      nodesList.push({id: index, label: key});
    });
    keys.forEach((key, index) => {
      const connectedNode = graph[key];
      const keys = Object.keys(connectedNode);
      const fromIndex = nodesList.findIndex(node => node.label === key); 
      keys.forEach((k) => {
        const edge = {
          from: fromIndex,
          to: nodesList.findIndex(node => node.label === k),
          label: connectedNode[k] + '',
        }
        edgesList.push(edge);
      });
    });
    var nodes = new vis.DataSet(nodesList);
    var edges = new vis.DataSet(edgesList);
   
    // create a network
    let container = document.getElementById('mynetwork');
    let data = {
      nodes: nodes,
      edges: edges
    };
    
    let options = {
      edges:{
        arrows: 'to',
        shadow: true,
        smooth: true,
        color: {
          color: '#fff',
        },
      },
      nodes:{
        color: '#ff0000',
        fixed: false,
        font: '12px arial #fff',
        scaling: {
          label: true
        },
        shadow: true
      },
      autoResize: true,
    }
    
    let network = new vis.Network(container, data, options);
  }

  render() {
    return (
      <div className="graph">
        <div id="mynetwork"></div>
      </div>
    );
  }
}

export default Graph;
