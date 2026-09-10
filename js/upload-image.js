import { isEscapeKey } from './util.js';
import { initPhotoScale, resetPhotoScale } from './scale-image.js';
import { resetValidateForms } from './validate.js';
import { initSlider, destroySlider } from './filter-image.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = imageUploadForm.querySelector('.img-upload__cancel');
const hashTagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const imageSubmitButton = imageUploadForm.querySelector('.img-upload__submit');
const preview = imageUploadForm.querySelector('.img-upload__preview img');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Идет публикация...'
};

const blockSubmitButton = () => {
  imageSubmitButton.disabled = true;
  imageSubmitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  imageSubmitButton.disabled = false;
  imageSubmitButton.textContent = SubmitButtonText.IDLE;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const openErrorMessage = document.querySelector('.error');
    if (openErrorMessage) {
      return;
    }
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

const openUploadForm = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initPhotoScale();
  initSlider();

  imageUploadCancel.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  hashTagField.addEventListener('keydown', onFocusKeydown);
  commentField.addEventListener('keydown', onFocusKeydown);
};

function closeUploadForm () {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetPhotoScale();
  destroySlider();

  imageUploadCancel.removeEventListener('click', onCancelButtonClick);
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
    const file = imageUploadInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }

    openUploadForm();
  });
};

export { initUploadImage, closeUploadForm, blockSubmitButton, unblockSubmitButton };
