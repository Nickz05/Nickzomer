new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 20,
    centeredSlides: false,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    slidesPerView: 2,

    breakpoints: {
        1024: {
            slidesPerView: 3 // Desktopversie
        },
        768: {
            slidesPerView: 2 // Tabletversie
        },
        0: {
            slidesPerView: 1 // Mobiel
        }
    }
});