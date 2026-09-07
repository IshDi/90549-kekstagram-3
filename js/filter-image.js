const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');

const EFFECTS_OPTIONS = {
  none: {
    filter: null,
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    unit: ''
  }
};

let currentEffect = 'none';
let slider = null;

const updateFilter = (effect, value) => {
  const config = EFFECTS_OPTIONS[effect];

  sliderValue.value = value;

  if (effect === 'none' || !config.filter) {
    imageUploadPreview.style.filter = '';
    sliderContainer.classList.add('hidden');
    return;
  }

  imageUploadPreview.style.filter = `${config.filter}(${value}${config.unit})`;
  sliderContainer.classList.remove('hidden');
};

const setEffect = (effect) => {
  if (effect === currentEffect) {
    return;
  }
  currentEffect = effect;
  const config = EFFECTS_OPTIONS[effect];

  if (slider) {
    slider.updateOptions({
      range: {
        min: config.min,
        max: config.max,
      },
      start: config.start,
      step: config.step
    });
    const startValue = effect === 'none' ? '' : config.start;
    slider.set(startValue);
    updateFilter(effect, startValue);
  }
};

const onSliderChange = (values) => {
  const value = Number(values[0]);
  if (currentEffect !== 'none') {
    updateFilter(currentEffect, value);
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

  effectsList.addEventListener('change', (evt) => {
    setEffect(evt.target.value);
  });

  sliderContainer.classList.add('hidden');
  setEffect('none');
};

const destroySlider = () => {
  if (!slider) {
    return;
  }

  slider.off('update', onSliderChange);
  slider.destroy();
  slider = null;

  currentEffect = 'none';
  imageUploadPreview.style.filter = '';
  sliderContainer.classList.add('hidden');
  sliderValue.value = '';
};

export { initSlider, destroySlider };
