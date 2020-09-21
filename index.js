// document.getElementById("sub-btn").addEventListener("click", getFormText);

// function getFormText() {

// }

const form = document.querySelector('.form');
// const username = document.querySelector('#username');

form.addEventListener('submit', e => {
  e.preventDefault();
  // console.log('form submitted');
  // console.log(username.value);
  console.log(typeof(form.amount.value));
  console.log(typeof(form.ticker.value));
  console.log(typeof(form.date.value));
});