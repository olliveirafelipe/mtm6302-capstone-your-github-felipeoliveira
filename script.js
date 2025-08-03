const container = document.getElementById("pokemonContainer");
const loadMoreBtn = document.getElementById("loadMore");
let offset = 1;
const limit = 6;
const captured = new Set();

function createPokemonCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundColor = getColorFromTypes(pokemon.types);

  const header = document.createElement("div");
  header.classList.add("card-header");

  const nameEl = document.createElement("div");
  nameEl.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const numberEl = document.createElement("div");
  numberEl.textContent = `#${pokemon.id.toString().padStart(3, "0")}`;
  numberEl.style.opacity = "0.4";

  header.appendChild(nameEl);
  header.appendChild(numberEl);

  const types = document.createElement("div");
  types.classList.add("types");

  pokemon.types.forEach(typeInfo => {
    const type = document.createElement("div");
    type.classList.add("type");
    type.textContent = typeInfo.type.name;
    types.appendChild(type);
  });

  const img = document.createElement("img");
  img.src = pokemon.sprites.other["official-artwork"].front_default;
  img.alt = pokemon.name;
  img.classList.add("pokemon-image");

  card.appendChild(header);
  card.appendChild(types);
  card.appendChild(img);

  card.addEventListener("click", () => {
    if (!captured.has(pokemon.id)) {
      const pokeball = document.createElement("img");
      pokeball.src = "pokeball.svg";
      pokeball.classList.add("pokeball-icon");
      nameEl.prepend(pokeball);
      captured.add(pokemon.id);
    }
  });

  container.appendChild(card);
}

function getColorFromTypes(types) {
  const mainType = types[0].type.name;
  const typeColors = {
    fire: "#F08030",
    grass: "#78C850",
    water: "#6890F0",
    electric: "#F8D030",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0"
  };
  return typeColors[mainType] || "#888";
}

async function loadPokemon() {
  for (let i = offset; i < offset + limit; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();
    createPokemonCard(data);
  }
  offset += limit;
}

loadMoreBtn.addEventListener("click", loadPokemon);

loadPokemon();
