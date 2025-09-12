import { processedData } from './data.js';

const { listA, listB } = processedData;

listA.sort();
listB.sort();

const listItemRecord: Record<
  string,
  { listACount: number; listBCount: number }
> = {};

listA.forEach((listAItem, index) => {
  // Create a record using the list A item number as key
  if (!listItemRecord[listAItem.toString()]) {
    listItemRecord[listAItem] = { listACount: 1, listBCount: 0 };
  } else {
    // Increment existing record count for list A item by 1
    listItemRecord[listAItem] = {
      listACount: listItemRecord[listAItem].listACount + 1,
      listBCount: listItemRecord[listAItem].listBCount,
    };
  }

  // Do the same for list B item
  if (!listItemRecord[listB[index].toString()]) {
    listItemRecord[listB[index]] = { listACount: 0, listBCount: 1 };
  } else {
    listItemRecord[listB[index]] = {
      listACount: listItemRecord[listB[index]].listACount,
      listBCount: listItemRecord[listB[index]].listBCount + 1,
    };
  }
});

const similarityScore = Object.entries(listItemRecord).reduce(
  (sum, [recordKey, recordValue]) => {
    return (
      sum +
      parseInt(recordKey) * recordValue.listACount * recordValue.listBCount
    );
  },
  0
);

console.log(similarityScore);
