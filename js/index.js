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
