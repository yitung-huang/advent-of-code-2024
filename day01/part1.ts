import { processedData } from './data.js';

const { listA, listB } = processedData;

listA.sort();
listB.sort();

const distanceSum = listA.reduce((sum, listAItem, index) => {
  return sum + Math.abs(listAItem - listB[index]);
}, 0);

console.log(distanceSum);
