import graphService from '../helpers/graph';

const graphInput = 'AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1';
const expectedGraph = {
  A: {B: 1, C: 4, D: 10},
  B: {E: 3},
  C: {D: 4, F: 2},
  D: {E: 1},
  E: {B: 3, A: 2},
  F: {D: 1},
};
describe('Graph service test', () => {
  it('generate graph', () => {
    graphService.generateGraph(graphInput);
    expect(graphService.graph).toEqual(expectedGraph);
  });
  it('find cost of given route', () => {
    const expectedCost = 4;
    const calculatedCost = graphService.calculateRouteCost('ABE');
    expect(calculatedCost).toEqual(expectedCost);
  });
  it('find total paths between two nodes', () => {
    const expectedCost = 6;
    const calculatedCost = graphService.totalroutes('E', 'D');
    expect(calculatedCost).toEqual(expectedCost);
  });
  it('find total paths between two nodes with maximum stop', () => {
    const expectedCost = 4;
    const calculatedCost = graphService.totalroutes('E', 'D', 0, 4);
    expect(calculatedCost).toEqual(expectedCost);
  });
  it('find total paths between two nodes with maximum cost', () => {
    const expectedCost = 4;
    const calculatedCost = graphService.totalroutes('E', 'D', 15, 0);
    expect(calculatedCost).toEqual(expectedCost);
  });
  it('find cheapest path betweenn given nodes', () => {
    const expectedCost = 9;
    const calculatedCost = graphService.cheapestRoute('E', 'D');
    expect(calculatedCost).toEqual(expectedCost);
  });
});