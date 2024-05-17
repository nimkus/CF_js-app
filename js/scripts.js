"Use strict"

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Push a new Pokemon to Pokemon-List 
  function pushNewPokemon(pokemon) {
    if (
      typeof pokemon === 'object'
    ) {
      pokemonList.push(pokemon);
    }
    else {
      alert('You have tried to add a pokemon that is not an object!');
      console.error('You have tried to add a pokemon that is not an object!');
    }
  }

  // Fetches Pokemon-List and Detail-Info from the Pokemon-API
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

  function loadList() {
    return fetch(apiURL).then(function(response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        pushNewPokemon(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Get all pokemon of the Pokemon-List
  function getAll() {
    return pokemonList;
  }

  // Creates a visual representation of the Pokemon-List on the Webpage
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

  // Show Pokemon-Details on Click
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        //Get Modal Container
        let modalContainer = document.querySelector('#modal-container');
        //Clear current modal content
        modalContainer.innerHTML = '';
        //Set container to visible
        modalContainer.classList.add('is-visible');

        //Create Modal
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modalContainer.appendChild(modal);

        //Create close button for modal
        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = "x close";
        modal.appendChild(closeButton);

        //Create modal title
        let pokName = document.createElement('h1');
        pokName.classList.add('modal-h1');
        pokName.innerText = pokemon.name;
        modal.appendChild(pokName);

        //Create modal image
        let pokImg = document.createElement('img');
        pokImg.classList.add('modal-img');
        pokImg.src = pokemon.imageUrl;
        modal.appendChild(pokImg);
      });
    }
  
  function createEvListener(element, object) { 
    element.addEventListener("click", function (event) {
      showDetails(object);

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
    createNewPokemon: pushNewPokemon,
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

