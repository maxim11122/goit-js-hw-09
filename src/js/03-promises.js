import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const firstDelayEl = document.querySelector('input[name="delay"]');
const stepDelayEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
const emojiFail = String.fromCodePoint(0x1f621);
const emojiOk = String.fromCodePoint(0x1f604);

let time = 0;
let step = 0;
let amount = 0;
let count = 0;

function createPromise(count, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          count,
          delay,
        });
      } else {
        reject({
          count,
          delay,
        });
      }
    }, delay);
  });
}

formEl.addEventListener('submit', ev => {
  ev.preventDefault();
  time = firstDelayEl.valueAsNumber;
  step = stepDelayEl.valueAsNumber;
  amount = amountEl.valueAsNumber;
  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => {
      count += 1;
      createPromise(count, time)
        .then(({ count, delay }) => {
          Notiflix.Notify.success(
            `${emojiOk} Fulfilled promise ${count} in ${delay}ms`
          );
        })
        .catch(({ count, delay }) => {
          Notiflix.Notify.failure(
            `${emojiFail} Rejected promise ${count} in ${delay}ms`
          );
        });
      time += step;
    }, time);
    count = 0;
  }
});