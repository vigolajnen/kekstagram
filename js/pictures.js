'use strict';

var COMMENTS_PHRASES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COUNT_PHOTOS = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var gallery = document.querySelector('.gallery-overlay');
var galleryClose = gallery.querySelector('.gallery-overlay-close');

function randomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

// генерация случайных комментариев
var createRandomComments = function (comment) {
  var commentsArray = [];
  var countComment = randomInt(1, 2);
  if (countComment === 1) {
   commentsArray.push(comment[randomInt(comment.length - 1)]);
  } else {
    for (var k = 1; k <= 2; k++) {
     commentsArray.push(comment[randomInt(comment.length - 1)]);
    }
  }
  return commentsArray;
};

// генерация фотографий
var createUserPhotos = function (count) {
  var usersPhotos = [];
    for (var j = 0; j < count; j++) {
      usersPhotos[j] = {
      url: '../kekstagram/photos/' + (j + 1) + '.jpg',
      likes: randomInt(15, 200),
      comments: createRandomComments(COMMENTS_PHRASES)
    };
  }
  return usersPhotos;
};

// создания DOM - элемента
var renderUserPhoto = function (usersPhoto) {
  var template = document.querySelector('#picture-template');
  var pictureTemplate = template.content.querySelector('.picture');
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('img').setAttribute('src', usersPhoto.url);
  photoElement.querySelector('.picture-comments').textContent = usersPhoto['comments'].length;
  photoElement.querySelector('.picture-likes').textContent = usersPhoto.likes;

  photoElement.addEventListener('click', function (event) {
    event.preventDefault();
    renderUserPhotoBig(usersPhoto);
    openGallery();
    galleryClose.focus();
  });
  return photoElement;
};

// заполнение блока на основе созданных DOM - элементов
var fillUserPhoto = function (photos) {
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderUserPhoto(photos[i]));
  }
  pictures.appendChild(fragment);
};
//
var renderUserPhotoBig = function (photos) {
  gallery.querySelector('img').setAttribute('src', photos.url);
  gallery.querySelector('.comments-count').textContent = photos['comments'].length;
  gallery.querySelector('.likes-count').textContent = photos.likes;
};

//
var galleryRender = function () {
  fillUserPhoto(createUserPhotos(COUNT_PHOTOS));
};
galleryRender();

var onPopupEsc = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closeGallery();
  }
};

var openGallery = function () {
  gallery.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEsc);
};

var closeGallery = function () {
  gallery.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEsc);
};

galleryClose.addEventListener('click', function () {
  closeGallery();
});

galleryClose.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closeGallery();
  }
});
