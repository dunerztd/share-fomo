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

function sharesPurchases(x) {
  let amount_to_num = parseFloat(amount)
  let adjusted_close_to_num = parseFloat(x['Time Series (Daily)'][date]['5. adjusted close'])
  let total_shares_purchased = amount_to_num/adjusted_close_to_num
  return total_shares_purchased
}

function currentSharePrice(x) {
  var today = new Date();

  var today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  console.log(today_date);

  let today_adjusted_close = parseFloat(x['Time Series (Daily)'][today_date]['5. adjusted close'])

  console.log(x['Time Series (Daily)'][today_date]);

  // let total_value = x * today_adjusted_close

  // return total_value
}

function display() {
  // console.log(amount);
  // console.log(date);
  // console.log(date);
  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=NT8P50P5AD25XXZW`)
    .then(response => response.json())
    .then(sharesPurchases)  
    .then(currentSharePrice)
    // .then(console.log)
}


// Data pulled from API
// function that takes data and extracts data points
// apply logic
// show on screen