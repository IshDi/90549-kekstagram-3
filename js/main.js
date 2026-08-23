import { renderPictures } from './picture.js';
import { createSimilarDescriptionPhotos } from './data.js';
import { createPictureClickHandle } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const similarPictures = createSimilarDescriptionPhotos();

renderPictures(picturesContainer, similarPictures);

const onPicturesClick = createPictureClickHandle(similarPictures);

picturesContainer.addEventListener('click', onPicturesClick);
