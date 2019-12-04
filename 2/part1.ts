import * as fs from 'fs';

function getProgram(): number[] {
  return fs
    .readFileSync(`${__dirname}/input.txt`)
    .toString()
    .split(',')
    .map((num) => parseInt(num, 10));
}

function execute(program: number[]): number[] {
  let output = [...program];

  for (let i = 0; i < output.length; i += 4) {
    const opcode = output[i];
    switch (opcode) {
      case 1:
        calculate(output, i, 'Add');
        break;
      case 2:
        calculate(output, i, 'Multiply');
        break;
      case 99:
        return output;
    }
  }

  return output;
}

function calculate(output: number[], startIndex: number, operation: 'Add' | 'Multiply') {
  const firstNumberIndex = output[startIndex + 1];
  const secondNumberIndex = output[startIndex + 2];
  const outputIndex = output[startIndex + 3];

  const firstNumber = output[firstNumberIndex];
  const secondNumber = output[secondNumberIndex];

  let result: number;
  switch (operation) {
    case 'Add':
      result = firstNumber + secondNumber;
      break;
    case 'Multiply':
      result = firstNumber * secondNumber;
      break;
  }

  output[outputIndex] = result;
}

const program = getProgram();

// Modify the program per the problem statement
program[1] = 12;
program[2] = 2;

const output = execute(program);

console.log(output.join(','));
