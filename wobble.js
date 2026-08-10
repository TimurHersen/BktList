/**
 * wobblify — nudges each letter's baseline and rotation slightly, like
 * hand-set wood/metal type that's never perfectly aligned.
 * Deterministic per letter (same output every load), not randomized on refresh.
 *
 * Usage:
 *   <h1 class="wobble">LOUNGE</h1>
 *   <script src="wobble.js"></script>
 *   <script>wobblify('.wobble');</script>
 *
 * Tune the look with data attributes:
 *   <h1 class="wobble" data-wobble-y="8" data-wobble-rot="4">LOUNGE</h1>
 */
function wobblify(selector) {
  var els = document.querySelectorAll(selector);
  for (var e = 0; e < els.length; e++) {
    var el = els[e];
    if (el.getAttribute('data-wobbled')) continue;

    var text = el.textContent;
    var maxY = parseFloat(el.getAttribute('data-wobble-y') || 6);
    var maxRot = parseFloat(el.getAttribute('data-wobble-rot') || 3);

    el.textContent = '';
    el.style.display = 'inline-block';

    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      var span = document.createElement('span');
      span.textContent = (ch === ' ') ? '\u00A0' : ch;
      span.style.display = 'inline-block';

      var seed = ((ch.charCodeAt(0) * 31 + i * 17) % 100) / 100;
      var seed2 = ((ch.charCodeAt(0) * 53 + i * 7) % 100) / 100;

      var y = (seed - 0.5) * 2 * maxY;
      var rot = (seed2 - 0.5) * 2 * maxRot;

      span.style.transform = 'translateY(' + y.toFixed(2) + 'px) rotate(' + rot.toFixed(2) + 'deg)';
      el.appendChild(span);
    }

    el.setAttribute('data-wobbled', 'true');
  }
}
