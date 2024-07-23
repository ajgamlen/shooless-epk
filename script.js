function openNav() {
   document.getElementById("myNav").style.height = "100%";
   document.getElementById("logo").onclick = closeNav;
}

function closeNav() {
   document.getElementById("myNav").style.height = "0%";
   document.getElementById("logo").onclick = openNav;
}

function toggleNav() {
   var nav = document.getElementById("myNav");
   if (nav.style.height === "100%") {
       closeNav();
   } else {
       openNav();
   }
}

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
  "S",
  "SHO",
  "SHOOLESS"
];

// Controls the speed of morphing.
const morphTime = 1.7;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
  // fraction = Math.cos(fraction * Math.PI) / -2 + .5;

  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

// Start the animation.
animate();

// script.js
var myVar;

function loadingPage() {
    myVar = setTimeout(showPage, 4000); // Wait for 4 seconds
}

function showPage() {
    var overlay = document.getElementById("overlay");
    overlay.style.opacity = "0"; // Start fading out

    setTimeout(function() {
        overlay.style.display = "none"; }, 3000); // Match this timeout with the CSS transition duration (1s)
}
