var menuOn = false
toggleBar('0em')

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    menuOn = !menuOn;
    if (menuOn)
        toggleBar('1.5em')
    else
        toggleBar('0em')
});

function toggleBar(size) {
    pomodoroIcon.style.width = clockIcon.style.width = timeBar.style.height = size;
}