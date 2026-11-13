const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-menu');
const mobile = window.matchMedia('(max-width: 767px)');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  menu.hidden = mobile.matches;
}

function syncMenu() {
  menuButton.hidden = !mobile.matches;
  closeMenu();
}

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
  menu.hidden = !expanded;
});

menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobile.matches && !menu.hidden) {
    closeMenu();
    menuButton.focus();
  }
});

mobile.addEventListener('change', syncMenu);
syncMenu();
document.querySelector('#year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const heroBrand = document.querySelector('.hero-brand');
const navBrand = header.querySelector('.brand');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let headerVisible = null;
let pendingFrame = false;
let flight;

function updateHeader() {
  pendingFrame = false;
  const source = heroBrand.getBoundingClientRect();
  const visible = source.top <= 24;
  if (visible === headerVisible) return;
  headerVisible = visible;
  flight?.cancel();
  header.classList.toggle('is-visible', visible);
  header.inert = !visible;
  heroBrand.classList.toggle('is-transferred', visible);
  if (!visible) {
    closeMenu();
    if (header.contains(document.activeElement)) heroBrand.focus({ preventScroll: true });
    return;
  }
  if (reducedMotion.matches) return;

  // Animate a decorative copy between the two real links; neither layout moves.
  const target = navBrand.getBoundingClientRect();
  const headerTop = header.getBoundingClientRect().top;
  const copy = heroBrand.cloneNode(true);
  copy.classList.remove('is-transferred');
  copy.classList.add('brand-flight');
  copy.setAttribute('aria-hidden', 'true');
  copy.removeAttribute('href');
  Object.assign(copy.style, {
    left: `${source.left}px`, top: `${source.top}px`,
    width: `${source.width}px`, height: `${source.height}px`,
  });
  document.body.append(copy);
  navBrand.style.visibility = 'hidden';
  flight = copy.animate([
    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
    { transform: `translate(${target.left - source.left}px, ${target.top - headerTop - source.top}px) scale(${target.width / source.width})`, opacity: 0 },
  ], { duration: 320, easing: 'cubic-bezier(.22, 1, .36, 1)' });
  const cleanup = () => { copy.remove(); navBrand.style.removeProperty('visibility'); };
  flight.onfinish = cleanup;
  flight.oncancel = cleanup;
}

function scheduleHeaderUpdate() {
  if (!pendingFrame) {
    pendingFrame = true;
    requestAnimationFrame(updateHeader);
  }
}
window.addEventListener('scroll', scheduleHeaderUpdate, { passive: true });
window.addEventListener('resize', scheduleHeaderUpdate);
window.addEventListener('pageshow', scheduleHeaderUpdate);
updateHeader();
