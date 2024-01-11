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

// document.addEventListener('DOMContentLoaded', function () {
//   var controller = new ScrollMagic.Controller();

//   document.querySelectorAll('.scrollMagicContainer .body-slide').forEach(function (elem) {
//     // Calculate the height of the element minus the viewport height
//     var sceneHeight = elem.scrollHeight - window.innerHeight;

//     new ScrollMagic.Scene({
//       triggerElement: elem,
//       duration: sceneHeight > 0 ? sceneHeight : 0, // Ensure non-negative duration
//       triggerHook: 0,
//     })
//       .setPin(elem, { pushFollowers: false })
//       .addTo(controller);

//     // Optional: For debugging
//     // .addIndicators({name: "scene"});
//   });
// });
