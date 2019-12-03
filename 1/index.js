const fs = require('fs');

function getWeights() {
  const input = fs.readFileSync('./input.txt').toString();
  return input.split('\n').filter((weight) => weight !== '');
}

function getFuelRequirements(weights) {
  return weights.map((weight) => Math.floor(weight / 3) - 2);
}

const weights = getWeights();
const fuelRequirements = getFuelRequirements(weights);
const total = fuelRequirements.reduce((total, currentWeight) => total + currentWeight, 0);

console.log(`Total Fuel: ${total}`);
