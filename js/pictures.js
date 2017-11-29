'use strict';

var COMMENTS_PHRASES = ['Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var commentsPhotosRandIndex = Math.floor(Math.random() * (COMMENTS_PHRASES.length));

function randomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};
var randomNumber = Math.random();

var gallery = document.querySelector('.gallery-overlay');
gallery.classList.remove('hidden');
var galleryPreviewElement = document.querySelector('.gallery-overlay-preview').content;
var template = document.querySelector('#picture-template').content;
var usersPhotos = [
  {
    url: '../kekstagram/photos/'+i+'.jpg',
    comment: COMMENTS_PHRASES[commentsPhotosRandIndex],
    like: randomInt(15, 200)
  },
    {
    url: '../kekstagram/photos/'+i+'.jpg',
    comment: COMMENTS_PHRASES[commentsPhotosRandIndex],
    like: randomInt(15, 200)
  },
  {
    url: '../kekstagram/photos/'+i+'.jpg',
    comment: COMMENTS_PHRASES[commentsPhotosRandIndex],
    like: randomInt(15, 200)
  },
  {
    url: '../kekstagram/photos/'+i+'.jpg',
    comment: COMMENTS_PHRASES[commentsPhotosRandIndex],
    like: randomInt(15, 200)
  },
  {
    url: '../kekstagram/photos/'+i+'.jpg',
    comment: COMMENTS_PHRASES[commentsPhotosRandIndex],
    like: randomInt(15, 200)
  },
  {
    url: '../kekstagram/photos/'+i+'.jpg',
    comment: COMMENTS_PHRASES[commentsPhotosRandIndex],
    like: randomInt(15, 200)
  }
];

var renderUserPhoto = function (usersPhotos) {
  var photoElement = template.cloneNode(true);
  photoElement.querySelector('.picture > img').setAttribute('src','../kekstagram/photos/'+i+'.jpg');
  photoElement.querySelector('.picture-comments').textContent = usersPhotos.comment;
  photoElement.querySelector('.picture-likes').textContent = usersPhotos.like;
  return photoElement;
};
var linksPictureTemplate = document.querySelector('.picture');
var fragment = document.createDocumentFragment();
for (var i = 1; i < usersPhotos.length; i++) {
  fragment.appendChild(renderUserPhoto(usersPhotos[i]));
}
template.appendChild(fragment);
console.log(template);

var renderUserPhoto = function (usersPhotos) {
  var photoElement = gallery.cloneNode(true);
  photoElement.querySelector('.gallery-overlay-preview > img').setAttribute('src','../kekstagram/photos/'+i+'.jpg');
  photoElement.querySelector('.comments-count').textContent = usersPhotos.comment;
  photoElement.querySelector('.likes-count').textContent = usersPhotos.like;
  return photoElement;
};

var galleryOverlayPreview = document.querySelector('.gallery-overlay-preview');
var fragment = document.createDocumentFragment();
for (var i = 1; i < usersPhotos.length; i++) {
  fragment.appendChild(renderUserPhoto(usersPhotos[i]));
}
gallery.appendChild(fragment);
