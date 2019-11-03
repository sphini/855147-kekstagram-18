'use strict';

(function () {

  var fragment = document.createDocumentFragment();
  var sectionPictures = document.querySelector('.pictures');
  var photoContainer = document.querySelector('.pictures');


  // добавляю созданный элемент превью в fragment и в тег .pictures

  for (var i = 1; i < window.data.pictureDescription.length; i++) {
    fragment.appendChild(window.picture.createPicture(window.data.pictureDescription[i]));
  }

  sectionPictures.appendChild(fragment);


  // считываю номер превью на которой был клик

  var getCurrentNumberElementClick = function (target) {

    var picturesAll = document.querySelectorAll('.picture img');
    var currentNumberPhoto = (Array.prototype.indexOf.call(picturesAll, target)) + 1;

    return currentNumberPhoto;
  };


  // передаю номер кликнутого превью и открываю большое изображение

  var setElementClickToPicture = function () {
    var clickTarget = event.target;
    if (clickTarget.classList.contains('picture__img')) {
      event.preventDefault();
      var currentNumberPhoto = getCurrentNumberElementClick(clickTarget);
      window.preview.openBigPicture(currentNumberPhoto);
      window.preview.openPopupBigImage();
    }
    document.querySelector('.big-picture__cancel').addEventListener('click', window.preview.bigPictureClose);
  };


  // навешиваю обработчики клика и нажатия на ентер

  photoContainer.addEventListener('click', setElementClickToPicture);
  photoContainer.addEventListener('keydown', pictureEnterHandler);

  function pictureEnterHandler(event) {
    if (event.keyCode === window.data.keycodes.ENTER_KEYCODE) {
      setElementClickToPicture();
    }
  }
})();
