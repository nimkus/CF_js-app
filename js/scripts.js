"Use strict"

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
    }
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write('<p>' + pokemonList[i].name + ' has a height of ' + pokemonList[i].height + 'm.');
  if (pokemonList[i].height >= 0.7) {
    document.write(' ---> Wow, that’s big!</p>');
  }
  else {
    document.write('</p>');
  }
}