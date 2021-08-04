// VARIABLES FOR MANIPULATING TIME
const startButton = document.querySelector('[data-start-btn]');
const playPauseButton = document.querySelector('[data-play-pause-btn]');
const stopButton = document.querySelector('[data-stop-btn]');
const resetButton = document.querySelector('[data-reset-btn]');

// VARIABLE TO DISPLAY THE COUNTDOWN
const sessionCountdown = document.getElementById('session-countdown');
const breakCountdown = document.getElementById('break-countdown');
const sm = document.getElementById('sm');
const ss = document.getElementById('ss');
const bm = document.getElementById('bm');
const bs = document.getElementById('bs');

// VARIABLES FOR CONTAINING THE TIME FOR EACH INTERVAL
const currentClockName = document.getElementById('current-name');
const sessionTime = document.getElementById('session-time');
const breakTime = document.getElementById('break-time');

// VARIABLES FOR INCREASING OR DECREASING TIME
const sessionMinusButton = document.querySelector('[data-session-minus]');
const sessionPlusButton = document.querySelector('[data-session-plus]');
const breakMinusButton = document.querySelector('[data-break-minus]');
const breakPlusButton = document.querySelector('[data-break-plus]');

// EVENTS FOR SETTING THE USER DESIRED TIME
sessionMinusButton.addEventListener('click', decreaseSessionTime);
sessionPlusButton.addEventListener('click', increaseSessionTime);
breakMinusButton.addEventListener('click', decreaseBreakTime);
breakPlusButton.addEventListener('click', increaseBreakTime);

// EVENTS FOR MANIPULATING THE TIME
startButton.addEventListener('click', startCountDown);
playPauseButton.addEventListener('click', playPauseCountDown);
stopButton.addEventListener('click', stopCountDown);
resetButton.addEventListener('click', resetCountDown);

// TO KEEP THE COUNT FOR UPDATING THE TIME DYNAMICALLY
let sessionTimeCount = 0, breakTimeCount = 0;
let startTimer, time, pauseTime;

function decreaseSessionTime() {
    if (sessionTimeCount === 0)
        return alert('Time is not allowed to be taken in negative');
    sessionTime.innerText = (sessionTimeCount - 1 === 1 || sessionTimeCount - 1 === 0) ? --sessionTimeCount + " min" : --sessionTimeCount + " mins";
}

function increaseSessionTime() {
    sessionTime.innerText = (sessionTimeCount + 1 === 1) ? ++sessionTimeCount + " min" : ++sessionTimeCount + " mins";
}

function decreaseBreakTime() {
    if (breakTimeCount === 0)
        return alert('Time is not allowed to be taken in negative');
    breakTime.innerText = (breakTimeCount - 1 === 1 || breakTimeCount - 1 === 0) ? --breakTimeCount + " min" : --breakTimeCount + " mins";
}

function increaseBreakTime() {
    breakTime.innerText = (breakTimeCount + 1 === 1) ? ++breakTimeCount + " min" : ++breakTimeCount + " mins";
}

function startCountDown() {
    updateSessionCountdown();
}

function updateSessionCountdown() {
    if (sessionTimeCount > 0 && startTimer === undefined && breakTimeCount > 0) {
        let minuteStr = sessionTime.innerText.split(' ')[0];
        sm.innerText = (parseInt(minuteStr) < 10) ? '0' + minuteStr : minuteStr;
        time = parseInt(minuteStr) * 60;
        ss.innerText = '00';
        currentClockName.innerText = 'Session';
        startTimer = setInterval(updateCountdownI, 1000);
    } else if (startTimer !== undefined) {
        return alert('Timer has already started.');
    } else {
        return alert('Please provide a valid Time for both Session and Break as well');
    }
}

function updateCountdownI() {
    if (pauseTime === undefined) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);

        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        sm.innerText = minutes;
        ss.innerText = seconds;
        time--;
        time = (time < 0) ? 0 : time;
        if (time === 0) {
            ss.innerText = '00';
            clearInterval(startTimer);
            startTimer = undefined;
            sessionCountdown.classList.add('hide');
            breakCountdown.classList.remove('hide');
            breakCountdown.style.color = "red";
            sessionTime.innerText = '00';
            updateBreakCountdown();
        }
    } else {
        console.log('Countdown is paused now, click start to play it back.');
    }
}

function updateBreakCountdown() {
    if (startTimer === undefined) {
        let minuteStr = breakTime.innerText.split(' ')[0];
        bm.innerText = (parseInt(minuteStr) < 10) ? '0' + minuteStr : minuteStr;
        time = parseInt(minuteStr) * 60;
        bs.innerText = '00';
        currentClockName.innerText = 'Break';
        startTimer = setInterval(updateCountdownII, 1000);
    } else if (startTimer !== undefined) {
        return alert('Timer has already started.');
    }
}

function updateCountdownII() {
    if (pauseTime === undefined) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);

        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        bm.innerText = minutes;
        bs.innerText = seconds;
        time--;
        time = (time < 0) ? 0 : time;
        if (time === 0) {
            bs.innerText = '00';
            clearInterval(startTimer);
            sessionCountdown.classList.remove('hide');
            breakCountdown.classList.add('hide');
            breakTime.innerText = '00';
        }
    } else {
        console.log('Countdown is paused now, click start to play it back.');
    }
}

function playPauseCountDown() {
    if (pauseTime === undefined) {
        pauseTime = true;
    } else if (pauseTime === true) {
        pauseTime = undefined;
    }
}

function stopCountDown() {
    clearInterval(startTimer);
    startTimer = undefined;
}

function resetCountDown() {
    sm.innerText = '00';
    ss.innerText = '00';
    bm.innerText = '00';
    bs.innerText = '00';
}