"Use strict"

let pokemonRepository = (function () {

  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass', 'poison']
    },
    {
      name: 'Charmander',
      height: 0.6,
      types: ['fire']
    },
    {
      name: 'Squirtle',
      height: 0.5,
      types: ['water']
    },
    {
      name: "Golbat",
      height: 1.6,
      types: ["flying", "poison"]
    },
    {
      name: "Alakazam",
      height: 1.5,
      types: ["psychic"]
    },
  ];

  function createNewPokemon(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
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

  function showDetails(pokemon) {
    console.log(pokemon);
  };

  function createEvListener(element, object) { 
    element.addEventListener("click", function (event) {
      showDetails(object);
    });
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
  
  return {
    getAll: getAll,
    createNewPokemon: createNewPokemon,
    addListItem: addListItem,
  };
})();

pokemonRepository.createNewPokemon({ name: "Pikachu", height: 0.3, types: ["electric"] }); 

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
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
