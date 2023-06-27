const menuIcon = document.querySelector('.menu-icon');
const username = document.querySelector('#username');
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const timeBar = document.getElementById('timeBar');
const greetingBar = document.getElementById('greetingBar');

function getRandomImage() {
    var downloadedImages = JSON.parse(localStorage.getItem('downloadedImages'));
    var currentImageIndex = parseInt(localStorage.getItem('currentImageIndex'));

    const imageUrl = "https://source.unsplash.com/random/1920x1080/?modern";

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.insertAdjacentHTML('beforeend', '<div class="vignette-layer"></div>');
    };

    // CSS styles
    const styles = `
        body {
            position: relative;
        }

        .vignette-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0) 75%, rgba(0,0,0,0.6) 115%);
            pointer-events: none;
        }
    `;

    // Create a style element and append the CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    currentImageIndex = (currentImageIndex + 1) % downloadedImages.length;
    localStorage.setItem('currentImageIndex', currentImageIndex);
}

// Handle the hover effect on the quote element
quoteElement.addEventListener('mouseover', () => {
    authorElement.style.opacity = '1';
    quoteElement.style.transform = 'translateY(-10px)';
});

// Reset the quote element when the mouse leaves
quoteElement.addEventListener('mouseleave', () => {
    authorElement.style.opacity = '0';
    quoteElement.style.transform = 'translateY(0)';
});


document.addEventListener('DOMContentLoaded', () => {
    getRandomImage();

    // Retrieve a quote from the API and display it
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            const quoteElement = document.getElementById('quote');
            const authorElement = document.getElementById('author');
            quoteElement.textContent = data.content;
            authorElement.textContent = data.author;
        })
        .catch(error => {
            console.log('Error fetching quote:', error);
        });
});
