'use strict';

(function () {

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var NAMES = ['Артем', 'Василий', 'Катя', 'Шелдон', 'Кекс', 'Петр', 'Степан', 'Мария'];
  var KeycodesCollection = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
  };

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
        name: NAMES[randomInteger(0, NAMES.length - 1)]
      };
    }

    return createdComments;
  };

  var createdPictureDescription = createDescription();


  window.data = {
    pictureDescription: createdPictureDescription,
    keycodes: KeycodesCollection

  };

})();
