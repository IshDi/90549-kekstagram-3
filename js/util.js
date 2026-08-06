const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let currentValue = 0;
  return () => ++currentValue;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, createIdGenerator, getRandomArrayElement};
