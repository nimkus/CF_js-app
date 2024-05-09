"Use strict"

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function createNewPokemon(pokemon) {
    if (
      typeof pokemon === 'object' /*&&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon*/
    ) {
      pokemonList.push(pokemon);
    }
    else {
      alert('You have tried to add a pokemon that is not an object with a name, height and types!');
      console.error('You have tried to add a pokemon that is not an object with a name, height and types!');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
  
    listItem.classList.add('listItem');
    pokemonList.appendChild(listItem);

    button.classList.add('button');
    listItem.appendChild(button);

    button.innerText = pokemon.name;
    createEvListener(button, pokemon);
  }

  function loadList() {
    return fetch(apiURL).then(function(response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        createNewPokemon(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Show Pokemon-Details on Click
  function createEvListener(element, object) { 
    element.addEventListener("click", function (event) {
      showDetails(object);
    });
  }
  
  function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Defining Return
  return {
    getAll: getAll,
    createNewPokemon: createNewPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// Adds Pokemon via Pokemon-API
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// This adds Pokemons that are entered via the HTML Form
let pokemonForm = document.getElementById("pokemon-form");
pokemonForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  let pokName = document.getElementById("pokemon-name").value;

  if(pokName.trim().length == 0) {
    alert('Please enter a valid Pokemon Name');
  }else{
    let pokObject = { name: pokName, height: 0.3, types: ["electric"] };
    pokemonRepository.createNewPokemon(pokObject);
    pokemonRepository.addListItem(pokObject);
  }
});

