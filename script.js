//Get Quotes from local
import { localQuotes } from "./data/quotes.js";

const quotes = {
  quoteContainer: document.querySelector('#quote-container'),
  quoteText: document.querySelector('#quote'),
  authorText: document.querySelector('#author'),
  newQuoteBtn: document.querySelector('#new-quote'),
  setAuthor: value => quotes.authorText.textContent = value || 'Anonymous',
  setQuoteText: value => quotes.quoteText.textContent = value
}

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
  quotes.setAuthor(quote.author);
  quotes.setQuoteText(quote.text);
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

//Tweet Quote
const tweet =  {
  twitterBtn: document.querySelector('#twitter'),
  tweetQuote: () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes.quoteText.textContent} - ${quotes.authorText.textContent}`;
  open(twitterUrl, '_blank');
  }
}

//Event Listeners
tweet.twitterBtn.addEventListener('click', tweet.tweetQuote);
quotes.newQuoteBtn.addEventListener('click', newQuote);

//On load
getQuotes();