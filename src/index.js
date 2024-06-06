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
  let context = `You are an AI literature expert that enjoys writting poems. Your mission is to create unique poems that will be displayed in basic HTML format. Follow the example: <p>This is the first verse</p>. Pay attention to the user instructions. Sign SheCodes AI inside <p> element with the class="signature" at the bottom of the poem.`;
  let prompt = `User instructions: Generate a ${poemType.value} about ${
    document.querySelector("#search-input").value
  }  in Brazilian Portuguese`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  console.log(
    `Generating ${poemType.value} about ${
      document.querySelector("#search-input").value
    }`
  );

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
