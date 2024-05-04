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

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
  
    listItem.classList.add('listItem');
    button.classList.add('button');
  
    button.innerText = pokemon.name;
  
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
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


  let pokName = { name: "Pikaddchu", height: 0.3, types: ["electric"] };
  pokemonRepository.createNewPokemon(pokName);

function submitPokemon() {
  const pokName = document.getElementById("pokemon-name").value;
  console.log(pokName.value);
  if(pokName.trim().length == 0) {
    console.log('Please enter a valid Pokemon Name');
  }else{
    pokemonRepository.createNewPokemon({ name: pokName, height: 0.3, types: ["electric"] });
  }
}