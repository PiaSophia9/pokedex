// Main

let pokemonNames = [];
let currentPokemon; // Am Schluss ist dort ist das letze Pokemon gespeichert, was in den Mini-Cards angezeigt ist.
let statNames = [];
let statValues = [];

async function loadPokemons() {
  let urlAllPokemon = "https://pokeapi.co/api/v2/pokemon/";
  let responseAllPokemon = await fetch(urlAllPokemon);
  let allPokemon = await responseAllPokemon.json();
  console.log("All Pokemons:", allPokemon);
  let infoAllpokemons = allPokemon["results"];
  console.log("Index, names and url of all Pokemon:", infoAllpokemons);
  for (let i = 0; i < infoAllpokemons.length; i++) {
    let namePokemon = infoAllpokemons[i]["name"];
    console.log("Name Pokemon ", i, ":", namePokemon);
    pokemonNames.push(namePokemon);
    // load info of pokemon with the help of the name.
    let url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`;
    let response = await fetch(url);
    currentPokemon = await response.json(); // you get object of the pokemon.
    console.log("CurrentPokemon: ", currentPokemon);
    // load the name (string) from the right array and save it in variabel
    let currentPokemonName = await currentPokemon["name"];
    // load the category (string) from the right array and save it in variabel
    let currentPokemonCategory = await currentPokemon["types"]["0"]["type"]["name"];
    // load the image-src (string) from the right array and save it in variabel
    let currentPokemonImageSrc = currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
    // set right backround-color:
    let backgroundColor = getBackgroundColor(currentPokemonCategory); // I put in the category, I receive via return the backround-color
    document.getElementById("mainContainer").innerHTML += `
     <div id='miniCard${i}' onclick="showPopup(${i}, '${backgroundColor}', '${currentPokemonName}', '${currentPokemonCategory}', '${currentPokemonImageSrc}')" class="mini_card" style="background-color: ${backgroundColor};">
     <div class="container_name_and_category">
     <h3 id="miniCardName">${currentPokemonName}</h3>
     
       <p id="miniCardCategory">${currentPokemonCategory}</p>
       </div>
       <img id="miniCardImage" src="${currentPokemonImageSrc}" />
     
   </div>`;
    // }
  }
  console.log("Names saved in the array pokemonNames: ", pokemonNames);
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

// Click auf die Karte
// In der onlclick-Funktion muss úbergeben werden, um welche Karte es sich handelt (index) und wie der Name des Pokemon ist, damit man die URL anpassen kann, die die Informationen beinhaltet nach der das Popup mit Daten gefüllt werden kann.
// Das Popup muss erstellt werden mit allen Infos.
// Dem popup muss muss das d_none entfernt werden.

function showPopup(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc) {
  document.getElementById("popupBackground").classList.remove("d_none");
  renderPopup(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc);
  loadStats();
  renderChart();
}

function renderPopup(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc) {
  document.getElementById("popupBackground").innerHTML = `<div class="card">
  <div id="cardTopContainer" style="background-color: ${backgroundColor};">
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

function loadStats() {
  loadStatsNames();
  loadStatsValue();
}

function loadStatsNames() {
  let currentPokemonStats = currentPokemon["stats"]; //
  for (let i = 0; i < currentPokemonStats.length; i++) {
    const statName = currentPokemonStats[i]["stat"]["name"];
    statNames.push(statName);
  }
  console.log("statName", statNames);
}

function loadStatsValue() {
  let currentPokemonStats = currentPokemon["stats"];
  for (let i = 0; i < currentPokemonStats.length; i++) {
    const statValue = currentPokemonStats[i]["base_stat"];
    statValues.push(statValue);
  }
  console.log("stat value: ", statValues);
}

function closePopup() {
  event.stopPropagation(onclick);
}
