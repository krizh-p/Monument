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
            if (pomodoroMenuOn) {
                // Hide the pop-up container
                popupContainer.style.display = 'none';
            } else {
                popupContainer.style.display = 'block'; // Show the pop-up container
                showPomodoro()
            }
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

        if (popupContainer.style.display == 'block') {
            popupContainer.style.display = 'none'
        }
    }
});

function closePomodoro() {

}

// Give popupContainer children.
var pomodoroOpened = false
function showPomodoro() {

    if (!pomodoroOpened) { // If the timer hasn't started
        pomodoroOpened = !pomodoroOpened
        // Create the timer element
        const timer = document.createElement('h1');
        timer.textContent = '25:00:00';
        timer.style.textAlign = 'center';
        timer.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
        timer.style.fontSize = "5em"
        
        // Create the start/stop button
        const startStopButton = document.createElement('button');
        startStopButton.textContent = 'Start';
        startStopButton.style.display = 'block';
        startStopButton.style.margin = '0 auto';
        startStopButton.style.fontSize = "3em"
    
        timer.classList.add("popupContent")
        startStopButton.classList.add("popupContent")
        // Append the timer and start/stop button to the popup container
        popupContainer.appendChild(timer);
        popupContainer.appendChild(startStopButton);
    
        // Handle the click event on the start/stop button
        let interval;
        let timeLeft = getTimeRemaining(25, 0, 0);
        startStopButton.addEventListener('click', () => {
            if (interval) {
                // Stop the timer
                clearInterval(interval);
                interval = null;
            } else {
                // Start the timer
                interval = setInterval(() => {
                    timeLeft--;
                    const hours = Math.floor(timeLeft / 3600);
                    const minutes = Math.floor((timeLeft % 3600) / 60);
                    const seconds = timeLeft % 60;
                    timer.textContent = `${hours}:${minutes}:${seconds}`;
                }, 1000);
            }
        });


    }
}