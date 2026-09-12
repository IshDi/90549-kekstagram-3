import { renderPictureList, initFilters } from './picture.js';
import { initBigPicture } from './big-picture.js';
import { initUploadImage, closeUploadForm } from './upload-image.js';
import { setUserFormSubmit } from './validate.js';
import { getData } from './api.js';
import { showErrorMessage } from './util.js';

const picturesContainerElement = document.querySelector('.pictures');
const messageDataErrorElement = document.querySelector('#data-error').content.querySelector('.data-error');

getData()
  .then((data) => {
    renderPictureList(data);
    initBigPicture(picturesContainerElement, data);
    initFilters(data);
  }).catch(() => {
    showErrorMessage(messageDataErrorElement);
  });

initUploadImage();
setUserFormSubmit(closeUploadForm);
