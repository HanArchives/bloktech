//////////////////////
// API random image //
//////////////////////
async function fetchImage() {
  const url = 'https://random.dog/woof.json';
  let response = await fetch(url);

  let image = await response.json();

  let randomImage = document.querySelector('.random-image');
  randomImage.innerHTML = `<img src="${image.url}" alt="doggo"/>`;
}

fetchImage();
