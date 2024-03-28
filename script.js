let pokemonNames = [];
let currentPokemon;
let statNames = [];
let statValues = [];
let offset = 0;
let allpokemonNames = [];
let filteredPokemons = [];

// Mini-Cards

// async function fetchAndDisplayMiniCards() {
//   let info = await load20PokemonInfos();
//   pushFirst20PokemonNamesIntoArray(info);
//   await loadInfoOfAllPokemonAndRenderMiniCard();
//   fetchAllPokemonNames();
// }

// async function load20PokemonInfos() {
//   let url20Pokemon = "https://pokeapi.co/api/v2/pokemon/";
//   let nameAndUrlOf20Pokemon = await fetch(url20Pokemon);
//   let nameAndUrlOf20PokemonJson = await nameAndUrlOf20Pokemon.json();
//   let infoAllpokemons = nameAndUrlOf20PokemonJson["results"];
//   return infoAllpokemons;
// }

// async function pushFirst20PokemonNamesIntoArray(infoAllpokemons) {
//   for (let i = 0; i < infoAllpokemons.length; i++) {
//     let namePokemon = infoAllpokemons[i]["name"];
//     pokemonNames.push(namePokemon);
//   }
// }

// async function loadInfoOfAllPokemonAndRenderMiniCard() {
//   document.getElementById("mainContainer").innerHTML = "";
//   for (let i = 0; i < pokemonNames.length; i++) {
//     await loadInfoOf1Pokemon(i);
//     renderMiniCard(i);
//   }
// }

// async function loadInfoOf1Pokemon(i) {
//   let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`;
//   let response = await fetch(url);
//   currentPokemon = await response.json();
// }

function renderMiniCard(i) {
  let currentPokemonName = currentPokemon["name"];
  let currentPokemonCategory = currentPokemon["types"]["0"]["type"]["name"];
  let currentPokemonImageSrc = currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let backgroundColor = getBackgroundColor(currentPokemonCategory);
  document.getElementById("mainContainer").innerHTML += generateMiniCard(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc);
}

function generateMiniCard(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc) {
  // i eventuell noch anpassen. name eingeben und den index in allPokemonNames suchen und dann diesen index als i weietrgeben.
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

// function getColor(currentPokemonCategory) {
//   if (currentPokemonCategory == "grass") {
//     return "#48D0B0";
//   } else if (currentPokemonCategory == "fire") {
//     return "#FB6C6C";
//   } else if (currentPokemonCategory == "water") {
//     return "#58AAF6";
//   } else if (currentPokemonCategory == "bug") {
//     return "#a55d2a";
//   } else if (currentPokemonCategory == "normal") {
//     return "#FFD757";
//   } else if (currentPokemonCategory == "dark") {
//     return "darkgrey";
//   } else if (currentPokemonCategory == "fairy") {
//     return "pink";
//   } else if (currentPokemonCategory == "dragon") {
//     return "darkBlue";
//   } else if (currentPokemonCategory == "flying") {
//     return "lightblue";
//   } else if (currentPokemonCategory == "ghost") {
//     return "lightgrey";
//   } else if (currentPokemonCategory == "ground") {
//     return "brown";
//   } else if (currentPokemonCategory == "ice") {
//     return "aqua";
//   } else if (currentPokemonCategory == "poison") {
//     return "greenyellow";
//   } else if (currentPokemonCategory == "psychic") {
//     return "#blueviolet";
//   } else if (currentPokemonCategory == "rock") {
//     return "#413333";
//   } else if (currentPokemonCategory == "steel") {
//     return "silver";
//   } else if (currentPokemonCategory == "electric") {
//     return "#fafa74";
//   } else if (currentPokemonCategory == "fighting") {
//     return "#CB5F48";
//   }
// }

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
  let color = getBackgroundColor(category); // Bis hierhin bekommt das Programm alles doppelt.
  loadStatsNames(pokemonStats);
  loadStatsValue(pokemonStats);
  renderPopup(i, color, name, category, image);
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

// async function loadInfoOf1PokemonofLast20(i, last20) {
//   let url = `https://pokeapi.co/api/v2/pokemon/${last20[i]}`;
//   let response = await fetch(url);
//   currentPokemon = await response.json();
// }

// search

// 1. Schritt

let firstIndex = -20;
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
  firstIndex = firstIndex + 20;
  lastIndex = lastIndex + 20;
  let namesOfPokemonToDisplay = allpokemonNames.slice(firstIndex, lastIndex); // 20 von allpokemonNames
  fetchInfoOf20Pokemon(namesOfPokemonToDisplay);
}

