let pokemonNames = [];
let currentPokemon;
let statNames = [];
let statValues = [];
let offset = 0;
let allpokemonNames = [];
let filteredPokemons = [];
let firstIndex = -20;
let lastIndex = 0;
// let pokemonData = [];

// Creat array allpokemonNames

async function fetchAndPushNames() {
  let info = await fetchInfo();
  pushNames(info);
}

async function fetchInfo() {
  let urlAllPokemon = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  let nameAndUrlOfAllPokemon = await fetch(urlAllPokemon);
  let nameAndUrlOfAllPokemonJson = await nameAndUrlOfAllPokemon.json();
  let infoAllpokemons = nameAndUrlOfAllPokemonJson["results"];
  return infoAllpokemons;
}

async function pushNames(infoAllpokemons) {
  for (let i = 0; i < infoAllpokemons.length; i++) {
    let namePokemonOfAll = infoAllpokemons[i]["name"];
    allpokemonNames.push(namePokemonOfAll);
  }
}

// Render 20

async function fetchNamesAndRenderMiniCard() {
  await fetchAndPushNames();
  fetchInfoForNext20();
}

function fetchInfoForNext20() {
  firstIndex = firstIndex + 20;
  lastIndex = lastIndex + 20;
  let namesOfPokemonToDisplay = allpokemonNames.slice(firstIndex, lastIndex);
  fetchInfoForNames(namesOfPokemonToDisplay);
}

async function fetchInfoForNames(namesOfPokemonToDisplay) {
  for (let i = 0; i < namesOfPokemonToDisplay.length; i++) {
    let nameOfPokemonToDisplay = namesOfPokemonToDisplay[i];
    await loadInfo(i, nameOfPokemonToDisplay, renderMiniCard);
  }
}

async function loadInfo(i, nameParam, functionName) {
  let url = `https://pokeapi.co/api/v2/pokemon/${nameParam}`;
  let response = await fetch(url);
  let pokemon = await response.json();
  let name = pokemon["name"];
  let category = pokemon["types"]["0"]["type"]["name"];
  let image = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let pokemonStats = pokemon["stats"];
  let color = getBackgroundColor(category);
  let indexInAllpokemonNames = allpokemonNames.indexOf(name);
  loadStatsNames(pokemonStats);
  loadStatsValue(pokemonStats);
  functionName(indexInAllpokemonNames, color, name, category, image, pokemonStats); // BIG change!
}

function renderMiniCard(i, color, name, category, image, pokemonStats) {
  document.getElementById("mainContainer").innerHTML += generateMiniCard(i, color, name, category, image, pokemonStats);
}

function generateMiniCard(i, color, name, category, image, pokemonStats) {
  return `
  <div id='miniCard${i}' onclick="showPopup('${i}', '${color}', '${name}', '${category}', '${image}', '${pokemonStats}')" class="mini_card" style="background-color: ${color};">
     <div class="container_name_and_category">
     <h3 id="miniCardName">${name}</h3>
       <p id="miniCardCategory">${category}</p>
       </div>
       <img id="miniCardImage" src="${image}" />
   </div>
   `;
}

// Mini-Cards

function getBackgroundColor(currentPokemonCategory) {
  if (currentPokemonCategory == "grass") {
    return "#48D0B0";
  } else if (currentPokemonCategory == "fire") {
    return "#FB6C6C";
  } else if (currentPokemonCategory == "water") {
    return "#58AAF6";
  } else if (currentPokemonCategory == "bug") {
    return "#a55d2a";
  } else if (currentPokemonCategory == "normal") {
    return "#FFD757";
  } else if (currentPokemonCategory == "dark") {
    return "darkgrey";
  } else if (currentPokemonCategory == "fairy") {
    return "pink";
  } else if (currentPokemonCategory == "dragon") {
    return "darkBlue";
  } else if (currentPokemonCategory == "flying") {
    return "lightblue";
  } else if (currentPokemonCategory == "ghost") {
    return "lightgrey";
  } else if (currentPokemonCategory == "ground") {
    return "brown";
  } else if (currentPokemonCategory == "ice") {
    return "aqua";
  } else if (currentPokemonCategory == "poison") {
    return "greenyellow";
  } else if (currentPokemonCategory == "psychic") {
    return "#blueviolet";
  } else if (currentPokemonCategory == "rock") {
    return "#413333";
  } else if (currentPokemonCategory == "steel") {
    return "silver";
  } else if (currentPokemonCategory == "electric") {
    return "#fafa74";
  } else if (currentPokemonCategory == "fighting") {
    return "#CB5F48";
  }
}

// Popup

async function showPopup(i, color, name, category, image, pokemonStats) {
  document.getElementById("popupBackground").classList.remove("d_none");
  await loadInfo(i, name, renderPopup);
  renderChart();
  disableScroll();
}

