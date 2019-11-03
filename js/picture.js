'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  window.picture = {

    createPicture: function (description) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = description.url;
      pictureElement.querySelector('.picture__comments').textContent = description.comments.length;
      pictureElement.querySelector('.picture__likes').textContent = description.likes;

      return pictureElement;
    }
  };


})();
