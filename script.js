const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const section_1 = document.getElementById("vertical");
const col_left = document.querySelector(".col_left");
const timeln = gsap.timeline({ paused: true });

timeln.fromTo(col_left, {y: 0}, {y: '170vh', duration: 1, ease: 'none'}, 0);

const scroll_1 = ScrollTrigger.create({
    animation: timeln,
    trigger: section_1,
    start: 'top top',
    end: 'bottom center',
    scrub: true
});

const section_2 = document.getElementById("horizontal");
let box_items = gsap.utils.toArray(".horizontal__item");

gsap.to(box_items, {
  xPercent: -100 * (box_items.length - 1),
  ease: "sine.out",
  scrollTrigger: {
    trigger: section_2,
    pin: true,
    scrub: 3,
    snap: 1 / (box_items.length - 1),
    end: "+=" + section_2.offsetWidth
  }
});

gsap.to("h3", {
  backgroundPosition: "400% 0",
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});


gsap.registerPlugin(ScrollTrigger);

// Transición del segundo fondo al hacer scroll hasta sección horizontal
// El fondo1 (bg-2) se colapsa al hacer scroll
gsap.to(".bg-2", {
  clipPath: "polygon(100% 100%, 100% 100%, 100% 100%)",
  scrollTrigger: {
    trigger: "#horizontal",
    start: "top bottom",
    end: "top top",
    scrub: true
  }
});

// El fondo (bg-1) aparece como triángulo
gsap.to(".bg-1", {
  clipPath: "polygon(0 100%, 0 0, 100% 0)", // triángulo en esquina superior izquierda
  scrollTrigger: {
    trigger: "#horizontal",
    start: "top bottom",
    end: "top top",
    scrub: true
  }
});




