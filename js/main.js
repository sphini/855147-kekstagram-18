'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = ['Артем', 'Василий', 'Катя', 'Шелдон', 'Кекс', 'Петр', 'Степан', 'Мария'];


function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
}

var createDescription = function () {
  var photoDescription = [];
  var photoCount = 25;

  for (var i = 0; i < photoCount + 1; i++) {

    photoDescription[i] = {
      url: 'photos/' + i + '.jpg',
      likes: randomInteger(15, 200),
      description: 'описание фотографии',
      comments: createComment()
    };
  }

  return photoDescription;
};

var createComment = function () {
  var createdComments = [];
  var numberComments = randomInteger(1, 6);
  for (var i = 0; i < numberComments; i++) {
    createdComments[i] = {
      avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
      message: COMMENTS[randomInteger(0, COMMENTS.length - 1)],
      name: NAMES[randomInteger(0, NAMES.length)]
    };
  }

  return createdComments;
};

var pictureDescription = createDescription();

var sectionPictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var createPicture = function (description) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = description.url;
  pictureElement.querySelector('.picture__comments').textContent = description.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = description.likes;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 1; i < pictureDescription.length; i++) {
  fragment.appendChild(createPicture(pictureDescription[i]));
}

sectionPictures.appendChild(fragment);

document.querySelector('.big-picture').classList.remove('hidden');
var numberPicture = 1;

var createBigPicture = function (photoInfo) {
  var bigPictureElement = document.querySelector('.big-picture__img').children[0];
  bigPictureElement.setAttribute('src', photoInfo.url);
  var bigPictureLikesElement = document.querySelector('.likes-count');
  bigPictureLikesElement.textContent = photoInfo.likes;
  var bigPictureCommentsElement = document.querySelector('.comments-count');
  bigPictureCommentsElement.textContent = photoInfo.comments.length;
  var bigPictureDescription = document.querySelector('.social__caption');
  bigPictureDescription.textContent = photoInfo.description;

};

var createCommentsList = function (commentNumber) {
  var newElement = document.createElement('li');
  newElement.className = 'social__comment';
  newElement.innerHTML = '<img>' + '<p>';
  var commentAvatarUrl = pictureDescription[numberPicture].comments[commentNumber].avatar;
  var commentName = pictureDescription[numberPicture].comments[commentNumber].name;
  var commentMessage = pictureDescription[numberPicture].comments[commentNumber].message;
  newElement.children[0].className = 'social__picture';
  newElement.children[0].setAttribute('src', commentAvatarUrl);
  newElement.children[0].setAttribute('alt', commentName);
  newElement.children[0].setAttribute('width', '35');
  newElement.children[0].setAttribute('height', '35');
  newElement.children[1].className = 'social__text';
  newElement.children[1].textContent = commentMessage;

  return newElement;
};

var openBigPicture = function (picture) {
  createBigPicture(pictureDescription[picture]);

  for (var f = 0; f < pictureDescription[picture].comments.length; f++) {
    fragment.appendChild(createCommentsList(f));
  }

  document.querySelector('.social__comments').innerHTML = '';
  document.querySelector('.social__comments').appendChild(fragment);
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
};

openBigPicture(numberPicture);
