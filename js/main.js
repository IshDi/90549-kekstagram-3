import { renderPictures } from './picture.js';
import { createSimilarDescriptionPhotos } from './data.js';

const similarPictureList = document.querySelector('.pictures');
const similarPictures = createSimilarDescriptionPhotos();

renderPictures(similarPictureList, similarPictures);
