'use strict';

var COMMENTS_PHRASES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var gallery = document.querySelector('.gallery-overlay');
gallery.classList.remove('hidden');
var galleryPreview = gallery.querySelector('.gallery-overlay-preview');

var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture-template');
var pictureTemplate = template.content.querySelector('.picture');

function randomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

var usersPhotos = [];
usersPhotos.length = 25;
for (var j = 0; j < 25; j++) {
  COMMENTS_PHRASES.length = randomInt(1, 2);
  usersPhotos[j] = {
    url: '../kekstagram/photos/' + (j + 1) + '.jpg',
    likes: randomInt(15, 200),
    comments: COMMENTS_PHRASES
  };
}

var renderUserPhoto = function (usersPhoto) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.setAttribute('href', usersPhoto.url);
  photoElement.querySelector('img').setAttribute('src', usersPhoto.url);
  photoElement.querySelector('.picture-comments').textContent = usersPhoto['comments'].length = randomInt(1, 2);
  photoElement.querySelector('.picture-likes').textContent = usersPhoto.likes;

  return photoElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < usersPhotos.length; i++) {
  fragment.appendChild(renderUserPhoto(usersPhotos[i]));
}
pictures.appendChild(fragment);

var renderUserPhotoGallery = function (usersPhotoGallery) {
  var photoElement = galleryPreview.cloneNode(true);

  photoElement.querySelector('img').setAttribute('src', usersPhotoGallery.url);
  photoElement.querySelector('.comments-count').textContent = usersPhotoGallery.comments;
  photoElement.querySelector('.likes-count').textContent = usersPhotoGallery.likes;

  return photoElement;
};

var fragmentGallery = document.createDocumentFragment();
fragmentGallery.appendChild(renderUserPhotoGallery(usersPhotos[0]));
gallery.replaceChild(fragmentGallery, gallery.childNodes[3]);
