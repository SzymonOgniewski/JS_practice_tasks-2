import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const pickedDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-reset');
const htmlMinutes = document.querySelector('[data-minutes]');
const htmlSeconds = document.querySelector('[data-seconds]');
const htmlDays = document.querySelector('[data-days]');
const htmlHours = document.querySelector('[data-hours]');
const values = document.querySelectorAll('.value');

let remainingTime = () => {
  let timeLeft = Date.parse(pickedDate.value) - Date.now();
  const seconds = convertMs(timeLeft).seconds;
  const days = convertMs(timeLeft).days;
  const hours = convertMs(timeLeft).hours;
  const minutes = convertMs(timeLeft).minutes;
  htmlSeconds.innerHTML = `${seconds}`;
  htmlDays.innerHTML = `${days}`;
  htmlMinutes.innerHTML = `${minutes}`;
  htmlHours.innerHTML = `${hours}`;
  values.forEach(value => {
    if (value.innerHTML.length < 2) {
      value.innerHTML = value.innerHTML.padStart(2, '0');
    }
  });
  if (timeLeft <= 0) {
    clearInterval(timerId);
    htmlSeconds.innerHTML = '00';
    htmlDays.innerHTML = '00';
    htmlMinutes.innerHTML = '00';
    htmlHours.innerHTML = '00';
    Notiflix.Notify.info('Countdown has ended!', {
      position: 'center-top',
    });
  }
};

pickedDate.addEventListener('change', () => {
  if (Date.now() > Date.parse(pickedDate.value)) {
    startBtn.setAttribute('disabled', '');
    Notiflix.Notify.failure(
      'Unable to count down, please choose date from the future',
      {
        position: 'center-top',
      }
    );
  } else {
    startBtn.removeAttribute('disabled', '');
    Notiflix.Notify.success('Chosen date is correct, press START', {
      position: 'center-top',
    });
  }
});
let timerId = null;

startBtn.addEventListener('click', () => {
  if (Date.now() > Date.parse(pickedDate.value)) {
    startBtn.setAttribute('disabled', '');
    Notiflix.Notify.failure(
      'Unable to count down, please choose date from the future',
      {
        position: 'center-top',
      }
    );
  } else if (Date.now() < Date.parse(pickedDate.value)) {
    startBtn.removeAttribute('disabled', '');
    timerId = setInterval(remainingTime, 1000);
    startBtn.setAttribute('disabled', '');
    resetBtn.removeAttribute('disabled', '');
  }
});
resetBtn.setAttribute('disabled', '');
resetBtn.addEventListener('click', () => {
  clearInterval(timerId);
  resetBtn.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled', '');
  htmlSeconds.innerHTML = '00';
  htmlDays.innerHTML = '00';
  htmlMinutes.innerHTML = '00';
  htmlHours.innerHTML = '00';
});
