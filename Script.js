// // barba.use(barbaCss);
// barba.use(barbaPrefetch);

var main = document.querySelector(".main");
var header = document.querySelector(".header");
var menu = document.querySelector(".menu");
var sticky = header.offsetTop;
var gridwrapper = document.querySelector(".gridwrapper");
var body = document.querySelector("body");
var html = document.documentElement;

const options = {
  root: null,
  rootMargin: '0px 0px 300px 0px',
  threshold: 0.5
}

function test() {
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


function goBack() {
  window.history.back();
}
function goForward() {
  window.history.forward();
}

function fadeOnce() {
  gsap.to("body", 
  {autoAlpha: 1, duration: 0.1});
}

function enterAnimation() {
  const tl = gsap.timeline();
  tl.from('.gridwrapper', {
      autoAlpha: 0,
      duration: 0.3,
  });
}
function leaveAnimation() {
  const tl = gsap.timeline();
  tl.to('.gridwrapper', {
      autoAlpha: 0,
      duration: 0.3,
  })
 
}



barba.init({
preventRunning: true,
transitions: [
  {
    name: 'fade-once',
        once(data) {
          imagesLoaded( body, 
          function (instance) {
          gsap.to(body, {autoAlpha: 1, duration: 0.3});
          });
        },
  },
    
  {  
  name: "headershrink",
    from: { namespace: ["page", "page2rows", "masonry"] },
    to: { namespace: ["home", "alternate"] },
    leave(data) {
      header.classList.remove("shrink");   
      const done = this.async();
      leaveAnimation();
      setTimeout(function() {
      done();
      }, 300);
    },
    enter(data) {
      enterAnimation();
    }
  },
  {  
    name: "headerexpand",
      to: { namespace: ["page"] },
      leave(data) {
        header.classList.add("shrink");
        // gridwrapper.classList.add("shrink");
        const done = this.async();
        leaveAnimation();
        setTimeout(function() {
        done();
        }, 300);
      },
      enter(data) {
        enterAnimation();
      }
  },
  {  
    name: "onlyfades",
      to: { namespace: ["alternate", "home"] },
      leave(data) {
        const done = this.async();
        leaveAnimation();
        setTimeout(function() {
        done();
        }, 300);
      },
      enter(data) {
        enterAnimation();
      }
  },

{
name: 'masonry',
      to: {
        namespace: ['masonry']
      },
      before(data) {
          setTimeout(function(){header.classList.add("shrink");}, 0);
          gsap.set(document.querySelector(".preloader"), 
          {autoAlpha: 1});
          imagesLoaded( data.next.container, 
            function (instance) {
            gsap.to(document.querySelector(".preloader"), {autoAlpha: 0});
          });
      },

      enter(data) {
        setTimeout(function(){header.classList.add("shrink");}, 0);

        gsap.set(data.next.container, 
          {autoAlpha: 0});

        imagesLoaded( data.next.container, 
          function (instance) {
          gsap.to(data.next.container, {autoAlpha: 1, duration: 0.3});
          });
      },

      leave(data) {
        const done = this.async();
        leaveAnimation();
        setTimeout(function() {
        done();
        }, 300);
      }
    },
  ],
  // debug: true

});



if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}


barba.hooks.leave(() => {
  window.scrollTo(0, 0);
});

barba.hooks.enter(() => {
  window.scrollTo(0, 0);
  test();
});

barba.hooks.once(() => {
  test();
});

  