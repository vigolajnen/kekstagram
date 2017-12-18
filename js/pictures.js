  fillUserPhoto(createUserPhotos(25));


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
