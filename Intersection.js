const options = {
    rootMargin: "2px",
  };

const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        loadImage(entry.target);
        entry.target.classList.remove('lazy');
        io.unobserve(entry.target);
      }
    });
  }, options);
  
// const targetElements = document.querySelectorAll(".lazy");
//   for (let element of targetElements) {
//     // console.log('element: ', element);
//     io.observe(element);
//   }
  
function loadImage(imageElement) {
    setTimeout(() => {
      console.dir(imageElement.querySelector('img'));
      imageElement.querySelector('img').src = imageElement.querySelector('img').dataset.src;  
    }, 100);
  }
  