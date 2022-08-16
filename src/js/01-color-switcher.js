const bodyEl = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
startButton.addEventListener('click', changeColor);
stopButton.addEventListener('click', stopChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor(ev) {
  setIntervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);

  ev.currentTarget.setAttribute('disabled', 'disabled');
  stopButton.removeAttribute('disabled');
};

function stopChangeColor (ev) {
  ev.currentTarget.setAttribute('disabled', 'disabled');
  startButton.removeAttribute('disabled');
  clearInterval(setIntervalId);
};
