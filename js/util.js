const SHOW_TIME = 5000;
const DEBOUNCE_TIME = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessage = (template) => {
  const element = template.cloneNode(true);
  document.body.append(element);

  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (evt.target === element) {
      closeMessage();
    }
  };

  function closeMessage () {
    if (element.parentNode) {
      element.remove();
    }
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onOutsideClick);

  const button = element.querySelector('button');
  if (button) {
    button.addEventListener('click', (evt) => {
      evt.stopPropagation();
      closeMessage();
    });
  }

  return element;
};

const showErrorMessage = (template) => {
  const cloneTemplate = template.cloneNode(true);
  document.body.append(cloneTemplate);

  setTimeout(() => {
    cloneTemplate.remove();
  }, SHOW_TIME);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_TIME) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export { isEscapeKey, showErrorMessage, showMessage, debounce, throttle, shuffleArray };
