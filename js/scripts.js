"Use strict"

let pokemonRepository = (function () {

  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      type: ['grass', 'poison']
    },
    {
      name: 'Charmander',
      height: 0.6,
      type: ['fire']
    },
    {
      name: 'Squirtle',
      height: 0.5,
      type: ['water']
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

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
    else {
      console.alert('You can only add objects to repository!');
    }
  }

  function getAll() {
    return pokemonList;
  }
  
  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write('<p>' + pokemon.name + ' has a height of ' + pokemon.height + 'm.');
  if (pokemon.height >= 0.7) {
    document.write(' ---> Wow, that’s big!</p>');
  }
  else {
    document.write('</p>');
  }
});

/* On a new line in your text editor, declare a function by starting with the keyword function.
Specify the name of your new function. This can be something like divide or div.
You’ll need two parameters—a dividend and a divisor.
Start the body of your function with an if-else statement that checks whether the divisor is equal to zero. If it is, return the message “You’re trying to divide by zero.” Otherwise (else), return the value of the dividend divided by the divisor. */

function divide(dividend, divisor) {
  if (divisor === 0) {
    return "You’re trying to divide by zero."
  } else {
    let result = dividend / divisor;
    return result;
  }
}