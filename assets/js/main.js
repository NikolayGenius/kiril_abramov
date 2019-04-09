$(".js-snowboards-slider").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  prevArrow: '<button type="button" class="snow_boards__prev"></button>',
  nextArrow: '<button type="button" class="snow_boards__next"></button>',
  responsive: [
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false
      }
    }
    // },
    // {
    //   breakpoint: 600,
    //   settings: {
    //     slidesToShow: 2,
    //     slidesToScroll: 2
    //   }
    // },
    // {
    //   breakpoint: 480,
    //   settings: {
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    //   }
    // }
  ]
});

const burger = $(".burger");
const menu = $(".snow_header__menu");
const menuItem = $(".snow_header__item");

burger.on("click", () => {
  burger.addClass("open");
  menu.addClass("snow_header__menu--active");
});

menu.on("click", () => {
  menu.removeClass("snow_header__menu--active");
  burger.removeClass("open");
});

menuItem.on("click", e => {
  e.stopPropagation();
});
