var pomodoroMenuOn = false
var menuOn = false

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    menuOn = !menuOn;

    if (menuOn) {
        // Create the pomodoro element
        const pomodoro = document.createElement('img');
        pomodoro.src = 'assets/pomodoro.svg';
        pomodoro.id = 'pomodoro';

        // Create the clock element
        const clock = document.createElement('img');
        clock.src = 'assets/clock.svg';
        clock.id = 'clock';

        // Apply CSS styles to timeBar container
        timeBar.style.position = 'relative';
        timeBar.style.zIndex = '0';

        // Apply CSS styles to pomodoro and clock elements
        pomodoro.style.cssText = `
            font-size: 2em;
            width: 1.5em;
            height: 1.5em;
            color: white;
            line-height: 0.8;
            margin: 5px;
            position: relative;
            z-index: 0;
        `;

        clock.style.cssText = `
            font-size: 2em;
            width: 1.5em;
            height: 1.5em;
            color: white;
            line-height: 0.8;
            margin: 5px;
            position: relative;
            z-index: 0;
        `;

        // Append the elements to the timeBar container
        timeBar.appendChild(pomodoro);
        timeBar.appendChild(clock);

        const pomodoroTimer = document.getElementById('pomodoro');
        const popupContainer = document.getElementById('popupContainer');

        pomodoroTimer.addEventListener('click', (event) => {
            pomodoroMenuOn = !pomodoroMenuOn;

        });
    } else {
        // Remove the pomodoro and clock elements from the timeBar container
        const pomodoro = document.getElementById('pomodoro');
        const clock = document.getElementById('clock');

        if (pomodoro) {
            timeBar.removeChild(pomodoro);
        }

        if (clock) {
            timeBar.removeChild(clock);
        }
    }
});