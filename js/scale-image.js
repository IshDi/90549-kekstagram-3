const SCALE_CONTROL_STEP = 25;
const SCALE_CONTROL_MIN = 25;
const SCALE_CONTROL_MAX = 100;
const SCALE_CONTROL_DEFAULT = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

let currentValue = 100;

const updateScale = (value) => {
  if (value < SCALE_CONTROL_MIN) {
    value = SCALE_CONTROL_MIN;
  }

  if (value > SCALE_CONTROL_MAX) {
    value = SCALE_CONTROL_MAX;
  }

  currentValue = value;

  scaleControlValue.value = `${currentValue}%`;

  const scaleTransform = currentValue / 100;
  imageUploadPreview.style.transform = `scale(${scaleTransform})`;
};

const onScaleControlSmallerClick = () => {
  updateScale(currentValue - SCALE_CONTROL_STEP);
};

const onScaleControlBiggerClick = () => {
  updateScale(currentValue + SCALE_CONTROL_STEP);
};

const initPhotoScale = () => {
  updateScale(SCALE_CONTROL_DEFAULT);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
};

const resetPhotoScale = () => {
  updateScale(SCALE_CONTROL_DEFAULT);
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
};

export { initPhotoScale, resetPhotoScale };
