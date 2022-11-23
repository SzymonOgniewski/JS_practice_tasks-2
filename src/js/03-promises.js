import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  console.log(shouldResolve);

  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      );
      // Fulfill
    } else {
      reject(
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
      // Reject
    }
  });
}
console.log(createPromise(1, 1500));

// form.addEventListener('sumbit', () => {
//   preventDefault();
//   const { elements:{startDelay, stepDelay, amount} = event.currentTarget}
//   setTimeout(() => {
//     let i = 1

//     while (i <= amount) {
//       position === i;
//       i++
//       createPromise(delay===stepDelay)
//     }
//   },startDelay);
// });
