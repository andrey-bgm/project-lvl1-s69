import { run, taskGenerator } from './lib/game';
import { randomInt } from './lib/utils';

const makeProgression = (start, max, step, count) => {
  if (start > max) {
    return [];
  }

  const iter = (i, n, acc) => {
    const endOfProgression = i < 1 || n + step > max;

    if (endOfProgression) {
      return acc;
    }

    return iter(i - 1, n + step, [...acc, n + step]);
  };

  return iter(count - 1, start, [start]);
};

const defaultRandomizer = ['start', 'step']
  .reduce((acc, key) => ({ ...acc, [key]: randomInt }), {});

const randomProgression = (params, randomizer = defaultRandomizer) => {
  const step = randomizer.step(params.minStep, params.maxStep);
  const rightmostStart = params.rangeEnd - (step * (params.count - 1));
  const maxStart = Math.max(params.rangeStart, rightmostStart);
  const start = randomizer.start(params.rangeStart, maxStart);
  const progression = makeProgression(
    start, params.rangeEnd, step, params.count);

  return progression;
};

const runGame = () => {
  const taskCount = 3;
  const params = {
    rangeStart: 1,
    rangeEnd: 999,
    minStep: 2,
    maxStep: 50,
    count: 10,
  };

  const generateTasks = taskGenerator(
    () => {
      const progression = randomProgression(params);
      const missingIndex = randomInt(0, progression.length - 1);

      return { progression, missingIndex };
    },
    ({ progression, missingIndex }) => progression.reduce(
        (acc, n, index) =>
          [
            acc.length === 0 ? '' : `${acc} `,
            index === missingIndex ? '..' : n,
          ].join(''),
          '',
      ),
    ({ progression, missingIndex }) => progression[missingIndex].toString(),
  );

  const rules = 'What number is missing in this progression?';
  const tasks = generateTasks(taskCount);
  run(rules, tasks);
};

export default runGame;
export { makeProgression, randomProgression };
