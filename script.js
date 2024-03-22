// Main

let pokemonNames = []; // brauch ich nicht

let namePokemon;

async function loadPokemons() {
  let url = "https://pokeapi.co/api/v2/pokemon/"; // Leider kann man hier nicht die Kategorie und auch nicht das Bild laden. Vltt kann man diese URL verwenden, um den Namen, der hier ausgespuckt wird, in einer anderen Funktion nutzen, die dann auf die einzelnen Pokemon zugreift. Die Namen kann ich oben in Zeile 6 eingeben. Oder doch einfach ein array mit den namen machen?
  let response = await fetch(url);
  allPokemon = await response.json();

  console.log("Pokemons", allPokemon);
  let namespokemons = allPokemon["results"];
  for (let k = 0; k < namespokemons.length; k++) {
    namePokemon = namespokemons[k]["name"];
    document.getElementById("mainContainer").innerHTML += `
     <div id='miniCard${k}' onclick="showCard('${namePokemon}')" class="mini_card">
     <h3 id="miniCardName">${namePokemon}</h3>
     <div class="category_and_image">
       <p id="miniCardCategory">Kategorie</p>
       <img id="miniCardImage" src="img1.jpg" />
     </div>
   </div>`;

    pokemonNames.push(namePokemon); // brauch ich nicht
    // console.log("Pokemon-Namen:", pokemonNames);
  }
}

function renderMiniCards() {
  for (let l = 0; l < array.length; l++) {
    const element = array[l];
  }
}

// Popup

let currentPokemon;
let statNames = [];
let statValues = [];

// Click auf die Karte
// In der onlclick-Funktion muss úbergeben werden, um welche Karte es sich handelt (index) und wie der Name des Pokemon ist, damit man die URL anpassen kann, die die Informationen beinhaltet nach der das Popup mit Daten gefüllt werden kann.
// Das Popup muss erstellt werden mit allen Infos.
// Dem popup muss muss das d_none entfernt werden.

function showCard(namePokemon) {
  // function showCard(param, namePokemon) {
  // das popup muss gerendert werden. Wenn es noch nicht da ist, ist auch noch keine id da bei der d_none removed werden kann.
  document.getElementById("popup").classList.remove("d_none");
  loadPokemon(namePokemon);
  renderPopup();
  renderPopup();
}

function renderPopup() {
  //   loadPokemon(namePokemon);
  renderPokemonName();
  renderPokemonImage();
  renderPokemonCategory();
  renderStats(); // Todo: Umbennen - hier wird nur gepusht.
  renderChart();
}

async function loadPokemon(namePokemon) {
  let url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`; // hier kann ich pokemonNames einsetzen.
  let response = await fetch(url);
  currentPokemon = await response.json();

  console.log("Loaded Pokemon", currentPokemon);

  //   loadPokemons(); // gehört noch zu Main
}

function renderPokemonName() {
  document.getElementById("pokemonName").innerHTML = namePokemon;
  // Todo: Nochmal so versuchen!
  //   let name = await currentPokemon["name"];
  //   let nameWithCapitalLetter = toUpperCase(name);
  //   document.getElementById("pokemonName").innerHTML = nameWithCapitalLetter;
}

function renderPokemonImage() {
  document.getElementById("pokemonImage").src = currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
}

function renderPokemonCategory() {
  document.getElementById("pokemoncategory").innerHTML = currentPokemon["types"]["0"]["type"]["name"];
}

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