function loadStatsNames(pokemonStats) {
  statNames = [];
  for (let i = 0; i < pokemonStats.length; i++) {
    let statName = pokemonStats[i]["stat"]["name"];

    statNames.push(statName);
  }
}

function loadStatsValue(pokemonStats) {
  statValues = [];
  for (let i = 0; i < pokemonStats.length; i++) {
    let statValue = pokemonStats[i]["base_stat"];

    statValues.push(statValue);
  }
}

function renderPopup(i, color, name, category, image, pokemonStats) {
  document.getElementById("popupBackground").innerHTML = `<div onclick="clickOnPopupCard()" class="card">
  <div id="cardTopContainer" style="background-color: ${color};">
    <div class="container_arrows_and_names">
       <img id='back' onclick="showPreviousPokemon('${name}')" class="backwards_arrow" src="img/icons/backwards_arrow.png" alt="backwards_arrow">
       <h1 id="pokemonName">${name}</h1>
       <img id="foreward" onclick="showNextPokemon('${name}')" class="forewards_arrow" src="img/icons/forewards_arrow.png" alt="forewards_arrow">
    </div>
    
    <div class="pokemon_category_container"><h2 id="pokemoncategory">${category}</h2></div>
    <img id="pokemonImage" src="${image}"/>
  </div>
  <div class="card_bottom_container">
    <div class="my_chart_container">
      <canvas id="myChart" position: relative;></canvas>
    </div>
  </div>
</div>`;
  dontShowArrowOfFirstPokemon(name);
  dontShowArrowOfLastPokemon(name);
}

function dontShowArrowOfFirstPokemon(name) {
  let result = allpokemonNames.indexOf(name);
  if (result == 0) {
    document.getElementById("back").classList.add("transparent");
    document.getElementById("back").classList.add("no_pointer");
  }
}

function dontShowArrowOfLastPokemon(name) {
  let result = allpokemonNames.indexOf(name);
  if (result == allpokemonNames.length - 1) {
    document.getElementById("foreward").classList.add("transparent");
    document.getElementById("back").classList.add("no_pointer");
  }
}

function disableScroll() {
  document.body.classList.add("remove-scrolling");
}

function closePopup() {
  document.getElementById("popupBackground").classList.add("d_none");
  enableScroll();
}

function enableScroll() {
  document.body.classList.remove("remove-scrolling");
}

async function showNextPokemon(name) {
  event.stopPropagation(onclick);
  let indexOfParameterName = allpokemonNames.indexOf(name);
  let indexForNextPokemon = indexOfParameterName + 1;
  let nextName = allpokemonNames[indexForNextPokemon];
  await loadInfo(indexForNextPokemon, nextName, renderPopup);
  renderChart();
}

async function showPreviousPokemon(name) {
  event.stopPropagation(onclick);
  let indexOfParameterName = allpokemonNames.indexOf(name);
  let indexForPreviousPokemon = indexOfParameterName - 1;
  let previousName = allpokemonNames[indexForPreviousPokemon];
  await loadInfo(indexForPreviousPokemon, previousName, renderPopup);
  renderChart();
}

function clickOnPopupCard() {
  event.stopPropagation(onclick);
}

// Search

async function filterNames() {
  let search = document.getElementById("search").value;
  search = search.toLowerCase();
  if (search.length >= 3) {
    document.getElementById("mainContainer").innerHTML = "";
    filteredPokemons = [];
    for (let index = 0; index < allpokemonNames.length; index++) {
      const poki = allpokemonNames[index];
      if (poki.toLowerCase().includes(search)) {
        document.getElementById("mainContainer").innerHTML = "";
        document.getElementById("sectionButton").classList.add("d_none");
        let url = `https://pokeapi.co/api/v2/pokemon/${poki}`;
        let response = await fetch(url);
        let filteredPokemonJson = await response.json();
        filteredPokemons.push(filteredPokemonJson);
      }
    }
    loadInfoAndrenderFilteredPokemon();
  }
}

async function loadInfoAndrenderFilteredPokemon() {
  for (let i = 0; i < 10; i++) {
    const filteredPokemon = filteredPokemons[i];
    let name = filteredPokemons[i]["name"];
    let category = filteredPokemons[i]["types"]["0"]["type"]["name"];
    let image = filteredPokemons[i]["sprites"]["other"]["official-artwork"]["front_default"];
    let pokemonStats = filteredPokemons[i]["stats"];
    let color = getBackgroundColor(category);
    loadStatsNames(pokemonStats);
    loadStatsValue(pokemonStats);
    document.getElementById("mainContainer").innerHTML += generateMiniCard(i, color, name, category, image);
  }
}
