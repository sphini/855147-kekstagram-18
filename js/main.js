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
      name: NAMES[randomInteger(0, NAMES.length - 1)]
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

var clickBigPictureCloseHandler = function () {
  document.querySelector('.big-picture').classList.add('hidden');
}

var openPopupBigImage = function () {
  return document.querySelector('.big-picture').classList.remove('hidden');
}





for (var i = 1; i < pictureDescription.length; i++) {
  fragment.appendChild(createPicture(pictureDescription[i]))
}






sectionPictures.appendChild(fragment);

var createBigPicture = function (photoInfo) {
  var bigPictureElement = document.querySelector('.big-picture__img img');
  bigPictureElement.setAttribute('src', photoInfo.url);
  var bigPictureLikesElement = document.querySelector('.likes-count');
  bigPictureLikesElement.textContent = photoInfo.likes;
  var bigPictureCommentsElement = document.querySelector('.comments-count');
  bigPictureCommentsElement.textContent = photoInfo.comments.length;
  var bigPictureDescription = document.querySelector('.social__caption');
  bigPictureDescription.textContent = photoInfo.description;

};

var bigPictureTemplate = document.querySelector('#big-picture').content.querySelector('.social__comment');

var createCommentsList = function (commentNumber, numberPicture) {
  var newElement = bigPictureTemplate.cloneNode(true);
  console.log(pictureDescription[numberPicture]);
  var commentAvatarUrl = pictureDescription[numberPicture].comments[commentNumber].avatar;
  var commentName = pictureDescription[numberPicture].comments[commentNumber].name;
  var commentMessage = pictureDescription[numberPicture].comments[commentNumber].message;
  newElement.children[0].setAttribute('src', commentAvatarUrl);
  newElement.children[0].setAttribute('alt', commentName);
  newElement.children[1].textContent = commentMessage;

  return newElement;
};

var openBigPicture = function (picture) {
  createBigPicture(pictureDescription[picture]);
  console.log(pictureDescription[picture])

  for (var f = 0; f < pictureDescription[picture].comments.length; f++) {
    fragment.appendChild(createCommentsList(f, picture));
  }


  document.querySelector('.social__comments').innerHTML = '';
  document.querySelector('.social__comments').innerHTML = '';
  document.querySelector('.social__comments').appendChild(fragment);
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
};



var uploadFile = document.querySelector('input[id="upload-file"]');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('.img-upload__cancel');
var ESC_KEYCODE = 27;

// Масштаб

scaleControlSmaller.addEventListener('click', function () {
  scaleControlValue.value = scaleControlValueCurrent;
  if (scaleControlValueCurrent > 0) {
    scaleControlValueCurrent = (scaleControlValueCurrent - 25);
    scaleControlValue.value = scaleControlValueCurrent + '%';
    imgUploadPreview.style.transform = 'scale(' + scaleControlValueCurrent / 100 + ')';
  } else {
    scaleControlValue.value = '0%';
  }
});

scaleControlBigger.addEventListener('click', function () {
  scaleControlValue.value = scaleControlValueCurrent;
  if (scaleControlValueCurrent < 100) {
    scaleControlValueCurrent = (scaleControlValueCurrent + 25);
    scaleControlValue.value = scaleControlValueCurrent + '%';
    imgUploadPreview.style.transform = 'scale(' + scaleControlValueCurrent / 100 + ')';
  } else {
    scaleControlValue.value = '100%';
  }
});

// Визуальные эффекты

var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectOriginal = document.querySelector('input[id="effect-none"]');
var effectChrome = document.querySelector('input[id="effect-chrome"]');
var effectSepia = document.querySelector('input[id="effect-sepia"]');
var effectMarvin = document.querySelector('input[id="effect-marvin"]');
var effectPhobos = document.querySelector('input[id="effect-phobos"]');
var effectHeat = document.querySelector('input[id="effect-heat"]');
var effects = document.querySelectorAll('.effects__radio');


var scaleControlValueCurrent = 100;

var addEffectLevelClickHandler = function (maxLevel, minLevel, currentLevel) {
  return ((currentLevel * maxLevel) / 100) + minLevel;
};

