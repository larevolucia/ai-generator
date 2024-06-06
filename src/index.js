function generatePoem(event) {
  event.preventDefault();

  //Select poem element //

  let poemElement = document.querySelector("#poem");

  //Display loading //

  poemElement.style.setProperty("display", "block");
  poemElement.innerHTML = `<dotlottie-player
      src="https://lottie.host/2b956c1a-7c39-40c9-83e6-e0fec54533ec/haODh86Q6v.json"
      background="transparent"
      speed="1"
      style="width: 70px; height: 70px"
      loop
      autoplay
    ></dotlottie-player>`;

  // call AI API //

  let apiKey = "ab8aa73684ae7b075f37aoat0358dd04";
  let poemType = document.querySelector("#poem-types");
  let context = `You are an AI assistant that generates poems. Please, create a ${poemType.value} in Brazilian Portuguese. Poems shall be displayed in HTML format, following the example: <p>This is a verse</p>`;
  let prompt = document.querySelector("#search-input").value;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  console.log(`Generating ${poemType.value} about ${prompt}`);

  axios.get(apiUrl).then(showPoem);
}

function showPoem(response) {
  console.log(response.data);

  new Typewriter("#poem", {
    strings: `${response.data.answer}`,
    autoStart: true,
    delay: 65,
    cursor: null
  });
}

//Generate Poem from Input //

let poemForm = document.querySelector("#poem-generator-form");
poemForm.addEventListener("submit", generatePoem);
