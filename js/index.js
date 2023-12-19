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
var sidebarWidth = 200;
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

const selectedRepos = ['maugapsResume', 'maugapsSecretSanta', 'cypressFrameworkSeed', 'letsTalkDND', 'micka-and-mauro'];
const username = 'MauGaP';

function createCarouselItems(username, selectedRepos) {
  const carousel = document.getElementById('personalProjects');

  selectedRepos.forEach(repoName => {
    const item = document.createElement('div');
    item.className = 'carousel-item card';
    const repoUrl = `https://github.com/${username}/${repoName}`;
    const imageUrl = `./asset/project/${repoName}.png`;
    item.innerHTML = `
            <a class="repo-link" href="${repoUrl}" target="_blank">
              <h3 class="repo-name">${repoName}</h3>
              <img class="repo-image" src="${imageUrl}" alt="${repoName} Open Graph Image" />
            </a>
      `;
    carousel.appendChild(item);
  });
}

createCarouselItems(username, selectedRepos);

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
