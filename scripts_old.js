"Use strict"

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Function to remove the class of an element
  function removeClass(element, classToRemove) {
    element.classList.remove(classToRemove);
  }
  // Function to push a new listItem to a given list
  function addListItem(listItem, list) {
    list.push(listItem);
  }

  // Fetches Pokemon-List and Detail-Info from the Pokemon-API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;

      //Gets and formats the types of the pokemon + lists them seperated by comma
      let pokemonTypesList = [];
      let typeArray = details.types;
      typeArray.forEach(function (item) {
        let pokemonTypes = item.type.name;
        addListItem(pokemonTypes, pokemonTypesList);
      });
      item.types = pokemonTypesList.join(', ');

    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadList() {
    return fetch(apiURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        addListItem(pokemon, pokemonList);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Get all pokemon of the pokemon-List
  function getAll() {
    return pokemonList;
  }

  // Creates a visual representation of the Pokemon-List on the Webpage
  function createPok(pokemon) {
    let pokeContainer = document.querySelector('#poke-container');

    //Create ul as container for list of pokemon
    let pokemonList = document.createElement('ul');
    pokemonList.classList.add('list-group');
    pokeContainer.append(pokemonList);

    //Create each pokemon as list-item in the shape of a button
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'pokemon-list-item');
    pokemonList.appendChild(listItem);

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-light', 'btn-custom');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#poke-modal');
    button.innerText = pokemon.name;
    listItem.appendChild(button);

    // Eventlistener that marks the selected pokemon
    createEvListener(button, pokemon);
  }

  // Show Pokemon-Details on Click
  function showDetails(pokemon) {


      //
      let closeButton = document.querySelector('.close');

      closeButton.addEventListener('click', (event) => {
        let selectedPokemon = document.getElementsByClassName('selected-pokemon');
      let selectedPokemonArray = Array.from(selectedPokemon);
      selectedPokemonArray.forEach(function (remove) {
        remove.classList.remove('selected-pokemon');
      });
      });
  };

  function createEvListener(element, object) {
    element.addEventListener("click", function () {
      showDetails();

      // Remove .selected-pokemon class from previously selected pokemon and add it to the current one
      let selectedPokemon = document.getElementsByClassName('selected-pokemon');
      let selectedPokemonArray = Array.from(selectedPokemon);
      selectedPokemonArray.forEach(function (remove) {
        remove.classList.remove('selected-pokemon');
      });
      element.classList.add('selected-pokemon');

    });
  }

  // Defining Return
  return {
    getAll: getAll,
    addListItem: addListItem,
    createPok: createPok,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// Adds Pokemon via Pokemon-API
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.createPok(pokemon);
  });
});




// This adds Pokemons that are entered via the HTML Form
let pokemonForm = document.getElementById("pokemon-form");
pokemonForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let pokName = document.getElementById("pokemon-name").value;

  if (pokName.trim().length == 0) {
    alert('Please enter a valid Pokemon Name');
  } else {
    let pokObject = { name: pokName, height: 0.3, types: ["electric"] };
    pokemonRepository.addListItem(pokObject, pokemonList);
    pokemonRepository.createPok(pokObject);
  }
});

