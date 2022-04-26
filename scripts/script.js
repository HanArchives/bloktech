/* Rewrite these variables to let/const. 
	If you want, you can change the string syntax to template literals */
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
