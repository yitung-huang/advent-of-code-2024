import { processedExampleData as processedData } from './data';

const { lettersMap, numRows, numCols } = processedData;

console.log(lettersMap);

const SEARCH_WORD = 'XMAS';

function isOutOfBounds(row: number, column: number) {
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

Object.entries(lettersMap[SEARCH_WORD[0]]).forEach(([row, occurrences]) => {
  console.log('Row ', row, ' has occurrences: ', occurrences);

  occurrences.forEach((column) => {
    const upwardsSearch = searchInDirection(
      1,
      [parseInt(row) - 1, column],
      [0, -1]
    );
    if (upwardsSearch) {
      console.log(
        'Found XMAS by searching upwards, starting from: (',
        row,
        ', ',
        column,
        ')'
      );
    }

    const upwardsLeftDiagonalSearch = searchInDirection(
      1,
      [parseInt(row) - 1, column - 1],
      [-1, -1]
    );
    if (upwardsLeftDiagonalSearch) {
      console.log(
        'Found XMAS by searching upwards left diagonal, starting from: (',
        row,
        ', ',
        column,
        ')'
      );
    }

    const upwardsRightDiagonalSearch = searchInDirection(
      1,
      [parseInt(row) - 1, column + 1],
      [1, -1]
    );
    if (upwardsRightDiagonalSearch) {
      console.log(
        'Found XMAS by searching upwards right diagonal, starting from: (',
        row,
        ', ',
        column,
        ')'
      );
    }

    const downwardsSearch = searchInDirection(
      1,
      [parseInt(row) + 1, column],
      [0, 1]
    );
    if (downwardsSearch) {
      console.log(
        'Found XMAS by searching downwards, starting from: (',
        row,
        ', ',
        column,
        ')'
      );
    }

    const downwardsLeftDiagonalSearch = searchInDirection(
      1,
      [parseInt(row) + 1, column - 1],
      [-1, 1]
    );
    if (downwardsLeftDiagonalSearch) {
      console.log(
        'Found XMAS by searching downwards left diagonal, starting from: (',
        row,
        ', ',
        column,
        ')'
      );
    }

    const downwardsRightDiagonalSearch = searchInDirection(
      1,
      [parseInt(row) + 1, column + 1],
      [1, 1]
    );
    if (downwardsRightDiagonalSearch) {
      console.log(
        'Found XMAS by searching downwards right diagonal, starting from: (',
        row,
        ', ',
        column,
        ')'
      );
    }
  });
});
