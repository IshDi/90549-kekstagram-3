const DESCRIPTION_PHOTOS = [
  'На снимке запечатлен живописный закат над морским горизонтом, окрашивающий небо в яркие оранжево-розовые тона.',
  'На фотографии изображен уютный городской парк весной, цветы и деревья в полном расцвете.',
  'На снимке запечатлена улыбающаяся девушка, держащая чашку кофе в руках, сидящая в кафе на улице.',
  'В центре кадра — старинная кирпичная церковь с высоким шпилем, окруженная зеленью.',
  'Фото показывает группу туристов, которые делают селфи на фоне величественных горных вершин.',
  'На снимке запечатлен домашний кот, уютно свернувшийся калачиком на мягком пледе.',
  'В центре кадра — человек, играющий на гитаре у уличного освещения вечером.',
  'Фото запечатлело яркий рынок с множеством фруктов, овощей и сувениров, разложенных по прилавкам.',
  'На фотографии — спокойное озеро, отражающее голубое небо и пушистые облака.',
  'В кадре — молодая пара, гуляющая по берегу, держа друг друга за руки на закате.',
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USER_NAMES = [
  'Александр',
  'Елена',
  'Михаил',
  'София',
  'Дмитрий',
  'Анастасия',
  'Максим',
  'Виктория',
  'Иван',
  'Мария',
];

const SIMILAR_DESCRIPTION_PHOTO_COUNT = 25;
const SIMILAR_COMMENT_PHOTO_COUNT_MIN = 0;
const SIMILAR_COMMENT_PHOTO_COUNT_MAX = 30;
const SIMILAR_LIKE_COUNT_MIN = 15;
const SIMILAR_LIKE_COUNT_MAX = 200;
const SIMILAR_AVATAR_MIN = 1;
const SIMILAR_AVATAR_MAX = 6;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let currentValue = 0;
  return () => ++currentValue;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getPhotoId = createIdGenerator();
const getUrl = createIdGenerator();
const getCommentId = createIdGenerator();

const createMessage = (array) => {
  const index = getRandomInteger(0, 1);

  if (index === 1) {
    const firstIndex = getRandomInteger(0, array.length - 1);

    let secondIndex;
    do {
      secondIndex = getRandomInteger(0, array.length - 1);
    } while (secondIndex === firstIndex);

    return `${array[firstIndex]} ${array[secondIndex]}`;
  }
  return getRandomArrayElement(array);
};

const createComment = () => {
  const id = getCommentId();

  return {
    id,
    avatar: `img/avatar-${getRandomInteger(SIMILAR_AVATAR_MIN, SIMILAR_AVATAR_MAX)}.svg`,
    message: createMessage(COMMENT_MESSAGES),
    name: getRandomArrayElement(USER_NAMES),
  };
};

const createDescriptionPhoto = () => {
  const id = getPhotoId();
  const url = getUrl();

  const similarCommentPhotos = Array.from({length: getRandomInteger(SIMILAR_COMMENT_PHOTO_COUNT_MIN, SIMILAR_COMMENT_PHOTO_COUNT_MAX)}, createComment);

  return {
    id:  id,
    url: `photos/${url}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_PHOTOS),
    likes: getRandomInteger(SIMILAR_LIKE_COUNT_MIN, SIMILAR_LIKE_COUNT_MAX),
    comments: similarCommentPhotos, // массив
  };
};

const similarDescriptionPhotos = Array.from({length: SIMILAR_DESCRIPTION_PHOTO_COUNT}, createDescriptionPhoto);

similarDescriptionPhotos();
