import { processedData } from './data';

const { rules, updates } = processedData;

function isUpdateOrderCorrect(updates: string[]) {
  return updates.reduce((isOrderCorrect, pageNumber, pageNumberIndex) => {
    // Stop checking if the order is already found to be incorrect.
    if (!isOrderCorrect) {
      return false;
    }

    const { before: shouldBeBeforePageNumber, after: shouldBeAfterPageNumber } =
      rules[pageNumber];

    // Filter out before page numbers that are not in the update list, then check that
    // all before page numbers are indeed before the current page number.
    const hasCorrectOrderBeforePageNumber = shouldBeBeforePageNumber
      .filter((beforePageNumber) => updates.includes(beforePageNumber))
      .every(
        (beforePageNumber) =>
          updates.indexOf(beforePageNumber) < pageNumberIndex
      );

    // Filter out after page numbers that are not in the update list, then check that
    // all before page numbers are indeed after the current page number.
    const hasCorrectOrderAfterPageNumber = shouldBeAfterPageNumber
      .filter((afterPageNumber) => updates.includes(afterPageNumber))
      .every(
        (afterPageNumber) => updates.indexOf(afterPageNumber) > pageNumberIndex
      );

    return (
      isOrderCorrect &&
      hasCorrectOrderBeforePageNumber &&
      hasCorrectOrderAfterPageNumber
    );
  }, true);
}

const correctUpdateOrders = updates.filter((update) =>
  isUpdateOrderCorrect(update)
);

const correctOrdersMiddlePageNumberSum = correctUpdateOrders.reduce(
  (sum, update) => {
    const updateMiddleIndex = Math.floor(update.length / 2);
    return sum + parseInt(update[updateMiddleIndex]);
  },
  0
);

console.log(correctOrdersMiddlePageNumberSum);
