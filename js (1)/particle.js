/* =====================================================================
   particles-config.js  —  drop-in particle background for any page.

   USE:  add this ONE line just before </body> on any page:
         <script src="particles-config.js"></script>

   It loads particles.js (and optionally Stats.js) from a CDN, creates the
   background layer for you, and starts your config. Needs internet access.
   ===================================================================== */
(function () {
  var SHOW_STATS = false;   // true = show the FPS meter + particle counter (debug)
  // Layer: -1 sits behind page content. A page can override with data-z="0" on the script tag.
  var Z = (document.currentScript && document.currentScript.getAttribute('data-z')) || '-1';

  var PARTICLES_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
  var STATS_CDN     = 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r11/Stats.min.js';

  /* --- your particles.js config (same values you sent) --- */
  var CONFIG = {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#00e5ff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#8e0000"},"polygon":{"nb_sides":11},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#00e5ff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},
    /* detect_on is "window" (not "canvas") because the layer sits BEHIND your
       page content; "canvas" would never receive the mouse. */
    "interactivity":{"detect_on":"window","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true};

  /* --- background layer (sits behind everything, never blocks clicks) --- */
  if (!document.getElementById('particles-js')) {
    var st = document.createElement('style');
    st.textContent = '#particles-js{position:fixed;inset:0;z-index:' + Z + ';pointer-events:none}' +
                     '#particles-js canvas{width:100%;height:100%;display:block}';
    document.head.appendChild(st);
    var box = document.createElement('div');
    box.id = 'particles-js';
    document.body.insertBefore(box, document.body.firstChild);
  }

  function load(src, cb) {
    var s = document.createElement('script');
    s.src = src; s.onload = cb;
    s.onerror = function () { console.warn('Could not load ' + src); };
    document.head.appendChild(s);
  }

  /* --- optional FPS meter + particle counter (safe if .js-count-particles is missing) --- */
  function startStats() {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.cssText = 'position:fixed;left:0;top:0;z-index:100';
    document.body.appendChild(stats.domElement);
    var counter = document.querySelector('.js-count-particles');
    (function update() {
      stats.begin(); stats.end();
      var p = window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS.particles;
      if (counter && p && p.array) counter.innerText = p.array.length;
      requestAnimationFrame(update);
    })();
  }

  load(PARTICLES_CDN, function () {
    particlesJS('particles-js', CONFIG);
    if (SHOW_STATS) load(STATS_CDN, startStats);
  });
})();