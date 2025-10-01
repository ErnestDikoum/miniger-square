// Générer le QR code
document.addEventListener("DOMContentLoaded", () => {
  const qrImage = document.getElementById("qrImage");
  if (qrImage) {
    const siteUrl = window.location.href; 
    QRCode.toDataURL(siteUrl, { width: 250 }, function (err, url) {
      if (err) {
        console.error(err);
        return;
      }
      qrImage.src = url;
    });
  }
});


// Carrousel
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel img');
let index = 0;
let interval = setInterval(nextSlide, 4000);

function updateSlide(){
  track.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide(){
  index = (index + 1) % slides.length;
  updateSlide();
}

function prevSlide(){
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
}

// Swipe & drag
const carousel = document.getElementById('carousel');
let startX = 0;
let isDown = false;

carousel.addEventListener('touchstart', e => {
  clearInterval(interval);
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', e => {
  let diff = e.changedTouches[0].clientX - startX;
  if (Math.abs(diff) > 50){ diff > 0 ? prevSlide() : nextSlide(); }
  interval = setInterval(nextSlide,3000);
});

carousel.addEventListener('mousedown', e => {
  clearInterval(interval);
  isDown = true;
  startX = e.clientX;
  carousel.style.cursor = 'grabbing';
});

carousel.addEventListener('mouseup', e => {
  if (!isDown) return;
  isDown = false;
  let diff = e.clientX - startX;
  if (Math.abs(diff) > 50){ diff > 0 ? prevSlide() : nextSlide(); }
  carousel.style.cursor = 'grab';
  interval = setInterval(nextSlide,3000);
});

carousel.addEventListener('mouseleave', e => {
  if (isDown){
    isDown = false;
    carousel.style.cursor = 'grab';
    interval = setInterval(nextSlide,4000);
  }
});
