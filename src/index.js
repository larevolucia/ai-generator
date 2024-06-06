function generatePoem(event) {
  event.preventDefault();

  let poemElement = document.querySelector("#poem");
  poemElement.style.setProperty("display", "block");

  let formInput = document.querySelector("#search-input");
  console.log(formInput.value);

  new Typewriter("#poem", {
    strings: `${formInput.value}`,
    autoStart: true,
    cursor: null
  });
}

let poemForm = document.querySelector("#poem-generator-form");
poemForm.addEventListener("submit", generatePoem);
