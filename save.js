let pokemonNames = [];
let currentPokemon;
let statNames = [];
let statValues = [];
let offset = 0;
let allpokemonNames = [];

// Mini-Cards

async function fetchAndDisplayMiniCards() {
  let info = await load20PokemonInfos();
  pushFirst20PokemonNamesIntoArray(info);
  await loadInfoOfAllPokemonAndRenderMiniCard();
  fetchAllPokemonNames();
}

async function load20PokemonInfos() {
  let url20Pokemon = "https://pokeapi.co/api/v2/pokemon/";
  let nameAndUrlOf20Pokemon = await fetch(url20Pokemon);
  let nameAndUrlOf20PokemonJson = await nameAndUrlOf20Pokemon.json();
  let infoAllpokemons = nameAndUrlOf20PokemonJson["results"];
  return infoAllpokemons;
}

async function pushFirst20PokemonNamesIntoArray(infoAllpokemons) {
  for (let i = 0; i < infoAllpokemons.length; i++) {
    let namePokemon = infoAllpokemons[i]["name"];
    pokemonNames.push(namePokemon);
  }
}

async function loadInfoOfAllPokemonAndRenderMiniCard() {
  document.getElementById("mainContainer").innerHTML = "";
  for (let i = 0; i < pokemonNames.length; i++) {
    await loadInfoOf1Pokemon(i);
    renderMiniCard(i);
  }
}

async function loadInfoOf1Pokemon(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
}

function renderMiniCard(i) {
  let currentPokemonName = currentPokemon["name"];
  let currentPokemonCategory = currentPokemon["types"]["0"]["type"]["name"];
  let currentPokemonImageSrc = currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let backgroundColor = getBackgroundColor(currentPokemonCategory);

  document.getElementById("mainContainer").innerHTML += generateMiniCard(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc);
}

