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

/// /////////////
// Select All //
/// /////////////
const selectAllButtonOne = document.querySelector('.select-all-one');
const selectAllButtonTwo = document.querySelector('.select-all-two');
const selectAllButtonThree = document.querySelector('.select-all-three');

function checkAll(selector) {
  const checkboxes = document.querySelectorAll(selector); // variabel checboxes heeft parameter selector. Dus selecteerd alles
  for (const checkbox of checkboxes) {
    checkbox.checked = !checkbox.checked; //! betekend het omgekeerde van true/false dit zorgt ervoor dat het allemaal selecteerd en deselecteerd
  }
}

selectAllButtonOne.addEventListener('click', () => {
  checkAll('.question-1 input[type="checkbox"]'); // parameter die je mee geeft aan functie checkAll
});

selectAllButtonTwo.addEventListener('click', () => {
  checkAll('.question-2 input[type="checkbox"]'); // parameter die je mee geeft aan functie checkAll
});

selectAllButtonThree.addEventListener('click', () => {
  checkAll('.question-3 input[type="checkbox"]'); // parameter die je mee geeft aan functie checkAll
});

/// ///////////////////////////////////
// Progresive enhancement/disclosure //
/// ///////////////////////////////////
const buttonNextQuestionAge = document.querySelector('.btn-next-1');
const buttonNextQuestionSize = document.querySelector('.btn-next-2');
const buttonSubmit = document.querySelector('.btn-submit');
const questionOne = document.querySelector('.first');
const questionTwo = document.querySelector('.second');
const questionThree = document.querySelector('.third');

// Onclick show and scroll to next question
buttonNextQuestionAge.addEventListener('click', () => {
  questionTwo.style.display = 'block';
  questionTwo.scrollIntoView({ behavior: 'smooth' });
});

buttonNextQuestionSize.addEventListener('click', () => {
  questionThree.style.display = 'block';
  questionThree.scrollIntoView({ behavior: 'smooth' });
});

// hide question 2 and 3 (add class)
function hideSections() {
  questionTwo.classList.add('hide');
  questionThree.classList.add('hide');
}

window.addEventListener('load', hideSections);

// Next button vissible onClick
questionOne.addEventListener('click', () => {
  buttonNextQuestionAge.style.visibility = 'visible';
});

questionTwo.addEventListener('click', () => {
  buttonNextQuestionSize.style.visibility = 'visible';
});

questionThree.addEventListener('click', () => {
  buttonSubmit.style.visibility = 'visible';
});

// database moet de geselecteerde kunnen opslaan. 1 formulier posten.
// metod post app.post.results
// req.body.male true of false
//
