//Get Quotes from local
import { localQuotes } from "./data/quotes.js";

let apiQuotes = [];

//Get Random Int
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Show New Quote
function newQuote() {
  const quote = apiQuotes.length > 0 
    ? apiQuotes[getRandomInt(apiQuotes.length)] 
    : localQuotes[getRandomInt(localQuotes.length)]
  console.log(quote);
}

// Get Quotes From API
async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch(error) {
    console.log(error);
  }
}

window.onload = newQuote();