async function fetchInfoOf20Pokemon(namesOfPokemonToDisplay) {
  for (let i = 0; i < namesOfPokemonToDisplay.length; i++) {
    let nameOfPokemonToDisplay = namesOfPokemonToDisplay[i];
    await loadInfoX(i, nameOfPokemonToDisplay);
  }
}

//USED
async function loadInfoX(i, nameOfPokemonToDisplay) {
  let url = `https://pokeapi.co/api/v2/pokemon/${nameOfPokemonToDisplay}`;
  let response = await fetch(url);
  let pokemon = await response.json();
  let name = pokemon["name"];
  let category = pokemon["types"]["0"]["type"]["name"];
  let image = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let pokemonStats = pokemon["stats"];
  let color = getBackgroundColor(category); // Bis hierhin bekommt das Programm alles doppelt.
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

// function showPopupX(i, color, name, category, image, pokemonStats) {
//   document.getElementById("popupBackground").classList.remove("d_none");
//   renderPopup(i, color, name, category, image);
//   renderChart();
//   disableScroll();
// }

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
        // ich solle dort Objekte rein pushen
      }
    }
    loadInfoAndrenderFilteredPokemon();
  }
}

async function loadInfoAndrenderFilteredPokemon() {
  for (let i = 0; i < 10; i++) {
    // for (let i = 0; i < filteredPokemons.length; i++) {
    const filteredPokemon = filteredPokemons[i];
    let name = filteredPokemons[i]["name"];
    let category = filteredPokemons[i]["types"]["0"]["type"]["name"];
    let image = filteredPokemons[i]["sprites"]["other"]["official-artwork"]["front_default"];
    let pokemonStats = filteredPokemons[i]["stats"];
    let color = getBackgroundColor(category);
    loadStatsNames(pokemonStats);
    loadStatsValue(pokemonStats);
    // let indexOfNameInArrayALLPOKEMONNAMES = allpokemonNames.indexOf(name);
    document.getElementById("mainContainer").innerHTML += generateMiniCard(i, color, name, category, image);
  }
}

// async function loadInfoOfSearchesPokemonAndRenderMiniCard(pokemonWithThe3GivenCharacters) {
//   let filteredPokemon = await loadFilteredPokemon(pokemonWithThe3GivenCharacters);
//   loadInfoFilteredPokemon(filteredPokemon);
// }

// async function loadFilteredPokemon(pokemonWithThe3GivenCharacters) {
//   let url = `https://pokeapi.co/api/v2/pokemon/${pokemonWithThe3GivenCharacters}`;
//   let response = await fetch(url);
//   let filteredPokemon = await response.json();
//   // let max10FilteredPokemon = filteredPokemon.slice(0, 9);
//   // console.log(max10FilteredPokemon);
//   return filteredPokemon;
// }

// async function loadInfoFilteredPokemon(filteredPokemon) {
//   let name = filteredPokemon["name"];
//   let category = filteredPokemon["types"]["0"]["type"]["name"];
//   let image = filteredPokemon["sprites"]["other"]["official-artwork"]["front_default"];
//   let pokemonStats = filteredPokemon["stats"];
//   let color = getColor(category); // Bis hierhin bekommt das Programm alles doppelt.
//   loadStatsNames(pokemonStats);
//   loadStatsValue(pokemonStats);
//   let indexOfNameInArrayALLPOKEMONNAMES = allpokemonNames.indexOf(name);
//   document.getElementById("mainContainer").innerHTML += generateMiniCard(indexOfNameInArrayALLPOKEMONNAMES, color, name, category, image);
// }
