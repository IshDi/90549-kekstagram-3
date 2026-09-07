import { isEscapeKey } from './util.js';
import { initPhotoScale, resetPhotoScale } from './scale-image.js';
import { resetValidateForms } from './validate.js';
import { initSlider, destroySlider } from './filter-image.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = imageUploadForm.querySelector('.img-upload__cancel');
const hashTagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onCancelButtonClick = () => {
  closeUploadForm();
};

const onFocusKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.target.blur();
  }
};

imageUploadCancel.addEventListener('click', onCancelButtonClick);

const openUploadForm = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initPhotoScale();
  initSlider();

  document.addEventListener('keydown', onDocumentKeydown);
  hashTagField.addEventListener('keydown', onFocusKeydown);
  commentField.addEventListener('keydown', onFocusKeydown);
};

function closeUploadForm () {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetPhotoScale();
  destroySlider();

  document.removeEventListener('keydown', onDocumentKeydown);
  hashTagField.removeEventListener('keydown', onFocusKeydown);
  commentField.removeEventListener('keydown', onFocusKeydown);
  imageUploadInput.value = '';
  imageUploadForm.reset();
  resetValidateForms();
}

const initUploadImage = () => {
  imageUploadInput.addEventListener('change', (evt) => {
    evt.stopPropagation();
    const file = evt.target.files[0];
    if (file) {
      openUploadForm();
    }
  });
};

export { initUploadImage };
