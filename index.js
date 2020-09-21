// document.getElementById("sub-btn").addEventListener("click", getFormText);

// function getFormText() {

let amount = ""
let ticker = ""
let date = ""
let temp = ""

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
  // console.log(amount);
  console.log(ticker);
  // console.log(date);
  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=NT8P50P5AD25XXZW`)
  .then(response => response.json())
  .then(data => JSON.parse(data))
  .then(data => temp = data)
  
  console.log(temp)
}