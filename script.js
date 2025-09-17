let url = "https://v6.exchangerate-api.com/v6/763041fd24d3326a958a1e96/latest/USD";
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");

// Populate 'from' dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
});

// Populate 'to' dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

// Default selections
fromDropDown.value = "USD";
toDropDown.value = "INR";

let convertCurrency = () => {
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (amount.length !== 0) {
    // Get exchange rates for selected base
    fetch(`https://v6.exchangerate-api.com/v6/763041fd24d3326a958a1e96/latest/${fromCurrency}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.conversion_rates || !data.conversion_rates[toCurrency]) {
          result.innerHTML = "Currency not supported.";
          return;
        }
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = amount * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
      })
      .catch(() => {
        result.innerHTML = "Error fetching exchange rates.";
      });
  } else {
    alert("Please fill in the amount");
  }
};

document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);





