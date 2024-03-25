// Main

let pokemonNames = []; // brauch ich nicht
// let namePokemon;
let currentPokemon;
let statNames = [];
let statValues = [];

async function loadPokemons() {
  let urlAllPokemon = "https://pokeapi.co/api/v2/pokemon/"; // Leider kann man hier nicht die Kategorie und auch nicht das Bild laden. Vltt kann man diese URL verwenden, um den Namen, der hier ausgespuckt wird, in einer anderen Funktion nutzen, die dann auf die einzelnen Pokemon zugreift. Die Namen kann ich oben in Zeile 6 eingeben. Oder doch einfach ein array mit den namen machen?
  let responseAllPokemon = await fetch(urlAllPokemon);
  let allPokemon = await responseAllPokemon.json();
  console.log("All Pokemons:", allPokemon);
  let infoAllpokemons = allPokemon["results"];
  console.log("Index, names and url of all Pokemon:", infoAllpokemons);

  // let namePokemon = infoAllpokemons[i]["name"];
  // console.log("Name Pokemon:", namePokemon);

  for (let i = 0; i < infoAllpokemons.length; i++) {
    let namePokemon = infoAllpokemons[i]["name"];
    console.log("Name Pokemon ", i, ":", namePokemon);
    pokemonNames.push(namePokemon);

    // load info of pokemon with the help of the name.
    let url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`; // hier kann ich pokemonNames einsetzen.
    let response = await fetch(url);
    currentPokemon = await response.json(); // you get object of the pokemon.
    // load the name (string) from the right array and save it in variabel
    let currentPokemonName = await currentPokemon["name"];
    // load the category (string) from the right array and save it in variabel
    let currentPokemonCategory = await currentPokemon["types"]["0"]["type"]["name"];
    // load the stats (object) and save it in variabel - NOT neccessary: The stats are saved in a global variable.
    // load the image-src (string) from the right array and save it in variabel
    let currentPokemonImageSrc = currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
    // right backround-color
    let backgroundColor = getBackgroundColor(currentPokemonCategory); // I put in the category, I receive via return the backround-color

    // for (let k = 0; k < pokemonNames.length; k++) {
    //   namePokemon = pokemonNames[k]["name"];

    document.getElementById("mainContainer").innerHTML += `
     <div id='miniCard${i}' onclick="showCard(${i}, '${backgroundColor}', '${currentPokemonName}', '${currentPokemonCategory}', '${currentPokemonImageSrc}')" class="mini_card" style="background-color: ${backgroundColor};">
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

function showCard(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc) {
  // function showCard(param, namePokemon) {
  // das popup muss gerendert werden. Wenn es noch nicht da ist, ist auch noch keine id da bei der d_none removed werden kann.
  document.getElementById("popup").classList.remove("d_none");
  // loadPokemon();
  renderPopup(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc);
  // renderPopup();
}

function renderPopup(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc) {
  document.getElementById("popup").innerHTML = `<div class="card">
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

  // setBackgroundColor(backgroundColor);
  // //   loadPokemon(namePokemon);
  // renderPokemonName(currentPokemonName);
  // renderPokemonImage(currentPokemonImageSrc);
  // renderPokemonCategory(currentPokemonCategory);
  // renderStats(i); // Todo: Umbennen - hier wird nur gepusht.
  // renderChart();
}

// function setBackgroundColor(backgroundColor) {

// }

// async function loadPokemon(namePokemon) {
//   let url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`; // hier kann ich pokemonNames einsetzen.
//   let response = await fetch(url);
//   currentPokemon = await response.json();

//   console.log("Loaded Pokemon", currentPokemon);

//   //   loadPokemons(); // gehört noch zu Main
// }

// function renderPokemonName() {
//   document.getElementById("pokemonName").innerHTML = namePokemon;
//   // Todo: Nochmal so versuchen!
//   //   let name = await currentPokemon["name"];
//   //   let nameWithCapitalLetter = toUpperCase(name);
//   //   document.getElementById("pokemonName").innerHTML = nameWithCapitalLetter;
// }

// function renderPokemonImage() {
//   document.getElementById("pokemonImage").src = currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
// }

// function renderPokemonCategory() {
//   document.getElementById("pokemoncategory").innerHTML = currentPokemon["types"]["0"]["type"]["name"];
// }

function renderStats() {
  renderStatsNames();
  renderStatsValue();
}

function renderStatsNames() {
  let currentPokemonStats = currentPokemon["stats"];
  for (let i = 0; i < currentPokemonStats.length; i++) {
    const statName = currentPokemonStats[i]["stat"]["name"];
    statNames.push(statName);
  }
  console.log(statNames);
}

function renderStatsValue() {
  let currentPokemonStats = currentPokemon["stats"];
  for (let i = 0; i < currentPokemonStats.length; i++) {
    const statValue = currentPokemonStats[i]["base_stat"];
    statValues.push(statValue);
  }
  console.log(statValues);
}

// function renderMiniCards() {
//    for (let j = 0; j < pokemonNames.length; j++) {
//     const pokemon = pokemonNames[j];

//    }

//    <div class="mini_card">
//         <h3 id="miniCardName">Name</h3>
//         <div class="category_and_image">
//           <p id="miniCardCategory">Kategorie</p>
//           <img id="miniCardImage" src="img1.jpg" />
//         </div>
//       </div>
// }
