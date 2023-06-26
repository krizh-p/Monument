var showSeconds = false;
var hoverShowSeconds = false;

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

document.addEventListener('DOMContentLoaded', function () {
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