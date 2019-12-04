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

function findCorrectPair(program: number[], answer: number) {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      // Make a copy of the program to keep it in its original state
      let testProgram = [...program];

      // Modify the initial parameters with the noun and verb we are testing
      testProgram[1] = noun;
      testProgram[2] = verb;

      // Get back the entire output program
      const output = execute(testProgram);

      // Check if position 1 has the correct answer and return if it's correct
      if (output[0] === answer) {
        return [noun, verb];
      }
    }
  }
}

const program = getProgram();
console.log(findCorrectPair(program, 19690720));
