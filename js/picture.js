const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();

const renderPictures = (picturesContainer, similarPictures) => {
  similarPictures.forEach(({url, description, likes, comments}) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    const pictureElementImg = pictureElement.querySelector('.picture__img');
    pictureElementImg.src = url;
    pictureElementImg.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.append(pictureElement);
  });

  picturesContainer.append(similarListFragment);
};

export { renderPictures };
