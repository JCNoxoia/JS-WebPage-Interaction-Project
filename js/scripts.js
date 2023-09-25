let pokemonRepository = (function() {
    //array of objects with a name, height, and type attribute
    let pokemonList = [
        {
            name: 'Pikachu',
            height: 0.4,
            type: ['electric']
        },
        {
            name: 'Mimikyu',
            height: 0.2,
            type: ['ghost', 'fairy']
        },
        {
            name: 'Squirtle',
            height: 0.5,
            type: ['water']},
        {
            name: 'Jigglypuff',
            height: 0.5,
            type: ['normal', 'fairy']
        },
        {
            name: 'Luxray',
            height: 1.4,
            type: ['electric']
        },
        {
            name: 'Cyndaquil',
            height: 0.5,
            type: ['fire']
        },
        {
            name: 'Mareep',
            height: 0.6,
            type: ['electric']
        },
        {
            name: 'Beedrill',
            height: 1.0,
            type: ['bug', 'poison']
        }
    ];

// subfunctions for addListItems
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function logDetails(button, pokemon) {
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        })
    }

// loop to add pokemon buttons to DOM and log them in console
    function addListItem(pokemon) {
        let pmListBlock = document.querySelector('.pokemon-list');
        let pmListBlockItem = document.createElement('li');
    
        let pokeButton = document.createElement('button');
        pokeButton.innerText = pokemon.name;
        pokeButton.classList.add('poke-button');
    
        pmListBlockItem.appendChild(pokeButton);
        pmListBlock.appendChild(pmListBlockItem);

        logDetails(pokeButton, pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

//New forEach() loop added for Exercise 1.5 to replace for loop above
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});