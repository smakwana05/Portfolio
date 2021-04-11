const images = document.querySelectorAll(".item2.lazy");

const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 600px 0px"
};

function preloadImage(img) {
  const src = document.querySelector(".item2.lazy");
  if(!src) {
    return;
  }
  img.src = src;
}

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  })
}, imgOptions)

images.forEach(image => {
  imgObserver.observe(image);
});