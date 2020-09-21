// document.getElementById("sub-btn").addEventListener("click", getFormText);

// function getFormText() {

let amount = ""
let ticker = ""
let date = ""

const form = document.querySelector('.form');
// const username = document.querySelector('#username');

form.addEventListener('submit', e => {
  e.preventDefault();

  getInputData()
  display()
});

function getInputData() {
  amount = form.amount.value
  ticker = form.ticker.value
  date = form.date.value
}

function display() {
  console.log(amount);
  console.log(ticker);
  console.log(date);
}
