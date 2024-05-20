// Declare global variables--may not be used in this JS file, but used in other files
const menuIcon = document.querySelector('.menu-icon');
const username = document.querySelector('#username');
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const timeBar = document.getElementById('timeBar');
const greetingBar = document.getElementById('greetingBar');
var showSeconds = false;
var hoverShowSeconds = false;

document.addEventListener('DOMContentLoaded', function () {
    
    // Setup time
    const timeElement = document.getElementById('time');
    if (localStorage.getItem('username')) {
        username.textContent = localStorage.getItem('username');
    } else {
        username.textContent = "Name?"
    }

    getTime(showSeconds);
    setInterval(() => {
        getTime(showSeconds);
    }, 1000);

    timeElement.addEventListener('mouseover', () => {
        showSeconds = true;
        getTime();
    });

    timeElement.addEventListener('mouseout', () => {
        showSeconds = false;
        getTime();
    });

    // Setup quotes
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

// Make the username editable
username.addEventListener('dblclick', () => {
    username.setAttribute('contentEditable', true);
    username.focus()
});

username.addEventListener('blur', () => {
    username.setAttribute('contentEditable', false);
    localStorage.setItem('username', username.textContent);
});

username.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        username.setAttribute('contentEditable', false);
        localStorage.setItem('username', username.textContent);
        event.preventDefault();
    }
});


function getTime() {
    const date = new Date();
    const hours = (padZero(date.getHours() % 12) == 0) ? (date.getHours() % 12) + 12 : padZero(date.getHours() % 12);
    const minutes = padZero(date.getMinutes());

    if (showSeconds) {
        const seconds = padZero(date.getSeconds());
        const timeString = `${hours}:${minutes}:${seconds}`;
        document.getElementById('time').innerHTML = timeString;
    } else {
        const timeString = `${hours}:${minutes}`;
        document.getElementById('time').innerHTML = timeString;
    }
}

function padZero(number) {
    return number < 10 ? `0${number}` : number;
}