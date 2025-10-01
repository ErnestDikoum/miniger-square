// Générer le QR code
function updateQr(){
  const siteUrl = window.location.href; // ✅ Auto
  const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=800x800&chl=${encodeURIComponent(siteUrl)}&chld=L|1`;
  document.getElementById('qrImage').src = qrUrl;
}
updateQr();

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
