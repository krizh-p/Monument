const menuIcon = document.querySelector('.menu-icon');
const username = document.querySelector('#username');
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const timeBar = document.getElementById('timeBar');
const greetingBar = document.getElementById('greetingBar');

function getRandomImage() {
    var downloadedImages = JSON.parse(localStorage.getItem('downloadedImages'));
    var currentImageIndex = parseInt(localStorage.getItem('currentImageIndex'));

    const imageUrl = "https://source.unsplash.com/random/1920x1080/?wallpaper,landscape,modern"
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
        document.body.style.backgroundImage = `url(${imageUrl})`;
    };
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
