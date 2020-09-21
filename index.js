// document.getElementById("sub-btn").addEventListener("click", getFormText);

// function getFormText() {

let amount = ""
let ticker = ""
let date = ""
let temp = ""
let total_shares_purchased_main
let today_date_main = ""

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

function sharesPurchased(x) {
  let amount_to_num = parseFloat(amount)
  let adjusted_close_to_num = parseFloat(x['Time Series (Daily)'][date]['5. adjusted close'])
  let total_shares_purchased = amount_to_num/adjusted_close_to_num
  total_shares_purchased_main = total_shares_purchased
}

function getTodaysDate() {
  let today = new Date();
  let today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  console.log(today_date);
  today_date_main = today_date
}

function currentSharePrice(x) {

  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=NT8P50P5AD25XXZW`)
    .then(response => response.json())
    .then((data) => {
      console.log(today_date_main);
      console.log(data);
      let today_adjusted_close = parseFloat(data['Time Series (Daily)'][today_date_main]['5. adjusted close'])
      // console.log(x['Time Series (Daily)'][today_date]);
      
      console.log(today_adjusted_close);
    })



  // let total_value = x * today_adjusted_close

  // return total_value
}

function display() {
  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=NT8P50P5AD25XXZW`)
    .then(response => response.json())
    .then(sharesPurchased)
    .then(getTodaysDate)
    .then(currentSharePrice)
    // .then(console.log)
}


// Data pulled from API
// function that takes data and extracts data points
// apply logic
// show on screen

// Tuesday - Change todays date to format of JSON date (2020-09-02 instead of 2020-9-02)