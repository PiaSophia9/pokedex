let currentPokemon;

async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander";
  let response = await fetch(url);
  currentPokemon = await response.json();

  console.log("Loaded Pokemon", currentPokemon);

  renderPokemonInfo();
}

function renderPokemonInfo() {
  renderPokemonName();
  renderPokemonImage();
  renderPokemonCategory();
  renderStats();
}

function renderPokemonName() {
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
}

function renderPokemonImage() {
  document.getElementById("pokemonImage").src = currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
}

function renderPokemonCategory() {
  document.getElementById("pokemoncategory").innerHTML = currentPokemon["types"]["0"]["type"]["name"];
}

let statNames = [];

function renderStats() {
  let currentPokemonStats = currentPokemon["stats"];
  for (let i = 0; i < currentPokemonStats.length; i++) {
    const statName = currentPokemonStats[i]["stat"]["name"];
    statNames.push(statName);
  }
  console.log(statNames);

  //     document.getElementById("pokemonStatsHpName").innerHTML = currentPokemon["stats"]["0"]["stat"]["name"]; //hp
  //   document.getElementById("pokemonStatsHpValue").innerHTML = currentPokemon["stats"]["0"]["base_stat"]; // 39
  //   let pokemonStatsHpName = currentPokemon["stats"]["0"]["stat"]["name"]; //hp
  //   let pokemonStatsHpValue = currentPokemon["stats"]["0"]["base_stat"]; // 39

  //   document.getElementById("pokemonStatsAttackName").innerHTML = currentPokemon["stats"]["1"]["stat"]["name"]; //attack
  //   document.getElementById("pokemonStatsAttackValue").innerHTML = currentPokemon["stats"]["1"]["base_stat"]; //

  //   document.getElementById("pokemonStatsDefenseName").innerHTML = currentPokemon["stats"]["2"]["stat"]["name"]; //defense
  //   document.getElementById("pokemonStatsDefenseValue").innerHTML = currentPokemon["stats"]["2"]["base_stat"]; //

  //   document.getElementById("pokemonStatsSpecialAttackName").innerHTML = currentPokemon["stats"]["3"]["stat"]["name"]; //special-attack
  //   document.getElementById("pokemonStatsSpecialAttackValue").innerHTML = currentPokemon["stats"]["3"]["base_stat"]; //

  //   document.getElementById("pokemonStatsSpecialDefenseName").innerHTML = currentPokemon["stats"]["4"]["stat"]["name"]; //special-defense
  //   document.getElementById("pokemonStatsSpecialDefenseValue").innerHTML = currentPokemon["stats"]["4"]["base_stat"]; //

  //   document.getElementById("pokemonStatsSpeedName").innerHTML = currentPokemon["stats"]["5"]["stat"]["name"]; //speed
  //   document.getElementById("pokemonStatsSpeedValue").innerHTML = currentPokemon["stats"]["5"]["base_stat"]; //
}
