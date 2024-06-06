function generatePoem(event) {
  event.preventDefault();

  let poemElement = document.querySelector("#poem");
  poemElement.style.setProperty("display", "block");

  new Typewriter("#poem", {
    strings: "Generating poem...",
    autoStart: true,
    delay: 1.5,
    cursor: null
  });

  // AI API //
  let apiKey = "ab8aa73684ae7b075f37aoat0358dd04";
  let context =
    "You are an AI assistant that generates poems in Brazilian portuguese. Poems should be given in HTML format. Poems mustn't have titles and must contain at least 3 lines.";
  let prompt = document.querySelector("#search-input").value;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
  console.log(prompt);

  axios.get(apiUrl).then(showPoem);
}

function showPoem(response) {
  console.log(response.data.answer);
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
