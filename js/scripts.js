let pokemonRepository = (function() {
    //array of objects with a name, height, and type attribute
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// methods for addListItems
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }

    function logDetails(button, pokemon) {
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        })
    }

//Function called to show modal on pokemon button press    
    function showPokeModal() {
      let modal = document.querySelector('#poke-banner');
      modal.classList.add('is-visible');
    }

// loop to add pokemon buttons to DOM and log them in console
    function addListItem(pokemon) {
        let pmListBlock = document.querySelector('.pokemon-list');
        let pmListBlockItem = document.createElement('li');
        pmListBlockItem.classList.add('poke-list-item');
    
        let pokeButton = document.createElement('button');
        pokeButton.innerText = pokemon.name;
        pokeButton.classList.add('poke-button');
    
        pmListBlockItem.appendChild(pokeButton);
        pmListBlock.appendChild(pmListBlockItem);

        logDetails(pokeButton, pokemon);

        //Event listener for modal
        pokeButton.addEventListener('click', function() {
          showPokeModal();
        })
    }

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails
    }

})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });

//New forEach() loop added for Exercise 1.5 to replace for loop above
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

fetch('https://pokeapi.co/api/v2/pokemon/?limit=150').then(function (response) {
  return response.json();
}).then(function (pokemonList) {
  console.log(pokemonList);
}).catch(function () {
  console.error('An error has occured.')
});

