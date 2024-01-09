function initializeAOS() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.setAttribute('data-aos-duration', 500);
  });

  AOS.init();
}

document.addEventListener('DOMContentLoaded', initializeAOS);

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
