var pomodoroMenuOn = false
var menuOn = false

menuIcon.classList.toggle('active');
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    menuOn = !menuOn;
});