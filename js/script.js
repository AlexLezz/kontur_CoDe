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
        preset: "islands#blueEducationIcon",
        iconColor: "#ff3333",
      }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.container.fitToViewport();
  }

  // FancyBox
  Fancybox.bind("[data-fancybox]", {});

  // modal
  var callingModal = document.getElementById("callingModal");
  // var btn = document.getElementById("myBtn");
  var close = document.getElementsByClassName("close")[0];
  // btn.onclick = function() {
  //   callingModal.style.display = "block";
  //   document.body.style.overflow = "hidden";
  // }

  var modalBtn = document.querySelectorAll(".calling-item__btn");
  for (var i = 0; i < modalBtn.length; i++) {
    modalBtn[i].onclick = function () {
      callingModal.style.display = "block";
      document.body.style.overflow = "hidden";
    };
  }

  close.onclick = function () {
    callingModal.style.display = "none";
    document.body.style.overflow = "visible";
  };

  window.onclick = function (event) {
    if (event.target == callingModal) {
      callingModal.style.display = "none";
      document.body.style.overflow = "visible";
    }
  };

  // burger

  function setBurger(params) {
    const btn = document.querySelector(`.${params.btnClass}`);
    const menu = document.querySelector(`.${params.menuClass}`);
    const links = menu.querySelectorAll(`.${params.link}`);

    function scrollToSection(link) {
      const href = link.getAttribute("href").substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
        top: elementPosition,
        behavior: "smooth",
      });
    }

    function onBtnClick() {
      if (window.screen.width <= 1280) {
        btn.classList.toggle(params.activeClass);

        if (
          !menu.classList.contains(params.activeClass) &&
          !menu.classList.contains(params.hiddenClass)
        ) {
          menu.classList.add(params.activeClass);
          document.body.style.overflow = "hidden";
          btn.setAttribute("aria-expanded", true);
        } else {
          menu.classList.add(params.hiddenClass);
          document.body.removeAttribute("style");
          btn.setAttribute("aria-expanded", false);
        }
      }
    }

    menu.addEventListener("animationend", function () {
      if (this.classList.contains(params.hiddenClass)) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
      }
    });

    btn.setAttribute("aria-expanded", false);
    btn.addEventListener("click", onBtnClick);
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        onBtnClick();
        scrollToSection(this);
      });
    });
  }

  setBurger({
    btnClass: "burger",
    menuClass: "menu-wrap",
    activeClass: "is-opened",
    hiddenClass: "is-closed",
    link: "js-menu-link",
  });

  // inputmask
  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 999-999-99-99");
  im.mask(selector);
});
