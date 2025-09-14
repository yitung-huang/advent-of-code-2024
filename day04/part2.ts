import { processedData } from './data';
import { isOutOfBounds } from './part1';

const { lettersMap, lines } = processedData;

function lookUpCharAt(row: number, column: number) {
  if (isOutOfBounds(row, column)) {
    return '';
  }
  return lines[row]?.charAt(column) || '';
}

function isSamOrMas(leftChar: string, rightChar: string) {
  const fullString = `${leftChar}A${rightChar}`;
  return fullString === 'SAM' || fullString === 'MAS';
}

const totalSearchCounts = Object.entries(lettersMap.A).reduce(
  (sum, [rowStr, occurrences]) => {
    let countsFromThisOccurence = 0;
    occurrences.forEach((column) => {
      const row = parseInt(rowStr);

      const topLeft = lookUpCharAt(row - 1, column - 1);
      const bottomRight = lookUpCharAt(row + 1, column + 1);

      const topRight = lookUpCharAt(row - 1, column + 1);
      const bottomLeft = lookUpCharAt(row + 1, column - 1);

      const formsX =
        isSamOrMas(topLeft, bottomRight) && isSamOrMas(topRight, bottomLeft);

      if (formsX) {
        countsFromThisOccurence++;
      }
    });
    return sum + countsFromThisOccurence;
  },
  0
);

console.log(totalSearchCounts);
