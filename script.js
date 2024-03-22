let currentPokemon;
let statNames = [];
let statValues = [];

async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander"; // hier kann ich pokemonNames einsetzen.
  let response = await fetch(url);
  currentPokemon = await response.json();

  console.log("Loaded Pokemon", currentPokemon);

  renderPokemonInfo();

  loadPokemons(); // gehört noch zu Main
}

function renderPokemonInfo() {
  renderPokemonName();
  renderPokemonImage();
  renderPokemonCategory();
  renderStats(); // Todo: Umbennen - hier wird nur gepusht.
  renderChart();
}

function renderPokemonName() {
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
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

// Main

let pokemonNames = []; // brauch ich nicht

async function loadPokemons() {
  let url = "https://pokeapi.co/api/v2/pokemon/"; // Leider kann man hier nicht die Kategorie und auch nicht das Bild laden. Vltt kann man diese URL verwenden, um den Namen, der hier ausgespuckt wird, in einer anderen Funktion nutzen, die dann auf die einzelnen Pokemon zugreift. Die Namen kann ich oben in Zeile 6 eingeben. Oder doch einfach ein array mit den namen machen?
  let response = await fetch(url);
  allPokemon = await response.json();

  console.log("Pokemons", allPokemon);
  let namespokemons = allPokemon["results"];
  for (let k = 0; k < namespokemons.length; k++) {
    const namePokemon = namespokemons[k]["name"];
    document.getElementById("mainContainer").innerHTML += `<div class="mini_card">
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
