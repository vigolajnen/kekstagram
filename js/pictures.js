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


// Показ/скрытие формы кадрирования
var formUpload = document.querySelector('.upload-overlay');
var formOpen = document.querySelector('#upload-file');
var formClose = document.querySelector('.upload-form-cancel');
var onFormEsc = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closeForm();
  }
};

var openForm = function () {
  formUpload.classList.remove('hidden');
  document.addEventListener('keydown', onFormEsc);
};

var closeForm = function () {
  formUpload.classList.add('hidden');
  document.addEventListener('keydown', onFormEsc);
};

formOpen.addEventListener('change', function () {
  openForm();
  formClose.focus();
});

formClose.addEventListener('click', function () {
  closeForm();
});

formClose.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closeForm();
  }
});

// изменение масштаба изображения
var getScale = function () {
  var scale = document.querySelector('.upload-resize-controls-value');
  var controlsButtonInc = document.querySelector('.upload-resize-controls-button-inc');
  var controlsButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var effect = document.querySelector('.effect-image-preview');
  var units = scale.value.replace(/\d/g, '');

  controlsButtonInc.addEventListener('click', function () {

    if (parseInt(scale.value, 10) <= 75) {
      scale.value = parseInt(scale.value, 10) + 25 + units;
      effect.style.transform = 'scale(' + parseInt(scale.value, 10) / 100 + ')';
    }
  });

  controlsButtonDec.addEventListener('click', function () {
    if (parseInt(scale.value, 10) > 25) {
      scale.value = parseInt(scale.value, 10) - 25 + units;
      effect.style.transform = 'scale(' + parseInt(scale.value, 10) / 100 + ')';
    }
  });
};

getScale();

// добавление эффекта по клику
var getEffect = function () {
  var effectBlock = document.querySelector('.upload-effect-controls');

  effectBlock.addEventListener('click', function (event) {
    var effectImagePreview = document.querySelector('.effect-image-preview');
    var target = event.target;
    var label = target.parentNode.getAttribute('for');
    effectImagePreview.setAttribute('class', label.replace('upload-', '').concat(' effect-image-preview'));
  });
};

getEffect();

// Хэш-теги
var hashtags = document.querySelector('.upload-form-hashtags');
hashtags.addEventListener('change', function () {
  var hashtagsMess = hashtags.value.toLowerCase();
  var arrayOfStrings = hashtagsMess.split(' ');
  for (var i = 0; i < arrayOfStrings.length; i++) {
    if ((arrayOfStrings.length <= 5) &&
      (arrayOfStrings[i].charAt(0) === '#') &&
      (arrayOfStrings[i].length <= 20) &&
      (arrayOfStrings[i] !== arrayOfStrings[i - 1])) {
      return arrayOfStrings[i];
    }
    hashtags.setAttribute('style', 'border-color: red;');
  }
  return arrayOfStrings[i];
});
