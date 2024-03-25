// Main

let pokemonNames = [];
let currentPokemon;
let statNames = [];
let statValues = [];

async function fetchAndDisplayMiniCards() {
  let info = await load20PokemonInfos();
  load20PokemonNames(info);
}

async function load20PokemonInfos() {
  let url20Pokemon = "https://pokeapi.co/api/v2/pokemon/";
  let nameAndUrlOf20Pokemon = await fetch(url20Pokemon);
  let nameAndUrlOf20PokemonJson = await nameAndUrlOf20Pokemon.json();
  let infoAllpokemons = nameAndUrlOf20PokemonJson["results"];
  return infoAllpokemons;
}

async function load20PokemonNames(infoAllpokemons) {
  for (let i = 0; i < infoAllpokemons.length; i++) {
    let namePokemon = infoAllpokemons[i]["name"];
    pokemonNames.push(namePokemon);
    await loadPokemonInfo(namePokemon);
    renderMiniCard(i, name);
  }
}

function renderMiniCard(i, name) {
  let currentPokemonName = currentPokemon["name"];
  let currentPokemonCategory = currentPokemon["types"]["0"]["type"]["name"];
  let currentPokemonImageSrc = currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let backgroundColor = getBackgroundColor(currentPokemonCategory);
  document.getElementById("mainContainer").innerHTML += generateMiniCard(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc);
}

async function loadPokemonInfo(namePokemon) {
  let url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
}

function generateMiniCard(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc) {
  return `
  <div id='miniCard${i}' onclick="showPopup('${i}', '${backgroundColor}', '${currentPokemonName}', '${currentPokemonCategory}', '${currentPokemonImageSrc}')" class="mini_card" style="background-color: ${backgroundColor};">
     <div class="container_name_and_category">
     <h3 id="miniCardName">${currentPokemonName}</h3>
       <p id="miniCardCategory">${currentPokemonCategory}</p>
       </div>
       <img id="miniCardImage" src="${currentPokemonImageSrc}" />
   </div>`;
}

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
  }
}

// Popup

async function showPopup(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc) {
  document.getElementById("popupBackground").classList.remove("d_none");
  renderPopup(name, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc);
  console.log("Pokemon in Popup: ", currentPokemon);
  await loadStats(i);
  renderChart();
  disableScroll();
}

function renderPopup(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc) {
  document.getElementById("popupBackground").innerHTML = `<div onclick="clickOnPopupCard()" class="card">
  <div id="cardTopContainer" style="background-color: ${backgroundColor};">
    <img onclick="showPreviousPokemon()" class="backwards_arrow" src="img/icons/backwards_arrow.png" alt="backwards_arrow">
    <img onclick="showNextPokemon(${i})" class="forewards_arrow" src="img/icons/forewards_arrow.png" alt="forewards_arrow">
    <h1 id="pokemonName">${currentPokemonName}</h1>
    <div class="pokemon_category_container"><h2 id="pokemoncategory">${currentPokemonCategory}</h2></div>
    <img id="pokemonImage" src="${currentPokemonImageSrc}"/>
  </div>
  <div class="card_bottom_container">
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </div>
</div>`;
}

async function loadStats(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`;
  let response = await fetch(url);
  let pokemon = await response.json();
  let pokemonStats = pokemon["stats"];
  loadStatsNames(pokemonStats);
  loadStatsValue(pokemonStats);
}

function loadStatsNames(pokemonStats) {
  statNames = [];
  for (let i = 0; i < pokemonStats.length; i++) {
    let statName = pokemonStats[i]["stat"]["name"];

    statNames.push(statName);
  }
  console.log("stat names", statNames);
}

function loadStatsValue(pokemonStats) {
  statValues = [];
  for (let i = 0; i < pokemonStats.length; i++) {
    let statValue = pokemonStats[i]["base_stat"];

    statValues.push(statValue);
  }
  console.log("stat values: ", statValues);
}

function closePopup() {
  document.getElementById("popupBackground").classList.add("d_none");
  enableScroll();
}

function disableScroll() {
  document.body.classList.add("remove-scrolling");
}

function enableScroll() {
  document.body.classList.remove("remove-scrolling");
}

function showPreviousPokemon() {
  event.stopPropagation(onclick);
}

function showNextPokemon(i) {
  console.log("current name: ", pokemonNames[i]);
  console.log("next name: ", pokemonNames[i + 1]);
  event.stopPropagation(onclick);
}

function clickOnPopupCard() {
  event.stopPropagation(onclick);
}
