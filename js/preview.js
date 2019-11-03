'use strict';

(function () {

  var fragment = document.createDocumentFragment();
  var photoContainer = document.querySelector('.pictures');
  var socialFooterText = document.querySelector('.social__footer-text');


  // присваиваю html элементам большого изображения текущие значения из модуля создания данных

  var createBigPicture = function (currentPhotoInfo) {
    var bigPictureElement = document.querySelector('.big-picture__img img');
    bigPictureElement.setAttribute('src', currentPhotoInfo.url);
    var bigPictureLikesElement = document.querySelector('.likes-count');
    bigPictureLikesElement.textContent = currentPhotoInfo.likes;
    var bigPictureCommentsElement = document.querySelector('.comments-count');
    bigPictureCommentsElement.textContent = currentPhotoInfo.comments.length;
    var bigPictureDescription = document.querySelector('.social__caption');
    bigPictureDescription.textContent = currentPhotoInfo.description;
  };

  var bigPictureTemplate = document.querySelector('#big-picture').content.querySelector('.social__comment');

  // присваиваю html элементам комментария текущие значения из модуля создания данных

  var createCommentsList = function (commentIndex, pictureIndex) {
    var newElement = bigPictureTemplate.cloneNode(true);
    var commentAvatarUrl = window.data.pictureDescription[pictureIndex].comments[commentIndex].avatar;
    var commentName = window.data.pictureDescription[pictureIndex].comments[commentIndex].name;
    var commentMessage = window.data.pictureDescription[pictureIndex].comments[commentIndex].message;
    newElement.children[0].setAttribute('src', commentAvatarUrl);
    newElement.children[0].setAttribute('alt', commentName);
    newElement.children[1].textContent = commentMessage;

    return newElement;
  };

  // создаю большое изображение и создаю лист комментариев по текущему номеру превью

  window.preview = {

    openBigPicture: function (pictureIndex) {
      createBigPicture(window.data.pictureDescription[pictureIndex]);

      for (var f = 0; f < window.data.pictureDescription[pictureIndex].comments.length; f++) {
        fragment.appendChild(createCommentsList(f, pictureIndex));
      }


      document.querySelector('.social__comments').innerHTML = '';
      document.querySelector('.social__comments').appendChild(fragment);
      document.querySelector('.social__comment-count').classList.add('visually-hidden');
      document.querySelector('.comments-loader').classList.add('visually-hidden');
    },

    openPopupBigImage: function () {
      document.querySelector('.big-picture').classList.remove('hidden');
      photoContainer.addEventListener('keydown', pictureEscHandler);
    },

    bigPictureClose: function () {
      document.querySelector('.big-picture').classList.add('hidden');
    }

  };

  // обработчики событий когда курсор в input

  socialFooterText.addEventListener('focusin', function () {
    photoContainer.removeEventListener('keydown', pictureEscHandler);
  });

  socialFooterText.addEventListener('focusout', function () {
    photoContainer.addEventListener('keydown', pictureEscHandler);
  });


  // функции открытия и закрытия превью


  function pictureEscHandler(event) {
    if (event.keyCode === window.data.keycodes.ESC_KEYCODE) {
      window.preview.bigPictureClose();
    }
  }

})();