function generateMiniCard(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc) {
  return `
  <div id='miniCard${i}' onclick="showPopup('${i}', '${backgroundColor}', '${currentPokemonName}', '${currentPokemonCategory}', '${currentPokemonImageSrc}')" class="mini_card" style="background-color: ${backgroundColor};">
     <div class="container_name_and_category">
     <h3 id="miniCardName">${currentPokemonName}</h3>
       <p id="miniCardCategory">${currentPokemonCategory}</p>
       </div>
       <img id="miniCardImage" src="${currentPokemonImageSrc}" />
   </div>
   `;
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

// async function showPopup(i, color, name, category, image, pokemonStats) {
//   document.getElementById("popupBackground").classList.remove("d_none");
//   await loadInfo(i);
//   renderChart();
//   disableScroll();
// }

// function renderPopup(i, color, name, category, image, pokemonStats) {
//   document.getElementById("popupBackground").innerHTML = `<div onclick="clickOnPopupCard()" class="card">
//   <div id="cardTopContainer" style="background-color: ${color};">
//     <img onclick="showPreviousPokemon('${name}')" class="backwards_arrow" src="img/icons/backwards_arrow.png" alt="backwards_arrow">
//     <img onclick="showNextPokemon('${name}')" class="forewards_arrow" src="img/icons/forewards_arrow.png" alt="forewards_arrow">
//     <h1 id="pokemonName">${name}</h1>
//     <div class="pokemon_category_container"><h2 id="pokemoncategory">${category}</h2></div>
//     <img id="pokemonImage" src="${image}"/>
//   </div>
//   <div class="card_bottom_container">
//     <div>
//       <canvas id="myChart"></canvas>
//     </div>
//   </div>
// </div>`;
// }

// async function loadInfo(i) {
//   let url = `https://pokeapi.co/api/v2/pokemon/${allpokemonNames[i]}`;
//   let response = await fetch(url);
//   let pokemon = await response.json();
//   let name = pokemon["name"];
//   let category = pokemon["types"]["0"]["type"]["name"];
//   let image = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
//   let pokemonStats = pokemon["stats"];
//   let color = getColor(category); // Bis hierhin bekommt das Programm alles doppelt.
//   loadStatsNames(pokemonStats);
//   loadStatsValue(pokemonStats);
//   renderPopup(i, color, name, category, image);
// }

function getColor(currentPokemonCategory) {
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

// function showPopupX(i, color, name, category, image, pokemonStats) {
//   document.getElementById("popupBackground").classList.remove("d_none");
//   loadStatsNames(i, color, name, category, image, pokemonStats);
//   loadStatsValue(pokemonStats);
//   renderPopup(i, color, name, category, image);
//   renderChart();
//   disableScroll();
// }

async function showPopup(i, color, name, category, image, pokemonStats) {
  document.getElementById("popupBackground").classList.remove("d_none");
  await loadInfo(i, name);
  renderChart();
  disableScroll();
}

async function loadInfo(i, nameInfo) {
  let url = `https://pokeapi.co/api/v2/pokemon/${nameInfo}`;
  let response = await fetch(url);
  let pokemon = await response.json();
  let name = pokemon["name"];
  let category = pokemon["types"]["0"]["type"]["name"];
  let image = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let pokemonStats = pokemon["stats"];
  let color = getColor(category); // Bis hierhin bekommt das Programm alles doppelt.
  loadStatsNames(pokemonStats);
  loadStatsValue(pokemonStats);
  renderPopup(i, color, name, category, image);
}

function renderPopup(i, color, name, category, image, pokemonStats) {
  document.getElementById("popupBackground").innerHTML = `<div onclick="clickOnPopupCard()" class="card">
  <div id="cardTopContainer" style="background-color: ${color};">
    <img id='back' onclick="showPreviousPokemon('${name}')" class="backwards_arrow" src="img/icons/backwards_arrow.png" alt="backwards_arrow">
    <img id="foreward" onclick="showNextPokemon('${name}')" class="forewards_arrow" src="img/icons/forewards_arrow.png" alt="forewards_arrow">
    <h1 id="pokemonName">${name}</h1>
    <div class="pokemon_category_container"><h2 id="pokemoncategory">${category}</h2></div>
    <img id="pokemonImage" src="${image}"/>
  </div>
  <div class="card_bottom_container">
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </div>
</div>`;
  dontShowArrowOfFirstPokemon(name);
  dontShowArrowOfLastPokemon(name);
}

function dontShowArrowOfFirstPokemon(name) {
  let result = allpokemonNames.indexOf(name);
  if (result == 0) {
    document.getElementById("back").classList.add("d_none");
  }
}

function dontShowArrowOfLastPokemon(name) {
  let result = allpokemonNames.indexOf(name);
  if (result == allpokemonNames.length - 1) {
    document.getElementById("foreward").classList.add("d_none");
  }
}

async function showNextPokemon(name) {
  event.stopPropagation(onclick);
  // hier irgendwie mit filteredPokemon arbeiten.
  let indexOfParameterName = allpokemonNames.indexOf(name);
  let indexForNextPokemon = indexOfParameterName + 1;
  let nextName = allpokemonNames[indexForNextPokemon];
  await loadInfo(indexForNextPokemon, nextName);
  renderChart();
}

async function showPreviousPokemon(name) {
  event.stopPropagation(onclick);
  let indexOfParameterName = allpokemonNames.indexOf(name);
  let indexForPreviousPokemon = indexOfParameterName - 1;
  let previousName = allpokemonNames[indexForPreviousPokemon];
  await loadInfo(indexForPreviousPokemon, previousName);
  renderChart();
}

function clickOnPopupCard() {
  event.stopPropagation(onclick);
}

// Lade mehr

// async function loadAndPush20MorePokemon() {
//   offset = offset + 20;
//   console.log("offset", offset);
//   let nameAndUrlOf20MorePokemonJson = await load20MorePokemonNames();
//   await push20MorePokemonNamesIntoArray(nameAndUrlOf20MorePokemonJson);
//   renderTheLast20PokemonOfArray();
// }

// async function load20MorePokemonNames() {
//   let url20MorePokemon = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
//   let nameAndUrlOf20MorePokemon = await fetch(url20MorePokemon);
//   let nameAndUrlOf20MorePokemonJson = await nameAndUrlOf20MorePokemon.json();
//   let infoOf20MorePokemons = nameAndUrlOf20MorePokemonJson["results"];
//   console.log("20 more Pokemon:", infoOf20MorePokemons);
//   return infoOf20MorePokemons;
// }

// async function push20MorePokemonNamesIntoArray(infoOf20MorePokemons) {
//   for (let i = 0; i < infoOf20MorePokemons.length; i++) {
//     let nameNextPokemon = infoOf20MorePokemons[i]["name"];
//     pokemonNames.push(nameNextPokemon);
//   }
//   console.log("array pokemonNames: ", pokemonNames);
// }

// function renderTheLast20PokemonOfArray() {
//   console.log(pokemonNames.length);
//   let last20Elemts = pokemonNames.slice(-20);
//   console.log(last20Elemts);
//   loadInfoOf20PokemonAndRenderMiniCard();
// }

// async function loadInfoOf20PokemonAndRenderMiniCard() {
//   let last20Elemts = pokemonNames.slice(-20);
//   for (let i = 0; i < last20Elemts.length; i++) {
//     await loadInfoOf1PokemonofLast20(i, last20Elemts);
//     j = i + 20; // damit klappen die popups, aber nicht mehr die Mini-cards.
//     renderMiniCard(j);
//   }
// }

async function loadInfoOf1PokemonofLast20(i, last20) {
  let url = `https://pokeapi.co/api/v2/pokemon/${last20[i]}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
}

// search

// 1. Schritt

let firstIndex = -40;
let lastIndex = 0;

async function fetchPokemonNamesSelect20AndFetchTheirInfoAndRenderMiniCard() {
  await fetchAllPokemonNames();
  take20PokemonOfArrayAndFetchTheirInfoAndRenderMiniCard();
}

async function fetchAllPokemonNames() {
  let info = await loadAllPokemonInfos();
  pushAllPokemonNamesIntoArray(info);
  console.log("all Pokemon names: ", allpokemonNames);
}

async function loadAllPokemonInfos() {
  let urlAllPokemon = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  let nameAndUrlOfAllPokemon = await fetch(urlAllPokemon);
  let nameAndUrlOfAllPokemonJson = await nameAndUrlOfAllPokemon.json();
  let infoAllpokemons = nameAndUrlOfAllPokemonJson["results"];
  return infoAllpokemons;
}

async function pushAllPokemonNamesIntoArray(infoAllpokemons) {
  for (let i = 0; i < infoAllpokemons.length; i++) {
    let namePokemonOfAll = infoAllpokemons[i]["name"];
    allpokemonNames.push(namePokemonOfAll);
  }
}

// 2. Schritt

function take20PokemonOfArrayAndFetchTheirInfoAndRenderMiniCard() {
  firstIndex = firstIndex + 40;
  lastIndex = lastIndex + 40;
  let namesOfPokemonToDisplay = allpokemonNames.slice(firstIndex, lastIndex); // 20 von allpokemonNames
  fetchInfoOf20Pokemon(namesOfPokemonToDisplay);
}

async function fetchInfoOf20Pokemon(namesOfPokemonToDisplay) {
  for (let i = 0; i < namesOfPokemonToDisplay.length; i++) {
    let nameOfPokemonToDisplay = namesOfPokemonToDisplay[i];
    await loadInfoX(i, nameOfPokemonToDisplay);
  }
}

async function loadInfoX(i, nameOfPokemonToDisplay) {
  let url = `https://pokeapi.co/api/v2/pokemon/${nameOfPokemonToDisplay}`;
  let response = await fetch(url);
  let pokemon = await response.json();
  let name = pokemon["name"];
  let category = pokemon["types"]["0"]["type"]["name"];
  let image = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let pokemonStats = pokemon["stats"];
  let color = getColor(category); // Bis hierhin bekommt das Programm alles doppelt.
  loadStatsNames(pokemonStats);
  loadStatsValue(pokemonStats);
  renderMiniCardX(i, color, name, category, image, pokemonStats);
  // if (name == letzter Name im array allpokemonNames) {
  //   add d_none to lade mehr section
  // }
}

function renderMiniCardX(i, color, name, category, image, pokemonStats) {
  document.getElementById("mainContainer").innerHTML += generateMiniCardX(i, color, name, category, image, pokemonStats);
}

function generateMiniCardX(i, color, name, category, image, pokemonStats) {
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

function showPopupX(i, color, name, category, image, pokemonStats) {
  document.getElementById("popupBackground").classList.remove("d_none");
  renderPopup(i, color, name, category, image);
  renderChart();
  disableScroll();
}

let TenFilteredPokemon = [];

function filterNames() {
  let searchValue = document.getElementById("search").value;
  searchValue = searchValue.toLowerCase();
  if (searchValue.length >= 3) {
    document.getElementById("mainContainer").innerHTML = "";
    for (let index = 0; index < allpokemonNames.length; index++) {
      // ich gehe alle Namen von allpokemonNames durch
      const filteredPokemon = allpokemonNames[index];
      if (filteredPokemon.toLowerCase().includes(searchValue)) {
        // Wenn ein name in allpokemonNames dem, was ich in den Input eingegeben habe... entspricht..
        document.getElementById("mainContainer").innerHTML = ""; // ...wird der mainConatiner geleert
        document.getElementById("sectionButton").classList.add("d_none"); // ...wird die Section mit Button entfernt
        let filteredPokemonArray = [];
        filteredPokemonArray.push(filteredPokemon); //... wird das gefilterte Pokemon in das array filteredPokemonArray gepusht
        TenFilteredPokemon = filteredPokemonArray.slice(0, 10); //...wird das array filteredPokemonArray
        console.log(TenFilteredPokemon);
        // array erstellen.
      }
    }
  }
}

async function loadInfoOfSearchesPokemonAndRenderMiniCard() {
  let filteredPokemonInfo = await loadFilteredPokemon();
  loadInfoFilteredPokemon(filteredPokemonInfo);
}

async function loadFilteredPokemon(pokemonWithThe3GivenCharacters) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonWithThe3GivenCharacters}`;
  let response = await fetch(url);
  let filteredPokemonJson = await response.json();
  return filteredPokemonJson;
}

async function loadInfoFilteredPokemon(filteredPokemonInfo) {
  let name = TenFilteredPokemon[0]["name"]; // Hier muss ich ansetzen und hier eine for-Schleife vor packen
  let category = TenFilteredPokemon[0]["types"]["0"]["type"]["name"];
  let image = TenFilteredPokemon[0]["sprites"]["other"]["official-artwork"]["front_default"];
  let pokemonStats = TenFilteredPokemon[0]["stats"];
  let color = getColor(category); // Bis hierhin bekommt das Programm alles doppelt.
  loadStatsNames(pokemonStats);
  loadStatsValue(pokemonStats);
  let indexOfNameInArrayALLPOKEMONNAMES = allpokemonNames.indexOf(name);
  document.getElementById("mainContainer").innerHTML += generateMiniCard(indexOfNameInArrayALLPOKEMONNAMES, color, name, category, image);
}
