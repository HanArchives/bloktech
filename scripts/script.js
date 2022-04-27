// Menu button
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

// Select all
document.getElementById('select-all').onclick = function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (const checkbox of checkboxes) {
    checkbox.checked = this.checked;
  }
};
