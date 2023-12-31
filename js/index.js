document.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const title = header.querySelector('h1');
  const particlesDiv = document.getElementById('particles-js');

  let scrollPercent = window.scrollY / (0.15 * window.innerHeight);
  scrollPercent = Math.min(1, scrollPercent);

  const opacity = scrollPercent;
  const translateY = -100 + scrollPercent * 100;

  header.style.backgroundColor = `rgba(43, 43, 43, ${opacity})`;
  title.style.opacity = `${opacity}`;
  title.style.transform = `translateY(${translateY}%)`;
  particlesDiv.style.opacity = scrollPercent;
});

document.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

particlesJS.load('particles-js', 'particles.json', function () {
  console.log('particles.js loaded - callback');
});

function toggleCollapse() {
  var content = document.getElementById('collapsibleContent');
  if (content.style.display === 'none') {
    content.style.display = 'block';
  } else {
    content.style.display = 'none';
  }
}

const values = [500, 1000, 1500];
function getRandomValue() {
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

function initializeAOS() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.setAttribute('data-aos-duration', getRandomValue());
  });

  AOS.init();
}

document.addEventListener('DOMContentLoaded', initializeAOS);

var sidebar = document.getElementById('sidebar');
var sidebarWidth = 188;
var collapsedWidth = '50px';

document.addEventListener('mousemove', function (e) {
  if (e.pageX < sidebarWidth) {
    sidebar.style.width = sidebarWidth + 'px';
    sidebar.classList.remove('collapsed');
  } else {
    sidebar.style.width = collapsedWidth;
    sidebar.classList.add('collapsed');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var collapsibles = document.querySelectorAll('.collapsible');

  collapsibles.forEach(function (collapsible) {
    collapsible.addEventListener('click', function () {
      var content = document.getElementById('more-tools');
      var spinner = document.getElementById('spinner');

      spinner.style.display = 'block';

      content.classList.toggle('hidden');

      setTimeout(function () {
        spinner.style.display = 'none';
      }, 1000);
    });
  });
});

function setActiveItem(activeIndex) {
  const items = document.querySelectorAll('.carousel-item');
  items.forEach((item, index) => {
    item.classList.remove('active', 'inactive', 'next', 'prev');
    if (index === activeIndex) {
      item.classList.add('active');
    } else {
      item.classList.add('inactive');
      if (index === (activeIndex + 1) % items.length) {
        item.classList.add('next');
      } else if (index === (activeIndex - 1 + items.length) % items.length) {
        item.classList.add('prev');
      }
    }
  });
}

document.getElementById('personalProjects').addEventListener('click', function (event) {
  const clickedItem = event.target.closest('.carousel-item');
  if (clickedItem && clickedItem.classList.contains('inactive')) {
    if (event.target.tagName === 'A' || event.target.parentElement.tagName === 'A') {
      event.preventDefault();
    }
    const newActiveIndex = Array.from(clickedItem.parentElement.children).indexOf(clickedItem);
    setActiveItem(newActiveIndex);
  }
});

setActiveItem(0);
