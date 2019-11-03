'use strict';

(function () {

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');


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
      imgUploadPreview.style.filter = 'grayscale(' + addEffectLevelClickHandler(1, 0, scaleControlValueCurrent) + ')';
    }
    if (effectSepia.checked) {
      imgUploadPreview.style.filter = 'sepia(' + addEffectLevelClickHandler(1, 0, scaleControlValueCurrent) + ')';
    }
    if (effectMarvin.checked) {
      imgUploadPreview.style.filter = 'invert(' + addEffectLevelClickHandler(100, 0, scaleControlValueCurrent) + '%)';
    }
    if (effectPhobos.checked) {
      imgUploadPreview.style.filter = 'blur(' + addEffectLevelClickHandler(3, 0, scaleControlValueCurrent) + 'px)';
    }
    if (effectHeat.checked) {
      imgUploadPreview.style.filter = 'brightness(' + addEffectLevelClickHandler(3, 1, scaleControlValueCurrent) + ')';
    }

    console.log(imgUploadPreview.style.filter);
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


  textHashtag.addEventListener('focusin', function () {
    document.removeEventListener('keydown', enterCloseHandler);
  });

  textHashtag.addEventListener('focusout', function () {
    document.addEventListener('keydown', enterCloseHandler);
  });


  // Поведение окна редактирования изображения

  var uploadFile = document.querySelector('input[id="upload-file"]');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');


  var openImgUploadOverlay = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', enterCloseHandler);
  };

  var closeImgUploadOverlay = function () {
    imgUploadOverlay.classList.add('hidden');
  };

  var enterCloseHandler = function (evt) {
    if (evt.keyCode === window.data.keycodes.ESC_KEYCODE) {
      closeImgUploadOverlay();
    }
  };

  uploadFile.addEventListener('change', openImgUploadOverlay);
  imgUploadCancel.addEventListener('click', closeImgUploadOverlay);


  // перемещение ползунка

  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var maxWidthLvlLine = 453;
  var minWidthLvlLine = 0;

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var currentCoordinatePin = effectLevelPin.offsetLeft - shift.x;

      if (currentCoordinatePin > minWidthLvlLine && currentCoordinatePin < maxWidthLvlLine) {
        effectLevelPin.style.left = currentCoordinatePin + 'px';
        scaleControlValueCurrent = Math.round((currentCoordinatePin * 100)/maxWidthLvlLine);
        effectLevelDepth.style.width = scaleControlValueCurrent + '%';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
