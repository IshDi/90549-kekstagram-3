const ERROR_MESSAGES = {
  invalidHashtag: 'введён невалидный хэштег (от 1 до 20 символов, включая решётку)',
  hashtagLimitExceeded: 'превышено количество хэштегов',
  duplicateHashtags: 'хэштеги повторяются',
  commentTooLong: 'длина комментария больше 140 символов',
  hashtagsMissingSpaces: 'хэштеги должны быть разделены пробелами и начинаться с #',
};

const PATTERN_HASH = /^#[a-zа-яё0-9]{1,19}$/i;

const imageUploadFormElement = document.querySelector('.img-upload__form');
const hashTagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(imageUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getHashtags = (value) => {
  if (!value || value.trim() === '') {
    return [];
  }
  return value.trim().split(/\s+/);
};

const validateHashtagFormat = (value) => {
  if (!value || value.trim() === '') {
    return true;
  }

  const hashTags = getHashtags(value);
  return hashTags.every((tag) => PATTERN_HASH.test(tag));
};

const validateHashtagCount = (value) => {
  if (!value || value.trim() === '') {
    return true;
  }

  const hashtags = getHashtags(value);
  return hashtags.length <= 5;
};

const validateHashtagUnique = (value) => {
  if (!value || value.trim() === '') {
    return true;
  }

  const hashtags = getHashtags(value);
  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtagNotOnlyHash = (value) => {
  if (!value || value.trim() === '') {
    return true;
  }

  const hashtags = getHashtags(value);
  return hashtags.every((tag) => tag !== '#');
};

const validateHashtagSeparated = (value) => {
  if (!value || value.trim() === '') {
    return true;
  }
  const hashtags = getHashtags(value);

  return hashtags.every((tag) => {
    const hashCount = (tag.match(/#/g) || []).length;
    return hashCount === 1 && tag.startsWith('#');
  });
};

const validateCommentLength = (value) => {
  const stringLength = value.length;
  return stringLength <= 140;
};

pristine.addValidator(hashTagField, validateHashtagSeparated, ERROR_MESSAGES.hashtagsMissingSpaces, 1);
pristine.addValidator(hashTagField, validateHashtagFormat, ERROR_MESSAGES.invalidHashtag, 2);
pristine.addValidator(hashTagField, validateHashtagCount, ERROR_MESSAGES.hashtagLimitExceeded);
pristine.addValidator(hashTagField, validateHashtagUnique, ERROR_MESSAGES.duplicateHashtags);
pristine.addValidator(hashTagField, validateHashtagNotOnlyHash, ERROR_MESSAGES.invalidHashtag);
pristine.addValidator(commentField, validateCommentLength, ERROR_MESSAGES.commentTooLong);


const validateForms = () => {
  imageUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      imageUploadFormElement.submit();
    }
  });
};

export { validateForms };
