var pomOn = false
function showPomodoro() {
    // Set Opacity to 0 for time, username, greeting
    // Set Height, Width to for ^
    // 
    // Set height, width to 1em for Timer elems
    // Set Opacity to 1 for Timer elms
    collapseGreeting('0', '0em', '0em', '0em')
}

function hidePomodoro() {
    toggleGreeting('1', 'auto', 'auto', '10em')
}

function collapseGreeting(opacity, length, width, fontSize) {
    time.style.opacity = username.style.opacity = opacity;
    greeting.style.opacity = opacity;
    setTimeout(function() {
        greeting.style.height = time.style.height = username.style.height = length;
        greeting.style.width = time.style.width = username.style.width = width;
        greeting.style.fontSize = username.style.fontSize = time.style.fontSize = fontSize;
    }, 200)

    pomodoroBar.style.display = 'block'
}

pomodoroIcon.addEventListener('click', () => {
    pomOn = !pomOn
    if (pomOn)
        showPomodoro()
    else 
        hidePomodoro()
});

sessionInputMinute.addEventListener('input', function () {
    if (this.value.length === parseInt(this.getAttribute('maxlength'), 10)) {
        sessionInputSecond.focus();
    }
});

sessionInputSecond.addEventListener('input', function () {
    if (this.value.length === parseInt(this.getAttribute('maxlength'), 10)) {
        breakInputMinute.focus();
    }
});

breakInputMinute.addEventListener('input', function () {
    if (this.value.length === parseInt(this.getAttribute('maxlength'), 10)) {
        breakInputSecond.focus();
    }
});