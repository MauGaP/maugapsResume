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

function brandPose(element, fixedHeader = false) {
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  return {
    left: rect.left,
    top: rect.top - (fixedHeader ? header.getBoundingClientRect().top : 0),
    fontSize: parseFloat(style.fontSize),
    gap: parseFloat(style.gap),
    logoWidth: element.querySelector('img').getBoundingClientRect().width,
  };
}

function finishFlight() {
  if (flight) {
    cancelAnimationFrame(flight.frame);
    flight.copy.remove();
    flight = null;
  }
  heroBrand.classList.remove('brand-transitioning');
  navBrand.classList.remove('brand-transitioning');
}

function moveBrand(from) {
  const copy = heroBrand.cloneNode(true);
  copy.className = 'brand brand-flight';
  copy.setAttribute('aria-hidden', 'true');
  copy.removeAttribute('href');
  document.body.append(copy);
  heroBrand.classList.add('brand-transitioning');
  navBrand.classList.add('brand-transitioning');
  const logo = copy.querySelector('img');
  const paint = pose => {
    Object.assign(copy.style, {
      left: `${pose.left}px`, top: `${pose.top}px`,
      fontSize: `${pose.fontSize}px`, gap: `${pose.gap}px`,
    });
    logo.style.width = `${pose.logoWidth}px`;
  };
  paint(from);
  const start = performance.now();
  const current = { copy, frame: 0 };
  flight = current;
  function step(now) {
    // Track the hero's live position while scrolling, including on the return trip.
    const to = brandPose(headerVisible ? navBrand : heroBrand, headerVisible);
    const progress = Math.min((now - start) / 320, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const pose = {};
    for (const key of Object.keys(from)) pose[key] = from[key] + (to[key] - from[key]) * eased;
    paint(pose);
    if (progress === 1) finishFlight();
    else current.frame = requestAnimationFrame(step);
  }
  current.frame = requestAnimationFrame(step);
}

function updateHeader() {
  pendingFrame = false;
  const visible = heroBrand.getBoundingClientRect().top <= 24;
  if (visible === headerVisible) return;
  const initialized = headerVisible !== null;
  // Capture the moving copy before cancelling, so rapid reversals never jump.
  const from = brandPose(flight?.copy ?? (visible ? heroBrand : navBrand));
  finishFlight();
  headerVisible = visible;
  header.classList.toggle('is-visible', visible);
  header.inert = !visible;
  heroBrand.classList.toggle('is-transferred', visible);
  if (!visible) {
    closeMenu();
    if (header.contains(document.activeElement)) heroBrand.focus({ preventScroll: true });
  }
  if (initialized && !reducedMotion.matches) moveBrand(from);
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
