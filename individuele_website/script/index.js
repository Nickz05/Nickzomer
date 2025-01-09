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
            slidesPerView: 1.5 // Mobiel
        }
    }
});

 function moveToNext(current, nextId) {
     if (current.value.length === 1 && nextId) {
         document.getElementById(nextId).focus();
     }
 }

 document.addEventListener('DOMContentLoaded', () => {
     // Controleer of toegang al is verleend in de sessie
     if (sessionStorage.getItem('accessGranted') === 'true') {
         // Als toegang is verleend, verberg de overlay
         document.getElementById('toegang_overlay').style.display = 'none';
         document.body.classList.remove('no-scroll'); // Laat scrollen toe
     } else {
         // Als toegang nog niet is verleend, toon de overlay
         document.body.classList.add('no-scroll');
     }
 });

 function submitCode() {
     const code1 = document.getElementById('code1').value;
     const code2 = document.getElementById('code2').value;
     const code3 = document.getElementById('code3').value;
     const code4 = document.getElementById('code4').value;
     const code5 = document.getElementById('code5').value;

     const enteredCode = code1 + code2 + code3 + code4 + code5;
     const correctCode = '12345'; // De juiste toegangscode

     const messageElement = document.getElementById('message');
     const overlay = document.getElementById('toegang_overlay');

     if (enteredCode === correctCode) {
         messageElement.textContent = 'Toegang verleend!';
         messageElement.style.color = 'green';

         // Sla de toegangscode op in sessionStorage
         sessionStorage.setItem('accessGranted', 'true');

         // Voeg fade-out klasse toe aan de overlay
         overlay.classList.add('fade-out');

         // Verwijder de overlay na de animatie
         setTimeout(() => {
             overlay.remove();
             document.body.classList.remove('no-scroll');

             // Reset de invoervelden nadat de overlay is gesloten
             document.querySelectorAll('.code-box').forEach((box) => {
                 box.value = ''; // Leeg elke codebox
             });
         }, 500); // Duur moet overeenkomen met de fade-out animatie
     } else {
         messageElement.textContent = 'Ongeldige toegangscode. Probeer het opnieuw.';
         messageElement.style.color = 'red';

         // Leeg de velden en zet de focus op de eerste box
         document.querySelectorAll('.code-box').forEach((box) => {
             box.value = '';
         });
         document.getElementById('code1').focus();
     }
 }



