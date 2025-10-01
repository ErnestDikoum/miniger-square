"use strict";

// Générer le QR code
document.addEventListener("DOMContentLoaded", function () {
  var qrImage = document.getElementById("qrImage");

  if (qrImage) {
    var siteUrl = window.location.href;
    QRCode.toDataURL(siteUrl, {
      width: 250
    }, function (err, url) {
      if (err) {
        console.error(err);
        return;
      }

      qrImage.src = url;
    });
  }
}); // Carrousel

var track = document.querySelector('.carousel-track');
var slides = document.querySelectorAll('.carousel img');
var index = 0;
var interval = setInterval(nextSlide, 4000);

function updateSlide() {
  track.style.transform = "translateX(-".concat(index * 100, "%)");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
} // Swipe & drag


var carousel = document.getElementById('carousel');
var startX = 0;
var isDown = false;
carousel.addEventListener('touchstart', function (e) {
  clearInterval(interval);
  startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', function (e) {
  var diff = e.changedTouches[0].clientX - startX;

  if (Math.abs(diff) > 50) {
    diff > 0 ? prevSlide() : nextSlide();
  }

  interval = setInterval(nextSlide, 3000);
});
carousel.addEventListener('mousedown', function (e) {
  clearInterval(interval);
  isDown = true;
  startX = e.clientX;
  carousel.style.cursor = 'grabbing';
});
carousel.addEventListener('mouseup', function (e) {
  if (!isDown) return;
  isDown = false;
  var diff = e.clientX - startX;

  if (Math.abs(diff) > 50) {
    diff > 0 ? prevSlide() : nextSlide();
  }

  carousel.style.cursor = 'grab';
  interval = setInterval(nextSlide, 3000);
});
carousel.addEventListener('mouseleave', function (e) {
  if (isDown) {
    isDown = false;
    carousel.style.cursor = 'grab';
    interval = setInterval(nextSlide, 4000);
  }
});
//# sourceMappingURL=main.dev.js.map
