import * as fs from 'fs';
import * as _ from 'lodash';

function getLines(): string[][] {
  const input = fs.readFileSync(`${__dirname}/input.txt`).toString();
  return input.split('\n').map((item) => item.split(','));
}

function getCollisions(lines: string[][]) {
  const collisions: [number, number][] = [];

  let x = 0,
    y = 0;
  lines[0].forEach((instruction) => {
    const direction = instruction.charAt(0);
    const distance = parseInt(instruction.substring(1), 10);

    switch (direction) {
      case 'R': {
        const endOfLine = x + distance;
        let x2 = 0,
          y2 = 0;
        lines[1].forEach((instruction2) => {
          const direction2 = instruction2.charAt(0);
          const distance2 = parseInt(instruction2.substring(1), 10);

          switch (direction2) {
            case 'R': {
              x2 += distance2;
              break;
            }
            case 'L': {
              x2 -= distance2;
              break;
            }
            case 'U': {
              const endOfLine2 = y2 - distance2;
              if (x <= x2 && x2 <= endOfLine && y <= y2 && y2 <= endOfLine2) {
                collisions.push([x2, y]);
              }
              y2 -= distance2;
              break;
            }
            case 'D': {
              const endOfLine2 = y2 + distance2;
              if (x <= x2 && x2 <= endOfLine && y <= y2 && y2 <= endOfLine2) {
                collisions.push([x2, y]);
              }
              y2 += distance2;
              break;
            }
          }
        });
        break;
      }
      case 'L': {
        const endOfLine = x - distance;
        break;
      }
      case 'U': {
        const endOfLine = y - distance;
        break;
      }
      case 'D': {
        const endOfLine = y + distance;
        break;
      }
    }
  });

  return _.uniqWith(collisions, (a, b) => a[0] === b[0] && a[1] === b[1]);
}

const collisions = getCollisions(getLines());
console.log(collisions);
