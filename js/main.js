import { renderPictures } from './picture.js';
import { createSimilarDescriptionPhotos } from './data.js';
import { initBigPicture } from './big-picture.js';
import { initUploadImage } from './upload-image.js';
import { validateForms } from './validate.js';

const picturesContainer = document.querySelector('.pictures');
const similarPictures = createSimilarDescriptionPhotos();

renderPictures(picturesContainer, similarPictures);
initBigPicture(picturesContainer, similarPictures);
initUploadImage();
validateForms();
