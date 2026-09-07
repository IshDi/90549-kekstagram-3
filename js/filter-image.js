const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const sliderRadios = document.querySelectorAll('.effects__radio');

const EFFECTS_OPTIONS = {
  none: {
    filter: null,
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    format: (value) => `${Math.round(value * 100)}%`
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    format: (value) => `${Math.round(value * 100)}%`
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    format: (value) => `${Math.round(value * 100)}%`
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 1,
    step: 0.01,
    start: 1,
    format: (value) => `${Math.round(value * 100)}%`
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 1,
    step: 0.0333,
    start: 1,
    format: (value) => `${Number((value * 3).toFixed(1))}px`
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 1,
    step: 0.05,
    start: 1,
    format: (value) => `${Number((1 + value * 2).toFixed(1))}`
  }
};

let currentEffect = 'none';
let slider = null;

const updateFiter = (effect, value) => {
  const config = EFFECTS_OPTIONS[effect];

  sliderValue.value = config.format(value);

  if (effect === 'none' || !config.filter) {
    imageUploadPreview.style.filter = '';
    sliderContainer.classList.add('hidden');
    return;
  }

  imageUploadPreview.style.filter = `${config.filter}(${config.format(value)})`;
  sliderValue.textContent = config.format(value);
  sliderContainer.classList.remove('hidden');
};

const setEffect = (effect) => {
  if (effect === currentEffect) {
    return;
  }
  currentEffect = effect;
  const config = EFFECTS_OPTIONS[effect];
  const startValue = effect === 'none' ? 0 : config.start;
  if (slider) {
    slider.set(startValue);
  }
  updateFiter(effect, startValue);
};

const onRadioChecked = (evt) => {
  if (evt.target.checked) {
    setEffect(evt.target.value);
  }
};

const onSliderChange = (values) => {
  const value = Number(values[0]);
  if (currentEffect !== 'none') {
    updateFiter(currentEffect, value);
  }
};

const initSlider = () => {
  if (slider) {
    return;
  }

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    connect: 'lower'
  });

  slider = sliderElement.noUiSlider;
  slider.on('update', onSliderChange);

  sliderRadios.forEach((radio) => {
    radio.addEventListener('change', onRadioChecked);
  });

  sliderContainer.classList.add('hidden');
  setEffect('none');
};

const destroySlider = () => {
  if (!slider) {
    return;
  }

  sliderRadios.forEach((radio) => {
    radio.removeEventListener('change', onRadioChecked);
  });

  slider.off('update', onSliderChange);
  slider.destroy();
  slider = null;

  currentEffect = 'none';
  imageUploadPreview.style.filter = '';
  sliderContainer.classList.add('hidden');
  sliderValue.textContent = '100%';

  sliderRadios.forEach((radio) => {
    radio.checked = radio.value === 'none';
  });
};

export { initSlider, destroySlider };
