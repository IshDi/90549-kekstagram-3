import { renderPictures } from './picture.js';
import { initBigPicture } from './big-picture.js';
import { initUploadImage, closeUploadForm } from './upload-image.js';
import { setUserFormSubmit } from './validate.js';
import { getData } from './api.js';
import { showErrorMessage } from './util.js';

const picturesContainer = document.querySelector('.pictures');
const messageDataError = document.querySelector('#data-error').content.querySelector('.data-error');

getData()
  .then((data) => {
    renderPictures(picturesContainer, data);
    initBigPicture(picturesContainer, data);
  }).catch(() => {
    showErrorMessage(messageDataError);
  });

initUploadImage();
setUserFormSubmit(closeUploadForm);
