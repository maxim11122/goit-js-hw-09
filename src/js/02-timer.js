import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDataEl = document.querySelector('input[type="text"]');
const buttonStartEl = document.querySelector('button[data-start]');
const dataBox = document.querySelector('.timer');
const emoji = String.fromCodePoint(0x1f621);

let diff = null;
buttonStartEl.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      buttonStartEl.setAttribute('disabled', 'disabled');
      Notiflix.Report.failure(
        `Ohhhh...${emoji}`,
        'Please choose a date in the future',
        'Alona, try again!!!'
      );
    } else {
      buttonStartEl.removeAttribute('disabled');
    }
    diff = selectedDates[0] - new Date();
  },
};

flatpickr(inputDataEl, options);

buttonStartEl.addEventListener('click', () => {
  let setIntervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(diff);
    diff -= 1000;
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
    dataBox.style.color = getRandomHexColor();
    dataBox.style.backgroundColor = getRandomHexColor();
    function addLeadingZero(value) {
      if (value > 99) {
        return String(value);
      }
      return String(value).padStart(2, '0');
    }
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(setIntervalId);
      return;
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}