/// //////////////
// Menu Button //
/// //////////////
const openButton = document.querySelector('.open-info');
const closeButton = document.querySelector('.close-info');
const menu = document.querySelector('nav');

const closeMenu = () => {
  menu.classList.remove('is-open');
};
closeButton.addEventListener('click', closeMenu);

const openMenu = () => {
  menu.classList.add('is-open');
};
openButton.addEventListener('click', openMenu);

////////////////
// Select All //
////////////////
const selectAllButtonOne = document.querySelector('.select-all-one');
const selectAllButtonTwo = document.querySelector('.select-all-two');
const selectAllButtonThree = document.querySelector('.select-all-three');

function checkAll(selector) {
  // variabel checboxes heeft parameter selector. Dus selecteerd alles
  const checkboxes = document.querySelectorAll(selector);
  for (const checkbox of checkboxes) {
    //! betekend het omgekeerde van true/false dit zorgt ervoor dat het allemaal selecteerd en deselecteerd
    checkbox.checked = !checkbox.checked;
  }
}

selectAllButtonOne.addEventListener('click', () => {
  // parameter die je mee geeft aan functie checkAll
  checkAll('.question-1 input[type="checkbox"]');
});

selectAllButtonTwo.addEventListener('click', () => {
  checkAll('.question-2 input[type="checkbox"]');
});

selectAllButtonThree.addEventListener('click', () => {
  checkAll('.question-3 input[type="checkbox"]');
});

/// ///////////////////////////////////
// Progresive enhancement/disclosure //
/// ///////////////////////////////////
const buttonNextQuestionAge = document.querySelector('.btn-next-1');
const buttonNextQuestionSize = document.querySelector('.btn-next-2');
const questionOne = document.querySelector('.first');
const questionTwo = document.querySelector('.second');
const questionThree = document.querySelector('.third');
//const buttonSubmit = document.querySelector('.btn-submit');

// Onclick show and scroll to next question
buttonNextQuestionAge.addEventListener('click', () => {
  questionTwo.style.display = 'block';
  questionTwo.scrollIntoView({ behavior: 'smooth' });
});

buttonNextQuestionSize.addEventListener('click', () => {
  questionThree.style.display = 'block';
  questionThree.scrollIntoView({ behavior: 'smooth' });
});

// hide question 2 and 3 (add class) if js is on
// asynch multiple task at the same time / synch per task
function hideSections() {
  questionTwo.classList.add('hide');
  questionThree.classList.add('hide');
}

window.addEventListener('load', hideSections);

// show select all button if JS is on
function hideButtons() {
  selectAllButtonOne.classList.add('show');
  selectAllButtonTwo.classList.add('show');
  selectAllButtonThree.classList.add('show');
}

window.addEventListener('load', hideButtons);

// Next button vissible onClick
questionOne.addEventListener('click', () => {
  buttonNextQuestionAge.style.visibility = 'visible';
  buttonNextQuestionAge.style.opacity = '1';
});

questionTwo.addEventListener('click', () => {
  buttonNextQuestionSize.style.visibility = 'visible';
  buttonNextQuestionSize.style.opacity = '1';
});

// Temporary visibility Submit button on hold.
// questionThree.addEventListener('click', () => {
//   buttonSubmit.style.visibility = 'visible';
//   buttonSubmit.style.opacity = '1';
// });

// prevent buttons in questionnaire from submitting
const buttons = document.querySelectorAll('.questionnaire button');

buttons.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
  });
});

//////////////////////
// API random image //
//////////////////////
async function fetchImage() {
  const url = 'https://random.dog/woof.json';
  let response = await fetch(url);
  // console.log(response);
  let image = await response.json();
  // console.log(data);
  let randomImage = document.querySelector('.random-image');
  randomImage.innerHTML = `<img src="${image.url}" alt="doggo"/>`;
}

fetchImage();

///////////////////////
// API random quotes //
///////////////////////
async function fetchQuote() {
  const url = 'https://cat-fact.herokuapp.com/facts/random';
  let response = await fetch(url);
  // console.log(response);
  let quote = await response.json();
  // console.log(data);
  let randomQuote = document.querySelector('.random-quote');
  randomQuote.innerHTML = quote.text;
}

fetchQuote();
