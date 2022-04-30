/////////////////
// Menu Button //
/////////////////
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
const selectButtonOne = document.querySelector('.select-all-one');
const selectButtonTwo = document.querySelector('.select-all-two');
const selectButtonThree = document.querySelector('.select-all-three');

selectButtonOne.addEventListener('click', () => {
  checkAll('.question-1 input[type="checkbox"]'); //parameter die je mee geeft aan functie checkAll
});

selectButtonTwo.addEventListener('click', () => {
  checkAll('.question-2 input[type="checkbox"]'); //parameter die je mee geeft aan functie checkAll
});

selectButtonThree.addEventListener('click', () => {
  checkAll('.question-3 input[type="checkbox"]'); //parameter die je mee geeft aan functie checkAll
});

function checkAll(selector) {
  const checkboxes = document.querySelectorAll(selector); //variabel checboxes heeft parameter selector. Dus selecteerd alles
  for (const checkbox of checkboxes) {
    checkbox.checked = !checkbox.checked; //! betekend het omgekeerde van true/false dit zorgt ervoor dat het allemaal selecteerd en deselecteerd
  }
}
