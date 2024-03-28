document.addEventListener("DOMContentLoaded", (event) => {
    // swiper
  var swiper = new Swiper("#callingSwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Карта Яндекса
  ymaps.ready(init);
function init() {
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.028894, 82.926493],
      zoom: 15,
      controls: [],
    },
    {
      suppressMapOpenBlock: true,
    }
  );

  myMap.behaviors.disable("scrollZoom");
  myMap.behaviors.disable("drag");

  const myPlacemark = new ymaps.Placemark(
    [55.028894, 82.926493],
    {},
    {
      preset: 'islands#blueEducationIcon',
      iconColor: '#ff3333'
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.container.fitToViewport();
}

// FancyBox
Fancybox.bind("[data-fancybox]", {
  });
});