effectLevelPin.addEventListener('mouseup', function () {
  imgUploadPreview.style.filter = '';
  if (effectChrome.checked) {
    imgUploadPreview.style.filter = 'grayscale(' + addEffectLevelClickHandler(1, 0, effectLevelValue.value) + ')';
  }
  if (effectSepia.checked) {
    imgUploadPreview.style.filter = 'sepia(' + addEffectLevelClickHandler(1, 0, effectLevelValue.value) + ')';
  }
  if (effectMarvin.checked) {
    imgUploadPreview.style.filter = 'invert(' + addEffectLevelClickHandler(100, 0, effectLevelValue.value) + '%)';
  }
  if (effectPhobos.checked) {
    imgUploadPreview.style.filter = 'blur(' + addEffectLevelClickHandler(3, 0, effectLevelValue.value) + 'px)';
  }
  if (effectHeat.checked) {
    imgUploadPreview.style.filter = 'brightness(' + addEffectLevelClickHandler(3, 1, effectLevelValue.value) + ')';
  }
});


var checkEffectsNone = function () {
  if (effectOriginal.checked) {
    document.querySelector('.effect-level').classList.add('visually-hidden');
  } else {
    document.querySelector('.effect-level').classList.remove('visually-hidden');
  }
};

var changeEffect = function (effectName) {
  for (var a = 0; a < effects.length; a++) {
    if (effects[a].checked) {
      imgUploadPreview.className = '';
      imgUploadPreview.style.filter = '';
      imgUploadPreview.classList.add('effects__preview--' + effectName);
    }
  }
};

var addEffectClickHandler = function (currentEffect) {
  currentEffect.addEventListener('click', function () {
    changeEffect(currentEffect.value);
    checkEffectsNone();
  });
};

for (var f = 0; f < effects.length; f++) {
  addEffectClickHandler(effects[f]);
  checkEffectsNone();
}

// Валидация хэш тегов

var textHashtag = document.querySelector('.text__hashtags');
var imgUploadSubmit = document.querySelector('.img-upload__submit');
var socialFooterText = document.querySelector('.social__footer-text');
var socialFooterBtn = document.querySelector('.social__footer-btn');


var checkTagsHandler = function () {
  var hashtagsString = textHashtag.value;

  if (hashtagsString === '' || hashtagsString.length === 1) {
    return textHashtag.setCustomValidity('');
  }

  var hashtags = hashtagsString.toLowerCase().split(' ');

  if (hashtags.length > 5) {
    return textHashtag.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }

  var firstHashFlag = false;
  var onlyHashFlag = false;
  var lengthHashFlag = false;

  hashtags.forEach(function (hashtag) {
    if (hashtag[0] !== '#') {
      textHashtag.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
      firstHashFlag = true;
      return firstHashFlag;
    }

    if (hashtag === '#') {
      textHashtag.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      onlyHashFlag = true;
      return onlyHashFlag;
    }

    if (hashtag.length > 20) {
      textHashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      lengthHashFlag = true;
      return lengthHashFlag;
    }

    return textHashtag.setCustomValidity('');
  });

  if (firstHashFlag) {
    return textHashtag.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
  }

  if (onlyHashFlag) {
    return textHashtag.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  }

  if (lengthHashFlag) {
    return textHashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
  }

  var checkSimilarHash = function (tags) {
    for (var d = 0; d < tags.length; d++) {
      var currentTag = tags[d];
      var numberSimilarTags = tags.filter(function (elem) {
        return elem === currentTag;
      });
      if (numberSimilarTags.length > 1) {
        return true;
      }
    }
    return false;
  };

  if (checkSimilarHash(hashtags)) {
    return textHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды!');
  }

  return textHashtag.setCustomValidity('');
};

imgUploadSubmit.addEventListener('click', checkTagsHandler);
textHashtag.addEventListener('input', checkTagsHandler);


// Поведение окон

var openImgUploadOverlay = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', enterCloseHandler);
};

var closeImgUploadOverlay = function () {
  imgUploadOverlay.classList.add('hidden');
};

var enterCloseHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeImgUploadOverlay();
  }
};

uploadFile.addEventListener('change', openImgUploadOverlay);
imgUploadCancel.addEventListener('click', closeImgUploadOverlay);
textHashtag.addEventListener('focusin', function () {
  document.removeEventListener('keydown', enterCloseHandler);
});

textHashtag.addEventListener('focusout', function () {
  document.addEventListener('keydown', enterCloseHandler);
});
