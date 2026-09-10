import { shuffleArray, debounce } from './util.js';

const RANDOM_PHOTO_COUNT = 10;

const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterContainer = document.querySelector('.img-filters');
const picturesContainer = document.querySelector('.pictures');

const renderSimilarList = (similarPictures, filterId) => {
  const similarListFragment = document.createDocumentFragment();

  let pictures = [...similarPictures];

  if (filterId === 'filter-random') {
    pictures = shuffleArray(pictures).slice(0, RANDOM_PHOTO_COUNT);
  } else if (filterId === 'filter-discussed') {
    pictures.sort((a, b) => b.comments.length - a.comments.length);
  }

  pictures.forEach(({id, url, description, likes, comments}) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    const pictureElementImg = pictureElement.querySelector('.picture__img');
    pictureElement.dataset.id = id;
    pictureElementImg.src = url;
    pictureElementImg.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.append(pictureElement);
  });

  const oldPictures = picturesContainer.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());

  picturesContainer.append(similarListFragment);
};

const renderSimilarListDebounced = debounce(renderSimilarList);

const initFilters = (similarPictures) => {
  filterContainer.classList.remove('img-filters--inactive');

  filterContainer.addEventListener('click', (evt) => {
    const target = evt.target.closest('.img-filters__button');
    if (!target || target.classList.contains('img-filters__button--active')) {
      return;
    }

    document.querySelectorAll('.img-filters__button').forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });
    target.classList.add('img-filters__button--active');

    renderSimilarListDebounced(similarPictures, target.id);
  });
};

export { renderSimilarList, initFilters };
