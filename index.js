// document.getElementById("sub-btn").addEventListener("click", getFormText);

// function getFormText() {

let amount = ""
let ticker = ""
let date = ""
let total_shares_purchased_main
let today_adjusted_close_main
let total_share_value_main

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  removePreviousQuery()
  showWaitingMessage()
  getInputData()
  getData()
});

function removePreviousQuery(x) {
  const content = document.querySelector('.fomo_value');
  content.innerHTML = ``;
  // also removes profit_loss value
  document.getElementById("profit_loss").innerHTML = ``
}

function showWaitingMessage() {
  var x = document.getElementById("waiting");
  x.classList.remove('d-none')
}

function getInputData() {
  amount = form.amount.value
  ticker = form.ticker.value
  date = form.date.value
}

function hideWaitingMessage() {
  var x = document.getElementById("waiting");
  x.classList.add('d-none')
}

function adjustDateAccordingToDayOfWeek(date) {

  switch (date.getDay()) {
    case 0:
      return date.setDate(date.getDate() - 2);
    case 1:
      return date.setDate(date.getDate() - 3);
    default:
      return date.setDate(date.getDate() - 1);
  }
}

function getData() {
  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=NT8P50P5AD25XXZW`)
    .then(response => response.json())
    .then(wrapperFunction)
    .then(todaysShareValue)
    .then(displayFomoValue)
    .then(displayProfitOrLoss)
}

function wrapperFunction(response) {
  sharesPurchased(response)
  mostRecentSharePrice(response) 
}


function sharesPurchased(x) {
  let amount_to_num = parseFloat(amount)
  let adjusted_close_to_num = parseFloat(x['Time Series (Daily)'][getMostRecentMarketCloseDate(date)]['5. adjusted close'])
  let total_shares_purchased = amount_to_num / adjusted_close_to_num
  total_shares_purchased_main = total_shares_purchased
}

function mostRecentSharePrice(x) {
  let today_adjusted_close = parseFloat(x['Time Series (Daily)'][getMostRecentMarketCloseDate()]['5. adjusted close'])
  today_adjusted_close_main = today_adjusted_close
}

function todaysShareValue() {
  total_share_value_main = total_shares_purchased_main * today_adjusted_close_main
  hideWaitingMessage()
  return parseFloat(total_share_value_main.toFixed(2))
}

function getMostRecentMarketCloseDate(buy_date) {

  if (typeof buy_date === 'undefined' || buy_date === null) {
    d = new Date()
  } else {
    d = new Date(buy_date)
  }

  adjustDateAccordingToDayOfWeek(d)

  let dd = String(d.getDate()).padStart(2, '0');
  let mm = String(d.getMonth() + 1).padStart(2, '0');
  let yyyy = d.getFullYear();

  let result = yyyy + '-' + mm + '-' + dd
  return result
}

function displayFomoValue(x) {
  const content = document.querySelector('.fomo_value');
  content.innerHTML = `<h2>Your shares are now worth $${x} USD</h2>`;
}

function displayProfitOrLoss() {
  let content = document.getElementById("profit_loss")
  let profit_loss = total_share_value_main - amount

  if (profit_loss > 0) {
    content.innerHTML = `<p class="profit">That's a profit of $ ${profit_loss.toFixed(2)}</p>
    <div class="row justify-content-center" >
          <img src="profit.webp" alt="" class="src">
        </div>`
  } else {
    profit_loss = Math.abs(profit_loss)
    content.innerHTML = `<p class="loss">That's a loss of $ ${profit_loss.toFixed(2)}</p>
    <div class="row justify-content-center" >
          <img src="loss.webp" alt="" class="src">
        </div>`
  }
}