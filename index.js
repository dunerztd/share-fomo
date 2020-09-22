// document.getElementById("sub-btn").addEventListener("click", getFormText);

// function getFormText() {

let amount = ""
let ticker = ""
let date = ""
let temp = ""
let total_shares_purchased_main
let today_date_main = ""
let today_adjusted_close_main
let total_share_value_main

const form = document.querySelector('.form');
// const username = document.querySelector('#username');

form.addEventListener('submit', e => {
  e.preventDefault();
  removeFomoValue()
  showWaitingMessage()
  getInputData()
  display()
});

function showWaitingMessage () {
    var x = document.getElementById("hidden");
    x.style.display = "block";
}

function hideWaitingMessage () {
  var x = document.getElementById("hidden");
  x.style.display = "none";
}

function getInputData() {
  amount = form.amount.value
  ticker = form.ticker.value
  date = form.date.value
}

function displayFomoValue(x){
  const content = document.querySelector('.fomo_value');
  content.innerHTML = `<h2>Current Value is $${x} USD</h2>`;
}

function removeFomoValue(x){
  const content = document.querySelector('.fomo_value');
  content.innerHTML = ``;
}

function sharesPurchased(x) {
  let amount_to_num = parseFloat(amount)
  let adjusted_close_to_num = parseFloat(x['Time Series (Daily)'][date]['5. adjusted close'])
  let total_shares_purchased = amount_to_num/adjusted_close_to_num
  total_shares_purchased_main = total_shares_purchased
}

function getTodaysDate() {
  let today_date = new Date();
  let dd

  switch(today_date.getDay()) {
    case 0:
      dd = String(today_date.getDate() - 2).padStart(2, '0');
      break;
    case 1:
      dd = String(today_date.getDate() - 3).padStart(2, '0');
      break;
    default:
      dd = String(today_date.getDate() - 1).padStart(2, '0');
  }

  let mm = String(today_date.getMonth() + 1).padStart(2, '0');
  let yyyy = today_date.getFullYear();

  today_date = yyyy + '-' + mm + '-' + dd
  today_date_main = today_date
  console.log(today_date_main);
}

function mostRecentSharePrice(x) {

  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=NT8P50P5AD25XXZW`)
    .then(response => response.json())
    .then((data) => {

      let today_adjusted_close = parseFloat(data['Time Series (Daily)'][today_date_main]['5. adjusted close'])
      today_adjusted_close_main = today_adjusted_close

    })
    .then(todaysShareValue)
    .then(displayFomoValue)


  // let total_value = x * today_adjusted_close

  // return total_value
}


function todaysShareValue() {
  total_share_value_main = total_shares_purchased_main * today_adjusted_close_main
  hideWaitingMessage()
  return parseFloat(total_share_value_main.toFixed(2))
  // console.log(total_shares_purchased_main);
  // console.log(today_adjusted_close_main);
  // console.log(total_share_value_main);
}

function display() {
  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=NT8P50P5AD25XXZW`)
    .then(response => response.json())
    .then(sharesPurchased)
    .then(getTodaysDate)
    .then(mostRecentSharePrice)
    // .then(todaysShareValue)
    // .then(console.log)
}


// Data pulled from API
// function that takes data and extracts data points
// apply logic
// show on screen

// Tuesday - Change todays date to format of JSON date (2020-09-02 instead of 2020-9-02)