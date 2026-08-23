import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const imageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentShowCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsList = bigPictureElement.querySelector('.social__comments');
const captionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');
const commentLoaderButton = bigPictureElement.querySelector('.social__comments-loader');
const commentsListFragment = document.createDocumentFragment();

const createHTMLElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const createComment = (data) => {
  const liTag = createHTMLElement('li', 'social__comment');
  const imgTag = createHTMLElement('img', 'social__picture');
  const textTag = createHTMLElement('p', 'social__text');
  imgTag.src = data.avatar;
  imgTag.alt = data.name;
  textTag.textContent = data.message;

  liTag.append(imgTag);
  liTag.append(textTag);

  commentsListFragment.append(liTag);
};

const fillComments = (comments) => {
  commentsList.innerHTML = '';
  comments.forEach((comment) => {
    createComment(comment);
  });
  commentsList.append(commentsListFragment);
};

const fillBigPucture = ({url, description, likes, comments}) => {
  imageElement.src = url;
  imageElement.alt = description;
  likesCountElement.textContent = likes;
  commentShowCountElement.textContent = comments.length;
  commentTotalCountElement.textContent = comments.length;

  fillComments(comments);
  commentLoaderButton.classList.add('hidden');

  captionElement.textContent = description;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (data) => {
  fillBigPucture(data);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const getPhotoDataFromClick = (evt, data) => {
  const thumbnail = evt.target.closest('.picture__img');
  if (!thumbnail) {
    return;
  }

  const pictureId = parseInt(thumbnail.dataset.id, 10);
  return data.find((item) => item.id === pictureId);
};


const createPictureClickHandle = (data) => (evt) => {
  const photoData = getPhotoDataFromClick(evt, data);
  if (photoData) {
    openBigPicture(photoData);
  }
};

bigPictureCloseButton.addEventListener('click', () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
});


export { openBigPicture, createPictureClickHandle };
