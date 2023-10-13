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
        showPokeModal(pokemon.imageUrl, pokemon.name, pokemon.height, pokemon.types);
      });
    }

    function logDetails(button, pokemon) {
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        })
    }

//Functions to hide modal on close button, esc key, and click on outside of modal
    function hidePokeModal() {
      let modalContainer = document.querySelector('#poke-banner');
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#poke-banner');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hidePokeModal();  
      }
    });

//Function called to show modal on pokemon button press    
    function showPokeModal(spriteUrl, name, height, types) {
      let modalContainer = document.querySelector('#poke-banner');
      modalContainer.innerHTML = '';

      let modalImage = document.createElement('div');
      modalImage.classList.add('poke-banner__image-container');

      let spriteBox = document.createElement('div');
      spriteBox.classList.add('sprite-box');

      let pokeSprite = document.createElement('img');
      pokeSprite.src = spriteUrl;
      pokeSprite.width = 300;
      pokeSprite.height = 300;
      
      let modalText = document.createElement('div');
      modalText.classList.add('poke-banner__text-container');

      let pokeDescription = document.createElement('p');
      pokeDescription.innerText = name + height + types;

      let closeButton = document.createElement('button');
      closeButton.classList.add('modal-close');
      closeButton.innerText = 'Close';
      closeButton.addEventListener('click', hidePokeModal);

      modalImage.appendChild(spriteBox);
      spriteBox.appendChild(pokeSprite);
      modalText.appendChild(pokeDescription);
      modalContainer.appendChild(modalImage);
      modalContainer.appendChild(modalText);
      modalContainer.appendChild(closeButton);

      modalContainer.classList.add('is-visible');

      screenContainer = document.querySelector('#screen-container');
      screenContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === screenContainer) {
          hidePokeModal();
        };
      });

      welcomeBanner = document.querySelector('#welcome-banner');
      welcomeBanner.addEventListener('click', (e) => {
        let target = e.target;
        if (target === welcomeBanner) {
          hidePokeModal();
        };
      });
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

