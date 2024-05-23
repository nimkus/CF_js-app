"Use strict"

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Function to remove the class of an element
  function removeClass (element, classToRemove) {
    element.classList.remove(classToRemove);
  }
  // Function to push a new listItem to a list
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

      //Create a formated string that contains the types of pokemon
      let pokemonTypesList = [];
      
      let typeArray = details.types;
      typeArray.forEach(function (item) {
        let pokemonTypes = item.type.name;
        addListItem(pokemonTypes, pokemonTypesList);
      });

      item.types = pokemonTypesList.join(', ');
      console.log(item.types);
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
  
        modalContainer.innerHTML = '';
        modalContainer.classList.add('is-visible');

        //Create Modal
        let modal = document.createElement('div');
        
        modal.classList.add('modal');

        modalContainer.appendChild(modal);

        //Get modal title
        let pokName = document.createElement('h1');

        pokName.classList.add('modal-h1');
        pokName.innerText = pokemon.name;

        modal.appendChild(pokName);

        //Get modal image
        let pokImg = document.createElement('img');
      
        pokImg.classList.add('modal-img');
        pokImg.src = pokemon.imageUrl;

        modal.appendChild(pokImg);

        //Get modal text
        let pokHeight = document.createElement('p');
        let pokTypes = document.createElement('p');

        pokHeight.classList.add('modal-p');
        pokTypes.classList.add('modal-p');

        pokHeight.innerText = 'Height: ' + pokemon.height;
        pokTypes.innerText = 'Types: ' + pokemon.types;

        modal.appendChild(pokHeight);
        modal.appendChild(pokTypes);

        //Create close button for modal
        let closeButton = document.createElement('button');

        closeButton.classList.add('modal-close');
        closeButton.innerText = "x close";

        modal.appendChild(closeButton);

        //Function: Hide modal and 
        function hideModal() {
          let modalContainer = document.querySelector('#modal-container');
          removeClass (modalContainer, 'is-visible')
          let activeButton = document.querySelector('.selected-pokemon');
          removeClass (activeButton, 'selected-pokemon');
        }

        //Hide modal: Click close button
        closeButton.addEventListener('click', hideModal);

        //Hide modal: press ESC
        window.addEventListener('keydown', (event) => {
          let modalContainer = document.querySelector('#modal-container');
          if (event.key = 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
          }
        });

        //Hide modal: click outside modal 
        modalContainer.addEventListener('click', (event) => {
          let target = event.target;
          if (target == modalContainer) {
            hideModal();
          }
        });

      });
    };
  
  function createEvListener(element, object) { 
    element.addEventListener("click", function () {
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
    addListItem: addListItem,
    createPok: createPok,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// Adds Pokemon via Pokemon-API
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.createPok(pokemon);
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
    pokemonRepository.addListItem(pokObject, pokemonList);
    pokemonRepository.createPok(pokObject);
  }
});

