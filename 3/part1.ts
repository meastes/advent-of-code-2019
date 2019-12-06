import * as fs from 'fs';

const GRID_SIZE = 4000;
const CENTER = GRID_SIZE / 2;

type Direction = 'R' | 'L' | 'U' | 'D' | null;

interface LineState {
  line0: Direction;
  line1: Direction;
}

const INITIAL_LINE_STATE: LineState = Object.freeze({
  line0: null,
  line1: null,
});

const grid: LineState[][] = Array.from(Array(GRID_SIZE), () =>
  Array(GRID_SIZE).fill({ ...INITIAL_LINE_STATE }),
);

function getLines(): string[][] {
  const input = fs.readFileSync(`${__dirname}/input.txt`).toString();
  return input.split('\n').map((item) => item.split(','));
}

function populateGrid(lines: string[][]) {
  // Fill in the grid with the paths of each line
  lines.forEach((line, lineIndex) => {
    // Start in the center
    let x = CENTER;
    let y = CENTER;

    line.forEach((instruction) => {
      const direction = instruction.charAt(0);
      const distance = parseInt(instruction.substring(1), 10);

      switch (direction) {
        case 'R': {
          const endOfLine = x + distance;
          for (; x < endOfLine; x++) {
            grid[x][y][`line${lineIndex}`] = direction;
          }
          break;
        }
        case 'L': {
          const endOfLine = x - distance;
          for (; x > endOfLine; x--) {
            grid[x][y][`line${lineIndex}`] = direction;
          }
          break;
        }
        case 'U': {
          const endOfLine = y - distance;
          for (; y > endOfLine; y--) {
            grid[x][y][`line${lineIndex}`] = direction;
          }
          break;
        }
        case 'D': {
          const endOfLine = y + distance;
          for (; y < endOfLine; y++) {
            grid[x][y][`line${lineIndex}`] = direction;
          }
          break;
        }
      }
    });
  });
}

function getNearestCollision(): [number, number] {
  for (let distanceFromCenter = 1; distanceFromCenter < CENTER; distanceFromCenter++) {
    for (let x = CENTER - distanceFromCenter; x < CENTER + distanceFromCenter; x++) {
      for (let y = CENTER - distanceFromCenter; y < CENTER + distanceFromCenter; y++) {
        const { line0, line1 } = grid[x][y];

        if (line0 && line1) {
          console.log(`found collision at (${x}, ${y})`);
          console.log(grid[x][y]);
          return [x, y];
        }
      }
    }
  }

  throw Error('no collisions found');
}

function printGrid() {
  grid.forEach((row) => {
    let rowText = '';

    row.forEach((cell) => {
      if (cell.line0 === 'R' || cell.line0 === 'L' || cell.line1 === 'R' || cell.line1 === 'L') {
        rowText += '-';
      } else if (
        cell.line0 === 'U' ||
        cell.line0 === 'D' ||
        cell.line1 === 'U' ||
        cell.line1 === 'D'
      ) {
        rowText += '|';
      } else {
        rowText += '.';
      }
    });

    console.log(rowText);
  });
}

populateGrid(getLines());
// printGrid();
const [x, y] = getNearestCollision();
const distance = Math.abs(CENTER - y) + Math.abs(CENTER - x);
console.log(`Nearest collision distance: ${distance}`);
