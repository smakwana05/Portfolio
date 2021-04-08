// barba.use(barbaCss);
barba.use(barbaPrefetch);

var main = document.querySelector(".main");
var header = document.querySelector(".header");
var menu = document.querySelector(".menu");
var sticky = header.offsetTop;
const gridwrapper = document.getElementsByClassName(".gridwrapper");
const images = document.querySelectorAll("[data-src]")

// const imgOptions = {
//   threshold: 0,
//   rootMargin: "0px 0px 600px 0px"
// };

// function preloadImage(img) {
//   const src = img.getAttribute("data-src");
//   if(!src) {
//     return;
//   }
//   img.src = src;
// }

// const imgObserver = new IntersectionObserver((entries, imgObserver) => {
//   entries.forEach(entry => {
//     if (!entry.isIntersecting) {
//       return;
//     } else {
//       preloadImage(entry.target);
//       imgObserver.unobserve(entry.target);
//     }
//   })
// }, imgOptions)

// images.forEach(image => {
//   imgObserver.observe(image);
// });



function goBack() {
  window.history.back();
}
function goForward() {
  window.history.forward();
}

barba.init({
preventRunning: true,
transitions: [
  {
    name: 'fade-header',
          to: { namespace: ["home", "alternate"] },
          once(data) {
            return new Promise(resolve => {
              const timeline = gsap.timeline({
                onComplete() {
                  resolve();
                }
              })
    
              timeline
              .fromTo("body", {autoAlpha: 0}, {autoAlpha: 1, duration: 1, delay: 0.1});
    
            })
          },
          enter({next}) {
            header.classList.remove("shrink");
            return new Promise(resolve => {
              const timeline = gsap.timeline({
                onComplete() {
                  resolve();
                }
              })
    
              timeline
                .fromTo(next.container, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.3})
           })
          },
    
          leave({current}) {
            return new Promise(resolve => {
              const timeline = gsap.timeline({
                onComplete() {
                  resolve();
                  current.container.remove();
                }
              })
    
              timeline
                .to(current.container, {autoAlpha: 0, duration: 0.3});
            })
          }
        },
    
{
name: 'fade-headersmall',
      to: { namespace: ["page"] },
      once(data) {
        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          })

          timeline
          .fromTo("body", {autoAlpha: 0}, {autoAlpha: 1, duration: 1, delay: 0.1});

        })
      },
      enter({next}) {
        header.classList.add("shrink");
        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          })

          timeline
          .fromTo(next.container, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.3})
        })
      },

      leave({current}) {
        return new Promise(resolve => {

          const timeline = gsap.timeline({
            onComplete() {
              resolve();
              current.container.remove();
            }
          })

          timeline
            .to(current.container, {autoAlpha: 0, duration: 0.3});
        })
      }
    },

{
name: 'gallery',
      to: {
        namespace: ['masonry']
      },
      once(data) {
        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          })
          timeline
          .fromTo("body", {autoAlpha: 0}, {autoAlpha: 1, duration: 1, delay: 0.15});

        })
      },
      enter({next}) {
     
      // resizeAllGridItems(); 
      header.classList.add("shrink");
        return new Promise(resolve => {
          const images = document.querySelectorAll("img")

          gsap.set(next.container, {autoAlpha: 0});
          gsap.set('.item2', {autoAlpha: 0});

          imagesLoaded(images, () => {
            const timeline = gsap.timeline({
              onComplete() {
                resolve();
              }
            })

            timeline
              .to(next.container, {autoAlpha: 1, duration: 0.3})
              .to('.item2', {autoAlpha: 1, duration: 0.3, delay: 0.05});
          })
        })
      },
      leave({current}) {
        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
              current.container.remove();
            }
          })
          timeline
            .to(current.container, {autoAlpha: 0, duration: 0.3});
        })
      }
    },
  ],
  debug: true

});

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}


barba.hooks.leave(() => {
  window.scrollTo(0, 0);
});

barba.hooks.enter(() => {
  window.scrollTo(0, 0);
});
















function fadeOnce() {
  gsap.fromTo("body", 
  {autoAlpha: 0}, 
  {autoAlpha: 1, duration: 1, delay: 0.5});
}

// function enterAnimation() {
//   const tl = gsap.timeline();
//   tl.from('.gridwrapper', {
//       autoAlpha: 0,
//       duration: 0.35,
//   });
// }

// function leaveAnimation() {
//   const tl = gsap.timeline();
//   tl.to('.gridwrapper', {
//       autoAlpha: 0,
//         duration: 0.35,
//   });
// }


// document.onkeypress = function(e) {
//   e = e || window.event;

//     if (e.keyCode === 13) {
//       document.documentElement.classList.toggle("darkmode")
//     }
// };


 // views: [{
  //   namespace: "page",
  //   beforeEnter() {
  //     header.classList.add("shrink")
  //   },
  //   namespace: "page",
  //   beforeLeave() {
  //     header.classList.remove("shrink"); 
  //   },
  // }],


 //   name: "pagefades",
  //     leave(data) {  
  //       const done = this.async();
  //       leaveAnimation();
  //       setTimeout(function() {
  //       done();
  //       }, 700);
  //     },
  //     enter(data) {
  //       enterAnimation();
  //     }
  // },






/*    namespace: "home",
    beforeEnter(data) {
      // window.scrollTo(0, 0);
     },
     namespace: "home",
    beforeLeave(data) {
      //  window.scrollTo(0, 0);
     },
    namespace: "page",
    beforeEnter(data) {
      // window.scrollTo(0, 0);
      header.classList.add("shrink");
     },
     namespace: "page",
    afterLeave(data) {
        // window.scrollTo(0, 0);
       header.classList.remove("shrink");
     },


  }]
*/







//SCROLLY


// window.addEventListener("scroll", _.throttle(headerScroll, 200))


// window.onscroll = function() {headerScroll()};

// function headerScroll() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");

//   } else {
//     header.classList.remove("sticky");
//   }
// }