import { processedDataPart2 as processedData } from './data';
import { executeMulExpression } from './part1';

const { result } = processedData.reduce(
  (state, regExpArray) => {
    const [token] = regExpArray;
    if (token.startsWith('mul') && !state.isDisabled) {
      return {
        ...state,
        result: state.result + executeMulExpression(token),
      };
    }

    if (token === 'do()') {
      return {
        ...state,
        isDisabled: false,
      };
    }

    return {
      ...state,
      isDisabled: true,
    };
  },
  {
    result: 0,
    isDisabled: false,
  }
);

console.log(result);
