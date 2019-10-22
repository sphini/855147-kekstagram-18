'use strict';



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

var photoContainer = document.querySelector('.pictures');
var socialFooterText = document.querySelector('.social__footer-text');


photoContainer.addEventListener('click', pictureClickHandler);
photoContainer.addEventListener('keydown', pictureEnterHandler);

socialFooterText.addEventListener('focusin', function () {
  photoContainer.removeEventListener('keydown', pictureEscHandler);
});

socialFooterText.addEventListener('focusout', function () {
  photoContainer.addEventListener('keydown', pictureEscHandler);
});



for (var i = 1; i < pictureDescription.length; i++) {
  fragment.appendChild(createPicture(pictureDescription[i]));
}


var getCurrentNumberElementClick = function (target) {

  var picturesAll = document.querySelectorAll('.picture img');
  var currentNumberPhoto = (Array.prototype.indexOf.call(picturesAll, target)) + 1;

  return currentNumberPhoto;
};

var setElementClickToPicture = function () {
  var clickTarget = event.target;
  if (clickTarget.classList.contains('picture__img')) {
    event.preventDefault();
    var currentNumberPhoto = getCurrentNumberElementClick(clickTarget);
    openBigPicture(currentNumberPhoto);
    openPopupBigImage();
  }
  document.querySelector('.big-picture__cancel').addEventListener('click', bigPictureClose);
};

function pictureClickHandler() {
  setElementClickToPicture();
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

var createCommentsList = function (commentIndex, pictureIndex) {
  var newElement = bigPictureTemplate.cloneNode(true);
  var commentAvatarUrl = pictureDescription[pictureIndex].comments[commentIndex].avatar;
  var commentName = pictureDescription[pictureIndex].comments[commentIndex].name;
  var commentMessage = pictureDescription[pictureIndex].comments[commentIndex].message;
  newElement.children[0].setAttribute('src', commentAvatarUrl);
  newElement.children[0].setAttribute('alt', commentName);
  newElement.children[1].textContent = commentMessage;

  return newElement;
};

var openBigPicture = function (picture) {
  createBigPicture(pictureDescription[picture]);

  for (var f = 0; f < pictureDescription[picture].comments.length; f++) {
    fragment.appendChild(createCommentsList(f, picture));
  }


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




// Поведение окон

var openImgUploadOverlay = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', enterCloseHandler);
};

var closeImgUploadOverlay = function () {
  imgUploadOverlay.classList.add('hidden');
};

var enterCloseHandler = function (evt) {
  if (evt.keyCode === Keycodes.ESC_KEYCODE) {
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
