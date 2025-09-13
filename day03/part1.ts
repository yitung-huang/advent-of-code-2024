import { processedData } from './data';

const numbersRegex = /\d+/g;

function executeMulExpression(mulString: string): number {
  const [num1, num2] = [...mulString.matchAll(numbersRegex)].map((matchedNum) =>
    parseInt(matchedNum[0])
  );

  return num1 * num2;
}

const results = processedData.reduce(
  (product, mulExpression) => product + executeMulExpression(mulExpression),
  0
);

console.log(results);
