import * as fs from 'fs';

function getWeights(): string[] {
  const input = fs.readFileSync(`${__dirname}/input.txt`).toString();
  return input.split('\n');
}

function getFuelRequirements(weights: string[]) {
  return weights.map((weight) => Math.floor(parseInt(weight, 10) / 3) - 2);
}

const weights = getWeights();
const fuelRequirements = getFuelRequirements(weights);
const total = fuelRequirements.reduce((total, currentWeight) => total + currentWeight, 0);

console.log(`Total Fuel: ${total}`);
