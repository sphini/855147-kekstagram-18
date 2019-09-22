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
      message: randomInteger(1, COMMENTS.length),
      name: randomInteger(1, NAMES.length)
    };
  }

  return createdComments;
};

var usersDescription = createDescription();

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

for (var i = 1; i < usersDescription.length; i++) {
  fragment.appendChild(createPicture(usersDescription[i]));
}

sectionPictures.appendChild(fragment);
