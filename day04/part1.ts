import { processedExampleData as processedData } from './data';

const { lettersMap, numRows, numCols } = processedData;

console.log(lettersMap);

const SEARCH_WORD = 'XMAS';

function isOutOfBounds(row: number, column: number) {
  return row < 0 || row >= numRows || column < 0 || column >= numCols;
}

function searchUpwards(
  /**
   * Index of current character of interest, in the search word.
   */
  searchCharIndex: number,
  /**
   * Row index to search.
   */
  rowIndex: number,
  /**
   * Column index to search.
   */
  colIndex: number
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

      // Continue to search upwards.
      return searchUpwards(searchCharIndex + 1, rowIndex - 1, colIndex);
    }
  }

  // Didn't find the character, terminate search
  return false;
}

function searchDownwards(
  /**
   * Index of current character of interest, in the search word.
   */
  searchCharIndex: number,
  /**
   * Row index to search.
   */
  rowIndex: number,
  /**
   * Column index to search.
   */
  colIndex: number
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

      // Continue to search downwards.
      return searchDownwards(searchCharIndex + 1, rowIndex + 1, colIndex);
    }
  }

  // Didn't find the character, terminate search
  return false;
}

Object.entries(lettersMap[SEARCH_WORD[0]]).forEach(([row, occurrences]) => {
  console.log('Row ', row, ' has occurrences: ', occurrences);

  occurrences.forEach((column) => {
    const upwardsSearch = searchUpwards(1, parseInt(row) - 1, column);
    if (upwardsSearch) {
      console.log(
        'Found XMAS by searching upwards, starting from: (',
        row,
        ', ',
        column,
        ')'
      );
    }

    const downwardsSearch = searchDownwards(1, parseInt(row) + 1, column);
    if (downwardsSearch) {
      console.log(
        'Found XMAS by searching downwards, starting from: (',
        row,
        ', ',
        column,
        ')'
      );
    }
  });
});
