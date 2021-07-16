let generalList = [];
let myList = [];

function addToMyList(pokemon) {
  myList.push(pokemon);
  generalList = generalList.filter((p) => {
    return p !== pokemon;
  });
  displayPokemon();
}

function removeFromMyList(pokemon) {
  generalList.push(pokemon);
  myList = myList.filter((p) => {
    return p !== pokemon;
  });
  displayPokemon();
}

function displayPokemon() {
  const generalUl = document.querySelector("ul.general-list");
  generalUl.innerHTML = "";
  generalList.forEach((p) => {
    generalUl.append(createPokemonLi(p, addToMyList));
  });

  const myUl = document.querySelector("ul.my-list");
  myUl.innerHTML = "";

  myList.forEach((p) => {
    myUl.append(createPokemonLi(p, removeFromMyList));
  });
}

function createPokemonLi(pokemon, clickHandler) {
  const li = document.createElement("li");
  li.addEventListener("click", (e) => {
    clickHandler(pokemon);
  });
  li.innerText = pokemon.name;
  const img = document.createElement("img");
  img.src = pokemon.sprites.front_default;
  li.append(img);
  return li;
}

function fetchPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then((r) => r.json())
    .then((data) => {
      data.results.forEach((p) => {
        fetch(p.url)
          .then((r) => r.json())
          .then((data) => {
            if (
              !myList.find((p) => {
                p.id == data.id;
              })
            ) {
              generalList.push(data);
              displayPokemon();
            }
          });
      });
    });
}

function fetchLists() {
  fetch("http://localhost:3000/pokemon")
    .then((r) => r.json())
    .then((data) => {
      myList = data;
      fetchPokemon();
    });
}

fetchLists();
