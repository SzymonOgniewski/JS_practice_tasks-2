function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;

startBtn.addEventListener('click', () => {
  // dodatkowe zabezpieczonko
  clearInterval(timerId);
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled', '');
  timerId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  // console.log(`Interval with id ${timerId} has started!`);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  // console.log(`Interval with id ${timerId} has stopped!`);
  stopBtn.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled', '');
});
