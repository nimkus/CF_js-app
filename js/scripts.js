"use strict"

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function to push a new listItem to a given list
  function addListItem(listItem, list) {
    list.push(listItem);
  }

  // Function to display an error message
  function displayErrorMessage(message) {
    let errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.innerText = message;
    document.body.appendChild(errorMessage);
  }

  // Fetches Pokemon-Name and Details-URL from the Pokemon-API
  function loadList() {
    return fetch(apiURL).then(function (response) {
      // Error message in case of network failure
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Return JSON to be parsed
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        addListItem(pokemon, pokemonList);
      });
    }).catch(function (error) {
      displayErrorMessage('Failed to load the Pokémon list. Please try again later.');
      console.error(error);
    })
  }

  // Fetches Pokemon-Detail-Info from the Pokemon-API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      // Error message in case of network failure
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Return JSON to be parsed
      return response.json();
    }).then(function (details) {
      //Gets and formats the types of the pokemon + lists them seperated by comma
      let typeArray = details.types;
      let pokemonTypesList = [];
      typeArray.forEach(function (item) {
        let pokemonTypes = item.type.name;
        addListItem(pokemonTypes, pokemonTypesList);
      });
      // Types of Pokemon
      item.types = pokemonTypesList.join(', ');
      // Image of Pokemon
      item.imageUrl = details.sprites.other.dream_world.front_default;
      // Height of Pokemon
      item.height = details.height;

    }).catch(function (error) {
      displayErrorMessage('Failed to load Pokémon details. Please try again later.');
      console.error(error);
    });
  }

  // Get all pokemon of the pokemon-List
  function getAll() {
    return pokemonList;
  }

  // Creates a visual representation of the Pokemon-List on the Webpage
  function createPok(pokemon) {
    let pokeContainer = document.querySelector('.poke-container');

    //Create ul as container for list of pokemon
    let pokemonList = document.createElement('ul');
    pokemonList.classList.add('list-group', 'pokemon-list');
    pokeContainer.appendChild(pokemonList);

    //Create each pokemon as list-item in the shape of a button
    let listItem = document.createElement('li');
    listItem.classList.add('pokemon-list-item');
    pokemonList.appendChild(listItem);

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-light', 'btn-custom');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#poke-modal');
    button.innerText = pokemon.name;
    listItem.appendChild(button);

    // Add a delay in showing the Pokemon list for smoother loading and better user experience
    setTimeout(() => {
      pokemonList.classList.add('visible');
      let loadingMessage = document.getElementById('message-remove');
      if (loadingMessage) { loadingMessage.remove(); }
    }, 100);

    // Create an Pokemon preview image 
    loadDetails(pokemon).then(function () {
      let image = document.createElement('img');
      image.setAttribute('src', pokemon.imageUrl);
      image.setAttribute('alt', 'Preview image of Pokemon');
      image.classList.add('img-fluid', 'pok-img-custom');
      button.appendChild(image);
    });

    // Eventlistener that marks the selected pokemon
    button.addEventListener("click", function () {
      // Remove .selected-pokemon class from previously selected pokemon
      let selectedPokemon = document.getElementsByClassName('selected-pokemon');
      let selectedPokemonArray = Array.from(selectedPokemon);
      selectedPokemonArray.forEach(function (remove) {
        remove.classList.remove('selected-pokemon');
      });

      // Add .selected-pokemon class from  selected pokemon
      button.classList.add('selected-pokemon');

      // Gets and displays pokemon detail in modal
      showDetails(pokemon);
    });
  }

  // Show Pokemon-Details on Click
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      // Get modal elements and set them to empty
      let modalTitle = document.querySelector('.modal-title');
      let modalBody = document.querySelector('.modal-body');

      modalTitle.innerHTML = '';
      modalBody.innerHTML = '';

      // Set Pokemon-Name as Title
      let pokName = document.createElement('h1');
      pokName.classList.add('poke-headline');
      pokName.innerText = pokemon.name;
      modalTitle.appendChild(pokName);

      //Get modal text
      let textContainer = document.createElement('div');
      textContainer.classList.add('pok-text-container');

      let pokHeight = document.createElement('p');
      let pokTypes = document.createElement('p');

      pokHeight.classList.add('modal-p');
      pokTypes.classList.add('modal-p');

      pokHeight.innerText = 'Height: ' + pokemon.height;
      pokTypes.innerText = 'Types: ' + pokemon.types;

      modalBody.appendChild(textContainer);
      textContainer.appendChild(pokHeight);
      textContainer.appendChild(pokTypes);

      // Set modal image
      let pokImg = document.createElement('img');
      pokImg.classList.add('modal-img');
      pokImg.src = pokemon.imageUrl;
      modalBody.appendChild(pokImg);
    });
  }

  // Button: Scroll to the top of the page
  let scrollTopBtn = document.getElementById('scroll-to-top');
  if (scrollTopBtn) { 
    scrollTopBtn.addEventListener('click', function () { 
      document.body.scrollTop = 0; 
      document.documentElement.scrollTop = 0; 
    });
  }

  // Search bar to filter Pokemon list by name
  function searchBar() {
    let $searchBar = $('#search-bar');

    $searchBar.on('input', function () {
      let searchValue = $searchBar.val().toLowerCase();
      let filteredPokemon = pokemonList.filter(pokemon => pokemon.name.toLowerCase().startsWith(searchValue));

      // Clear the Pokemon list
      let $pokeContainer = $('.poke-container');
      $pokeContainer.empty();

      // Display a message if the search value does not match any Pokemon, otherwise display the filtered Pokemon
      if (filteredPokemon.length === 0) {
        let message = "No Pokemon with this name exists";
        $pokeContainer.text(`${message}`);
      } else {
        filteredPokemon.forEach(pokemon => {
          createPok(pokemon);
        });
      }
    });
  }
  searchBar();

  // Defining Return
  return {
    getAll: getAll,
    addListItem: addListItem,
    createPok: createPok,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// Adds Pokemon via Pokemon-API
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.createPok(pokemon);
  });
});

