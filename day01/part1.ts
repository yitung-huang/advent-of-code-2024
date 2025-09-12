import { data } from './data.js';

const { listA, listB } = data
  .split('\n')
  .reduce<{ listA: number[]; listB: number[] }>(
    (lists, dataLine) => {
      const [listAItem, listBItem] = dataLine.split('   ');
      return {
        listA: [...lists.listA, parseInt(listAItem)],
        listB: [...lists.listB, parseInt(listBItem)],
      };
    },
    { listA: [], listB: [] }
  );

listA.sort();
listB.sort();

const distanceSum = listA.reduce((sum, listAItem, index) => {
  return sum + Math.abs(listAItem - listB[index]);
}, 0);

console.log(distanceSum);
