let interval;
let startTime;
let lapStartTime;
let lapNumber = 1;

function startStopwatch() {
    startTime = Date.now() - (lapStartTime || 0);
    lapStartTime = 0;
    interval = setInterval(updateStopwatch, 10);
    toggleButtons('start');
}

function stopStopwatch() {
    clearInterval(interval);
    lapStartTime = Date.now() - startTime;
    toggleButtons('stop');
}

function resetStopwatch() {
    clearInterval(interval);
    lapNumber = 1;
    lapStartTime = 0;
    document.querySelector('.display').textContent = '00:00:00.00';
    document.querySelector('.lap-list').innerHTML = '';
    toggleButtons('reset');
}

function updateStopwatch() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.querySelector('.display').textContent = formattedTime;
}

function recordLap() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapNumber}: ${formattedTime}`;
    document.querySelector('.lap-list').appendChild(lapItem);
    lapNumber++;
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

function toggleButtons(action) {
    const startButton = document.querySelector('.start');
    const stopButton = document.querySelector('.stop');
    const resetButton = document.querySelector('.reset');
    const lapButton = document.querySelector('.lap');

    if (action === 'start') {
        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = true;
        lapButton.disabled = false;
    } else if (action === 'stop') {
        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = false;
        lapButton.disabled = true;
    } else if (action === 'reset') {
        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = true;
        lapButton.disabled = true;
    }
}