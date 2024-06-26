require.config({
  paths: {
    axios: "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min"
  }
});

require(["axios"], function (axios) {
  async function getApiKey() {
    const response = await fetch("/.netlify/functions/getApiKey");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.apiKey;
  }

  async function generatePoem(event) {
    event.preventDefault();

    let poemElement = document.querySelector("#poem");
    poemElement.style.setProperty("display", "block");
    poemElement.innerHTML = `<dotlottie-player
            src="https://lottie.host/2b956c1a-7c39-40c9-83e6-e0fec54533ec/haODh86Q6v.json"
            background="transparent"
            speed="1"
            style="width: 70px; height: 70px"
            loop
            autoplay
        ></dotlottie-player>`;

    let apiKey;
    try {
      apiKey = await getApiKey();
    } catch (error) {
      console.error("Error fetching API key:", error);
      poemElement.innerHTML =
        '<p class="error">Failed to load API key. Please try again later.</p>';
      return;
    }

    let poemType = document.querySelector("#poem-types");
    let language = document.querySelector("#language-select");
    let context = `You are an AI literature expert that enjoys writing poems. Your mission is to create unique poems that will be displayed in basic HTML format. Follow the example: <p>This is the first verse</p>. Pay attention to the user instructions. Sign SheCodes AI inside <p> element with the class="signature" at the bottom of the poem.`;
    let prompt = `User instructions: Generate a ${poemType.value} poem in the ${
      language.value
    } language about the topic: ${
      document.querySelector("#search-input").value
    }`;
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    axios.get(apiUrl).then(showPoem);
  }

  function showPoem(response) {
    new Typewriter("#poem", {
      strings: `${response.data.answer}`,
      autoStart: true,
      delay: 65,
      cursor: null
    });
  }

  let poemForm = document.querySelector("#poem-generator-form");
  poemForm.addEventListener("submit", generatePoem);
});
