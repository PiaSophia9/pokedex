let pokemonNames = [];
let pokemonInfos = [];
let statNames = [];
let statValues = [];

// Anfang: holt alle Namen aus der API und speichert sie in pokemonNames.
async function load20PokemonInfos() {
  let url20Pokemon = "https://pokeapi.co/api/v2/pokemon/";
  let nameAndUrlOf20Pokemon = await fetch(url20Pokemon);
  let nameAndUrlOf20PokemonJson = await nameAndUrlOf20Pokemon.json();
  let infoAllpokemons = nameAndUrlOf20PokemonJson["results"];
  load20PokemonNames(infoAllpokemons);
}
async function load20PokemonNames(infoAllpokemons) {
  for (let i = 0; i < infoAllpokemons.length; i++) {
    let namePokemon = infoAllpokemons[i]["name"];
    pokemonNames.push(namePokemon);
    console.log("pokemonnames", pokemonNames);
  }
}
// Ende: holt alle Namen aus der API und speichert sie in pokemonNames.

// Anfang: Gibt Zugriff auf das Objekt eines einzelnen Pokemons und speichert sie im Array pokemonInfos.
async function loadPokemonInfo() {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`;
  let response = await fetch(url);
  let pokemonInfo = await response.json();
  pokemonInfos.push(pokemonInfo);
  console.log("pokemoninfos", pokemonInfos);
}
// Ende: Gibt Zugriff auf das Objekt eines einzelnen Pokemons und speichert sie im Array pokemonInfos.

// Ein Popup daraus machen

// Viele mini Cards daraus machen.

// function renderMiniCard(index) {
//   let pokemonName = currentPokemon["name"];
//   let pokemonCategory = currentPokemon["types"]["0"]["type"]["name"];
//   let currentPokemonImageSrc = currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
//   let backgroundColor = getBackgroundColor(currentPokemonCategory);
//   document.getElementById("mainContainer").innerHTML += generateMiniCard(index, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc);
// }

// function generateMiniCard(i, backgroundColor, currentPokemonName, currentPokemonCategory, currentPokemonImageSrc) {
//   return `
//   <div id='miniCard${i}' onclick="showPopup('${i}', '${backgroundColor}', '${currentPokemonName}', '${currentPokemonCategory}', '${currentPokemonImageSrc}')" class="mini_card" style="background-color: ${backgroundColor};">
//      <div class="container_name_and_category">
//      <h3 id="miniCardName">${currentPokemonName}</h3>
//        <p id="miniCardCategory">${currentPokemonCategory}</p>
//        </div>
//        <img id="miniCardImage" src="${currentPokemonImageSrc}" />
//    </div>`;
// }

// function getBackgroundColor(currentPokemonCategory) {
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
//   }
// }
