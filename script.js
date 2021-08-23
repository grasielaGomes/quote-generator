//Get Quotes from local
import { localQuotes } from "./data/quotes.js";

const quotes = {
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
  loading.showLoader();
  const quote = apiQuotes.length > 0 
    ? apiQuotes[getRandomInt(apiQuotes.length)] 
    : localQuotes[getRandomInt(localQuotes.length)]
  quotes.setAuthor(quote.author);
  quotes.setQuoteText(quote.text);
  changePersona.setSrcPersona();
  loading.complete();
}

// Get Quotes From API
async function getQuotes() {
  loading.showLoader();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    loading.complete();
    localQuotes = apiQuotes;
  } catch(error) {
     throw new Error(`Error in API: ${error}`);
  }
}

//Change persona
const changePersona = {
  persona: document.querySelector('#persona'),
  setSrcPersona: () => {
    const number = getRandomInt(5);
    changePersona.persona.src = `./assets/user${number}.svg`;
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

//Show Loading
const loading = {
  personaContainer: document.querySelector('#persona-container'),
  quoteContainer: document.querySelector('#quote-container'),
  loader: document.querySelector('#loader'),
  showLoader: () => {
    loading.loader.hidden = false;
    loading.personaContainer.hidden = true;
    loading.quoteContainer.hidden = true;
  },
  complete: () => {
    loading.loader.hidden = true;
    loading.personaContainer.hidden = false;
    loading.quoteContainer.hidden = false;
  }
}

//Event Listeners
tweet.twitterBtn.addEventListener('click', tweet.tweetQuote);
quotes.newQuoteBtn.addEventListener('click', newQuote);

//On load
getQuotes();