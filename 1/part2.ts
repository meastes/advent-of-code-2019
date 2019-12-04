import * as fs from 'fs';

function getWeights(): number[] {
  const input = fs.readFileSync(`${__dirname}/input.txt`).toString();
  return input.split('\n').map((weight) => parseInt(weight, 10));
}

function getFuelRequirements(weights: number[]) {
  return weights.map((weight) => {
    let totalFuel = 0;

    // Start with getting the fuel for the weights, then get the fuel for that fuel, and so on until
    // you get to an amount that is zero or less.
    let newFuel = weight;
    while ((newFuel = getFuelForWeight(newFuel)) > 0) {
      totalFuel += newFuel;
    }

    return totalFuel;
  });
}

function getFuelForWeight(weight: number) {
  return Math.floor(weight / 3) - 2;
}

const weights = getWeights();
const fuelRequirements = getFuelRequirements(weights);
const totalFuel = fuelRequirements.reduce((total, currentWeight) => total + currentWeight, 0);

console.log(`Total Fuel: ${totalFuel}`);
