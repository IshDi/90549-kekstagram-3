import { sendData } from './api.js';
import { showMessage } from './util.js';
import { blockSubmitButton, unblockSubmitButton } from './upload-image';

const ERROR_MESSAGES = {
  invalidHashtag: 'введён невалидный хэштег (от 1 до 20 символов, включая решётку)',
  hashtagLimitExceeded: 'превышено количество хэштегов',
  duplicateHashtags: 'хэштеги повторяются',
  commentTooLong: 'длина комментария больше 140 символов',
  hashtagsMissingSpaces: 'хэштеги должны быть разделены пробелами и начинаться с #',
};

const PATTERN_HASH = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_COUNT = 5;
const LENGTH_COMMENT = 140;

const imageUploadFormElement = document.querySelector('.img-upload__form');
const hashTagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const messageSuccess = document.querySelector('#success').content.querySelector('.success');
const messageError = document.querySelector('#error').content.querySelector('.error');

const pristine = new Pristine(imageUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const isEmpty = (value) => !value || value.trim() === '';

const getHashtags = (value) => {
  if (!value || value.trim() === '') {
    return [];
  }
  return value.trim().split(/\s+/);
};

const validateHashtagFormat = (value) => {
  if (isEmpty(value)) {
    return true;
  }

  const hashTags = getHashtags(value);
  return hashTags.every((tag) => PATTERN_HASH.test(tag));
};

const validateHashtagCount = (value) => {
  if (isEmpty(value)) {
    return true;
  }

  const hashtags = getHashtags(value);
  return hashtags.length <= HASHTAG_COUNT;
};

const validateHashtagUnique = (value) => {
  if (isEmpty(value)) {
    return true;
  }

  const hashtags = getHashtags(value);
  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateCommentLength = (value) => {
  const stringLength = value.length;
  return stringLength <= LENGTH_COMMENT;
};

pristine.addValidator(hashTagField, validateHashtagFormat, ERROR_MESSAGES.invalidHashtag);
pristine.addValidator(hashTagField, validateHashtagCount, ERROR_MESSAGES.hashtagLimitExceeded);
pristine.addValidator(hashTagField, validateHashtagUnique, ERROR_MESSAGES.duplicateHashtags);
pristine.addValidator(commentField, validateCommentLength, ERROR_MESSAGES.commentTooLong);

const setUserFormSubmit = (onSuccess) => {
  imageUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          showMessage(messageSuccess);
        })
        .catch(() => {
          showMessage(messageError);
        })
        .finally(unblockSubmitButton);
    }
  });
};

const resetValidateForms = () => {
  pristine.reset();
};

export { setUserFormSubmit, resetValidateForms };
