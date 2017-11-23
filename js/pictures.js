'use strict';

//функция генерации случайных данных
//функция создания DOM-элемента на основе JS-объекта,
//функция заполнения блока DOM-элементами на основе массива JS-объектов

//функция генерации случайных данных
function randomDataSet(url, like, comment) {
  this.url = url;
  this.like = like;
  this.comment = comment;
}

function randomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};
var photoAddresses = [];
for(var i = 1; i <= 25; i++) {
  var photoAddressesItem = '../kekstagram/photos/'+i+'.jpg';
  photoAddresses.push(photoAddressesItem);
}
var numberLikes = [];
for (i = 15;i <= 200;i++) {
    numberLikes[i] = i;
};
var commentsPhotos = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photoDataSet = [];
for (i = 0; i <= 24; i++) {
  var photoAddressesRand = Math.floor(Math.random() * photoAddresses.length);
  var commentsPhotosRand = Math.floor(Math.random() * (commentsPhotos.length));
  var numberLikesRand = randomInt(15, 200);
  photoDataSet[i] = new randomDataSet(photoAddresses[photoAddressesRand],
    numberLikes[numberLikesRand], commentsPhotos[commentsPhotosRand]);
};
console.log(photoDataSet);

//функция создания DOM-элемента на основе JS-объекта
function createDocumentPictures() {
  var fragment = document.createDocumentFragment()
  var pic = document.createElement('img')
  var likes = document.createElement('span')
  var comment = document.createElement('span')


  fragment.appendChild(pic)
  pic.innerHTML = "<img src='"+photoAddresses[photoAddressesRand]+"'>";
  fragment.appendChild(likes)
  likes.innerHTML = "<span class=\"picture-stat picture-likes\">"+numberLikes[numberLikesRand]+"</span>";
  fragment.appendChild(comment)
  comment.innerHTML = "<span class=\"picture-stat picture-comments\">"+commentsPhotos[commentsPhotosRand]+"</span>";

  return fragment
}
console.log(createDocumentPictures());

