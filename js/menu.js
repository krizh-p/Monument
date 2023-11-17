var menuOn = false;
toggleBar('0em');

var zIndexCounter = (localStorage.getItem('zIndexCounter')) ? localStorage.getItem('zIndexCounter') : 0;
localStorage.setItem('zIndexCounter', zIndexCounter);

const md = window.markdownit();

/**
 * Animate clicking the menu icon
 */
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    menuOn = !menuOn;
    if (menuOn)
        toggleBar('1.5em');
    else
        toggleBar('0em');
});

function toggleBar(size) {
    // pomodoroIcon.style.width = noteIcon.style.width = clockIcon.style.width = timeBar.style.height = size;
    noteIcon.style.width = timeBar.style.height = size;
}