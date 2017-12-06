'use strict';

var COMMENTS_PHRASES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var commentsPhotosRandIndex = Math.floor(Math.random() * (COMMENTS_PHRASES.length));

function randomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}
var gallery = document.querySelector('.gallery-overlay');
gallery.classList.remove('hidden');

var renderUserPhoto = function (usersPhotos) {
  var photoElement = gallery.cloneNode(true);
  photoElement.querySelector('.gallery-overlay-preview > img').setAttribute('src', usersPhotos.url);
  photoElement.querySelector('.comments-count').textContent = usersPhotos.comment;
  photoElement.querySelector('.likes-count').textContent = usersPhotos.like;
  return photoElement;
};

var fragment = document.createDocumentFragment();
var usersPhotos = [];
usersPhotos.length = 25;
for (var j = 1; j < usersPhotos.length; j++) {
  usersPhotos[j] = {
    url: '../kekstagram/photos/' + j + '.jpg',
    comment: COMMENTS_PHRASES[commentsPhotosRandIndex],
    like: randomInt(15, 200)
  };
  fragment.appendChild(renderUserPhoto(usersPhotos[j]));
}
gallery.appendChild(fragment);
