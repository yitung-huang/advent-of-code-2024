import { processedData } from './data';

const { lettersMap, lines, numRows, numCols } = processedData;

const SEARCH_WORD = 'XMAS';

export function isOutOfBounds(row: number, column: number) {
  return row < 0 || row >= numRows || column < 0 || column >= numCols;
}

function searchInDirection(
  searchCharIndex: number,
  [rowIndex, colIndex]: [number, number],
  [xDir, yDir]: [number, number]
) {
  // If the place to search is out of bounds, stop searching.
  if (isOutOfBounds(rowIndex, colIndex)) return false;

  const searchChar = SEARCH_WORD[searchCharIndex];
  const searchCharOccurrences = lettersMap[searchChar];

  if (searchCharOccurrences[rowIndex]) {
    if (searchCharOccurrences[rowIndex].includes(colIndex)) {
      // The character of interest has been found.

      // If this is the last character of the search word, the word has been found.
      if (searchCharIndex === SEARCH_WORD.length - 1) {
        return true;
      }

      // Continue to search in the same direction.
      return searchInDirection(
        searchCharIndex + 1,
        [rowIndex + yDir, colIndex + xDir],
        [xDir, yDir]
      );
    }
  }

  // Didn't find the character, terminate search
  return false;
}

const rightwardSearchRegExp = /XMAS/g;
const leftwardSearchRegExp = /SAMX/g;

const horizontalSearchCounts = lines.reduce((sum, line) => {
  const rightwardMatchesWithinLine = [...line.matchAll(rightwardSearchRegExp)];
  const leftwardMatchesWithinLine = [...line.matchAll(leftwardSearchRegExp)];
  return (
    sum + rightwardMatchesWithinLine.length + leftwardMatchesWithinLine.length
  );
}, 0);

const totalSearchCounts = Object.entries(lettersMap[SEARCH_WORD[0]]).reduce(
  (sum, [row, occurrences]) => {
    let countsFromThisOccurence = 0;
    occurrences.forEach((column) => {
      const upwardsSearch = searchInDirection(
        1,
        [parseInt(row) - 1, column],
        [0, -1]
      );
      if (upwardsSearch) {
        countsFromThisOccurence++;
      }

      const upwardsLeftDiagonalSearch = searchInDirection(
        1,
        [parseInt(row) - 1, column - 1],
        [-1, -1]
      );
      if (upwardsLeftDiagonalSearch) {
        countsFromThisOccurence++;
      }

      const upwardsRightDiagonalSearch = searchInDirection(
        1,
        [parseInt(row) - 1, column + 1],
        [1, -1]
      );
      if (upwardsRightDiagonalSearch) {
        countsFromThisOccurence++;
      }

      const downwardsSearch = searchInDirection(
        1,
        [parseInt(row) + 1, column],
        [0, 1]
      );
      if (downwardsSearch) {
        countsFromThisOccurence++;
      }

      const downwardsLeftDiagonalSearch = searchInDirection(
        1,
        [parseInt(row) + 1, column - 1],
        [-1, 1]
      );
      if (downwardsLeftDiagonalSearch) {
        countsFromThisOccurence++;
      }

      const downwardsRightDiagonalSearch = searchInDirection(
        1,
        [parseInt(row) + 1, column + 1],
        [1, 1]
      );
      if (downwardsRightDiagonalSearch) {
        countsFromThisOccurence++;
      }
    });
    return sum + countsFromThisOccurence;
  },
  horizontalSearchCounts
);

console.log('Total search count is: ', totalSearchCounts);
