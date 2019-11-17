const generateGraph = function (input){
  let inputPaths = input.split(',');
  inputPaths.forEach((path) => {
    let weight = path.substring(2);
    weight = parseInt(weight);
    let connectedNodes = this.graph[path[0]];
    if (!connectedNodes) {
      connectedNodes = {};
    }
    connectedNodes[path[1]] = weight;
    this.graph[path[0]] = connectedNodes;
  });
}

const calculateRouteCost = function(route) {
  let flag = false; let cost = 0;
  for(let i = 0; i < route.length; i++){
    let connectedNodes = this.graph[route[i]];
    if (i + 1 < route.length) {
      flag = connectedNodes.hasOwnProperty(route[i + 1]);
      if (flag) {
        cost = cost + connectedNodes[route[i + 1]];
      } else {
        cost = 0;
        break;
      }
    }
  }
  return cost;
}

let totalPaths = 0; let routes = []; let weigths =[];
const calculateTotalPaths = function(fromNode, toNode, visited, weight, firstTime, allowedWeight, maxStops) {
  if (allowedWeight && weight > allowedWeight) {
    return false
  }
  let flag = false;
  let connectedNodes = ctx.graph[fromNode];
  let keys = Object.keys(connectedNodes);
  for (let i = 0; i < keys.length; i++) {
    let isAllowed = true;
    if (maxStops) {
      const keys = Object.keys(visited);
      let totalStops = 0;
      keys.forEach((key) => {
        if (visited[key]) {
          totalStops++;
        }
      });
      isAllowed = totalStops <= maxStops;
    }
    if (visited[fromNode+keys[i]] || !isAllowed) {
        continue;
    } else if (fromNode === toNode && !firstTime) {
      totalPaths++;
        // console.log("found");
      return true;
    } else {
        visited[fromNode+keys[i]] = true;
        flag = calculateTotalPaths(keys[i], toNode, visited, connectedNodes[keys[i]] + weight, false, allowedWeight, maxStops);
        if (!flag) {

        } else {
          // console.log(visited)
          let v = Object.keys(visited)
          let route = []
          for (let j = 0; j < v.length; j++) {
            if (visited[v[j]] === true) {
              route.push(v[j])
            }
          }
          routes.push(route)
          weigths.push(connectedNodes[keys[i]] + weight)
        }
        visited[fromNode+keys[i]] = false;
    }
  }
  return false;
} 
let ctx = null;
const totalroutes = function(fromNode, toNode, allowedWeight, maxStops) {
  ctx = this;
  totalPaths = 0;
  routes = [];
  weigths = [];
  calculateTotalPaths(fromNode, toNode, {}, 0, true, allowedWeight, maxStops);
  return totalPaths;
}

const cheapestRoute = function(fromNode, toNode) {
  const paths = this.totalroutes(fromNode, toNode);
  let minWeight = weigths[0];
  weigths.forEach((itemWeight) => {
    if (itemWeight < minWeight) {
      minWeight = itemWeight;
    }
  });
  return minWeight;
}

export default {
  graph: {},
  generateGraph,
  calculateRouteCost,
  calculateTotalPaths,
  totalroutes,
  cheapestRoute,
}
