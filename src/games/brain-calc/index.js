import * as lists from 'hexlet-pairs-data';
import * as pairs from 'hexlet-pairs';
import brainGame from '../../lib/brain-game';
import { randomInt } from '../../lib/utils';
import taskGenerator from '../../lib/task-generator';

const taskCount = 3;
const minValue = 1;
const maxValue = 100;

const makeExpression = (question, answer) => pairs.cons(question, answer);
const expressionQuestion = expr => pairs.car(expr);
const expressionAnswer = expr => pairs.cdr(expr);

const biExpression = (fn, fnStr) => makeExpression(
  args => `${pairs.car(args)} ${fnStr} ${pairs.cdr(args)}`,
  args => (fn(pairs.car(args), pairs.cdr(args))).toString(),
);

const expressions = lists.l(
  biExpression((a, b) => a + b, '+'),
  biExpression((a, b) => a - b, '-'),
  biExpression((a, b) => a * b, '*'),
);

const exprDataDo = (exprData, exprFn) => {
  const expr = pairs.car(exprData);
  const args = pairs.cdr(exprData);

  return exprFn(expr)(args);
};

const generator = taskGenerator(
  () => {
    const n = randomInt(0, lists.length(expressions) - 1);
    const expr = lists.get(n, expressions);
    const args = pairs.cons(
      randomInt(minValue, maxValue),
      randomInt(minValue, maxValue),
    );
    const exprData = pairs.cons(expr, args);

    return exprData;
  },
  exprData => exprDataDo(exprData, expressionQuestion),
  exprData => exprDataDo(exprData, expressionAnswer),
);

const game = () => {
  const rules = 'What is the result of the expression?';
  const tasks = generator(taskCount);
  brainGame(rules, tasks);
};

export default game;