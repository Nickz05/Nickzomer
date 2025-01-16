function moveToNext(current, nextId) {
    if (current.value.length === 1 && nextId) {
        document.getElementById(nextId).focus();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Wanneer 10% van het item zichtbaar is
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Voeg de 'visible' klasse toe
                console.log(`Item zichtbaar: ${entry.target.classList}`);
            } else {
                // Verwijder de 'visible' klasse als het item niet meer zichtbaar is
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item); // Observeer elk timeline-item
        console.log(`Begin met observeren: ${item.classList}`);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const correctCode = "12345"; // De juiste toegangscode
    const overlay = document.getElementById('toegang_overlay');
    const codeInputs = document.querySelectorAll('.code-box');

    if (sessionStorage.getItem('accessGranted') === 'true') {
        overlay.style.display = 'none'; // Verberg de overlay
        document.body.classList.remove('no-scroll'); // Laat scrollen toe
    } else {
        document.body.classList.add('no-scroll'); // Voorkom scrollen
    }

    codeInputs.forEach((box, index, boxes) => {
        box.addEventListener('input', () => {
            if (box.value.length === 1 && index < boxes.length - 1) {
                boxes[index + 1].focus();
            }

            const enteredCode = Array.from(boxes).map(input => input.value).join('');
            if (enteredCode.length === correctCode.length) {
                if (enteredCode === correctCode) {
                    // Toegang verlenen
                    sessionStorage.setItem('accessGranted', 'true');
                    overlay.classList.add('fade-out');
                    setTimeout(() => {
                        overlay.remove();
                        document.body.classList.remove('no-scroll');
                    }, 500);
                } else {
                    // Ongeldige code
                    alert('Ongeldige code. Probeer opnieuw.');
                    boxes.forEach(input => (input.value = ''));
                    boxes[0].focus();
                }
            }
        });

        box.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && box.value === '' && index > 0) {
                boxes[index - 1].focus();
            }
        });
    });
});

function submitCode() {
    const code1 = document.getElementById('code1').value;
    const code2 = document.getElementById('code2').value;
    const code3 = document.getElementById('code3').value;
    const code4 = document.getElementById('code4').value;
    const code5 = document.getElementById('code5').value;

    const enteredCode = code1 + code2 + code3 + code4 + code5;
    const correctCode = '12345';

    const messageElement = document.getElementById('message');
    const overlay = document.getElementById('toegang_overlay');
    document.querySelectorAll('.code-box').forEach((box) => {
        box.value = '';
    });
    if (enteredCode === correctCode) {
        messageElement.textContent = 'Toegang verleend!';
        messageElement.style.color = 'green';

        sessionStorage.setItem('accessGranted', 'true');

        overlay.classList.add('fade-out');

        setTimeout(() => {
            overlay.remove();
            document.body.classList.remove('no-scroll');
        }, 500);
    } else {
        messageElement.textContent = 'Ongeldige toegangscode. Probeer het opnieuw.';
        messageElement.style.color = 'red';

        document.querySelectorAll('.code-box'). forEach((box) => {
            box.value = '';
        });
        document.getElementById('code1').focus();
    }
}

// Swiper-initialisatie