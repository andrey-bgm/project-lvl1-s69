import { runGame, taskGenerator, randomInt } from '../lib/utils';

const minValue = 100;
const maxValue = 9999;
const rule = 'Balance the given number.';

const balance = (n) => {
  const nArr = Math.abs(n).toString().split('').map(v => Number.parseInt(v, 10));
  const sign = n < 0 ? '-' : '';

  const iter = (acc) => {
    const min = Math.min(...acc);
    const max = Math.max(...acc);
    const isBalanced = max - min < 2;

    if (isBalanced) {
      const newStr = [...acc].sort().map(x => x.toString()).join('');
      const newN = Number.parseInt(`${sign}${newStr}`, 10);

      return newN;
    }

    const indexOfMin = acc.indexOf(min);
    const indexOfMax = acc.indexOf(max);
    const minIndex = Math.min(indexOfMin, indexOfMax);
    const maxIndex = Math.max(indexOfMin, indexOfMax);
    const computeNewMinMax = index =>
      (acc[index] === min ? acc[index] + 1 : acc[index] - 1);
    const newAcc = [
      ...(acc.slice(0, minIndex)),
      computeNewMinMax(minIndex),
      ...(acc.slice(minIndex + 1, maxIndex)),
      computeNewMinMax(maxIndex),
      ...(acc.slice(maxIndex + 1)),
    ];

    return iter(newAcc);
  };

  return iter(nArr);
};

const generateTasks = taskGenerator(
  () => randomInt(minValue, maxValue),
  number => number.toString(),
  number => balance(number).toString(),
);

export default (taskCount = 0) => {
  const tasks = generateTasks(taskCount);
  runGame(rule, tasks);
};

export { balance };
