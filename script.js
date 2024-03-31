let allPokemonNames = [];
let filteredPokemons = [];
let firstIndex = -20;
let lastIndex = 0;
let statNames = [];
let statValues = [];
let loadingInProgress = false;

// Creat array allpokemonNames

async function fetchNamesAndRenderMiniCard() {
  await fetchAndPushNames();
  fetchInfoForNext20();
}

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
    allPokemonNames.push(namePokemonOfAll);
  }
}

// Render 20 Mini-Cards

// function fetchInfoForNext20() {
//   firstIndex = firstIndex + 20;
//   lastIndex = lastIndex + 20;
//   let namesOfPokemonToDisplay = allPokemonNames.slice(firstIndex, lastIndex);
//   fetchInfoForNames(namesOfPokemonToDisplay);
// }
// Used this instead:
async function fetchInfoForNext20() {
  if (!loadingInProgress) {
    loadingInProgress = true; // Ladevorgang beginnt
    firstIndex += 20;
    lastIndex += 20;
    let namesOfPokemonToDisplay = allPokemonNames.slice(firstIndex, lastIndex);
    await fetchInfoForNames(namesOfPokemonToDisplay);
    loadingInProgress = false; // Ladevorgang abgeschlossen
  }
}

async function fetchInfoForNames(namesOfPokemonToDisplay) {
  for (let i = 0; i < namesOfPokemonToDisplay.length; i++) {
    let nameOfPokemonToDisplay = namesOfPokemonToDisplay[i];
    await loadInfo(nameOfPokemonToDisplay, renderMiniCard);
  }
}

async function loadInfo(nameParam, functionName) {
  let url = `https://pokeapi.co/api/v2/pokemon/${nameParam}`;
  let response = await fetch(url);
  let pokemon = await response.json();
  let name = pokemon["name"];
  let category = pokemon["types"]["0"]["type"]["name"];
  let image = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let pokemonStats = pokemon["stats"];
  let color = getBackgroundColor(category);
  let indexInAllpokemonNames = allPokemonNames.indexOf(name);
  loadStatsNames(pokemonStats);
  loadStatsValue(pokemonStats);
  functionName(indexInAllpokemonNames, color, name, category, image, pokemonStats);
}

function renderMiniCard(i, color, name, category, image) {
  document.getElementById("mainContainer").innerHTML += generateMiniCard(i, color, name, category, image);
}

function generateMiniCard(i, color, name, category, image) {
  return `
  <div id='miniCard${i}' onclick="showPopup('${i}', '${color}', '${name}', '${category}', '${image}')" class="mini_card" style="background-color: ${color};">
     <div class="container_name_and_category">
       <h3 id="miniCardName">#${i + 1} ${name}</h3>
       
       <p id="miniCardCategory">${category}</p>
     </div>
       <img id="miniCardImage" src="${image}" />
   </div>
   `;
}

function getBackgroundColor(category) {
  if (category == "grass") {
    return "#48D0B0";
  } else if (category == "fire") {
    return "#FB6C6C";
  } else if (category == "water") {
    return "#58AAF6";
  } else if (category == "bug") {
    return "#a55d2a";
  } else if (category == "normal") {
    return "#FFD757";
  } else if (category == "dark") {
    return "darkgrey";
  } else if (category == "fairy") {
    return "pink";
  } else if (category == "dragon") {
    return "darkBlue";
  } else if (category == "flying") {
    return "lightblue";
  } else if (category == "ghost") {
    return "lightgrey";
  } else if (category == "ground") {
    return "brown";
  } else if (category == "ice") {
    return "aqua";
  } else if (category == "poison") {
    return "greenyellow";
  } else if (category == "psychic") {
    return "blueviolet";
  } else if (category == "rock") {
    return "#413333";
  } else if (category == "steel") {
    return "silver";
  } else if (category == "electric") {
    return "#fafa74";
  } else if (category == "fighting") {
    return "#CB5F48";
  }
}

// Popup

async function showPopup(i, color, name, category, image, pokemonStats) {
  document.getElementById("popupBackground").classList.remove("d_none");
  await loadInfo(name, renderPopup);
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
       <h1 id="miniCardName">#${i + 1} ${name}</h1>
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
  let result = allPokemonNames.indexOf(name);
  if (result == 0) {
    document.getElementById("back").classList.add("transparent");
    document.getElementById("back").classList.add("no_pointer");
  }
}

function dontShowArrowOfLastPokemon(name) {
  let result = allPokemonNames.indexOf(name);
  if (result == allPokemonNames.length - 1) {
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
  let indexOfParameterName = allPokemonNames.indexOf(name);
  let indexForNextPokemon = indexOfParameterName + 1;
  let nextName = allPokemonNames[indexForNextPokemon];
  await loadInfo(nextName, renderPopup);
  renderChart();
}

async function showPreviousPokemon(name) {
  event.stopPropagation(onclick);
  let indexOfParameterName = allPokemonNames.indexOf(name);
  let indexForPreviousPokemon = indexOfParameterName - 1;
  let previousName = allPokemonNames[indexForPreviousPokemon];
  await loadInfo(previousName, renderPopup);
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
    for (let index = 0; index < allPokemonNames.length; index++) {
      const pokemonName = allPokemonNames[index];
      if (pokemonName.toLowerCase().includes(search)) {
        await pushFilteredNames(pokemonName);
      }
    }
    loadInfoAndrenderFilteredPokemon();
  }
}

async function pushFilteredNames(pokemonName) {
  document.getElementById("mainContainer").innerHTML = "";
  document.getElementById("sectionButton").classList.add("d_none");
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  let response = await fetch(url);
  let filteredPokemonJson = await response.json();
  if (filteredPokemons.length < 10) {
    filteredPokemons.push(filteredPokemonJson);
  }
}

function loadInfoAndrenderFilteredPokemon() {
  for (let i = 0; i < filteredPokemons.length; i++) {
    // if (i < 10) {
    let name = filteredPokemons[i]["name"];
    let category = filteredPokemons[i]["types"]["0"]["type"]["name"];
    let image = filteredPokemons[i]["sprites"]["other"]["official-artwork"]["front_default"];
    let color = getBackgroundColor(category);
    let indexInAllpokemonNames = allPokemonNames.indexOf(name);
    document.getElementById("mainContainer").innerHTML += generateMiniCard(indexInAllpokemonNames, color, name, category, image);
    // } else {
    //   return;
    // }
  }
}
