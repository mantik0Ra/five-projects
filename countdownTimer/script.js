const untilDate = "1 Jan 2023";
const hours = document.getElementById("hours");
const days = document.getElementById("days");
const seconds = document.getElementById("seconds");
const mins = document.getElementById("mins");

function countDownTimer() {
    const currentDate = new Date();
    const untilTime = new Date(untilDate);

    const totalSeconds = ((untilTime - currentDate) / 1000);
    const daysDate = Math.floor(totalSeconds / 3600 / 24);
    const hoursDate = Math.floor(totalSeconds / 3600 % 24);
    const minsDate = Math.floor(totalSeconds / 60 % 24);
    const secondsDate = Math.floor(totalSeconds % 60);
    console.log(daysDate, hoursDate, minsDate, secondsDate)

    hours.innerHTML = hoursDate;
    days.innerHTML = daysDate;
    mins.innerHTML = minsDate;
    seconds.innerHTML = secondsDate;
}

countDownTimer();

setInterval(countDownTimer, 1000);



