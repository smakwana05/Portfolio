function galleryImages() {

const options = {
  root: null,
  rootMargin: '0px 0px 300px 0px',
  threshold: 0.5
}

function imageLazyLoad() {
  const images = Array.from(document.querySelectorAll('img[data-src]'));

  if (images.length) {
    if ('IntersectionObserver' in window) {
      setupIntersectionObserver(images);
    } else {
      loadImages(images);
    }
  }
}

function setupIntersectionObserver(images) {
  const observer = new IntersectionObserver(onIntersection, options);
  images.forEach(image => observer.observe(image));
}

function onIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio >= 0.5) {
      observer.unobserve(entry.target);
      loadImage(entry.target);
    }
  });
}

function loadImages(images) {
  images.forEach(loadImage);
}

function loadImage(image) {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => image.removeAttribute('data-src');
}

imageLazyLoad();
}


// const options = {
//     rootMargin: "2px",
//   };

// const io = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       if (entry.intersectionRatio > 0) {
//         loadImage(entry.target);
//         entry.target.classList.remove('lazy');
//         io.unobserve(entry.target);
//       }
//     });
//   }, options);
  
// // const targetElements = document.querySelectorAll(".lazy");
// //   for (let element of targetElements) {
// //     // console.log('element: ', element);
// //     io.observe(element);
// //   }
  
// function loadImage(imageElement) {
//     setTimeout(() => {
//       console.dir(imageElement.querySelector('img'));
//       imageElement.querySelector('img').src = imageElement.querySelector('img').dataset.src;  
//     }, 100);
//   }
  