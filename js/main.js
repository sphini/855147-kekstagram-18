'use strict';

var randomizeElement = function (randomizedElement) {
  return randomizedElement[Math.floor(Math.random() * randomizedElement.length)];
};


var COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = ['Артем', 'Василий', 'Катя', 'Шелдон', 'Кекс', 'Петр', 'Степан', 'Мария'];

var createDescription = function () {
  var photoDescription = [];
  for (var i = 1; i < 26; i++) {

    photoDescription[i] = {
      url: 'photos/' + i + '.jpg',
      likes: Math.floor((Math.random() * 186) + 15),
      description: 'описание фотографии',
      comments: createComment()
    };

  }
  return photoDescription;
};

var createComment = function () {
  var createdComments = [];
  var numberComments = Math.floor(Math.random() * 6);
  for (var i = 0; i < numberComments; i++) {
    createdComments[i] = {
      avatar: 'img/avatar-' + Math.floor((Math.random() * 6) + 1) + '.svg',
      message: randomizeElement(COMMENT),
      name: randomizeElement(NAMES)
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
