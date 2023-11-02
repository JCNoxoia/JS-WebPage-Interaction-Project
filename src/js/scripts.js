let pokemonRepository = (function() {
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

// Function called to show modal on pokemon button press    
    function showPokeModal(spriteUrl, name, height, types) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty()

    let pokemonName = $('<h1>' + name + '</h1>');
    let pokemonSprite = $('<img class="modal-img" style="width:50%">');
    pokemonSprite.attr("src", spriteUrl)

    let pokemonHeight = $('<p>' + 'Height : ' + height + '</p>');
    
    // let pokemonTypes = $('<p>' + 'Types : ' + types[0].type.name + '</p>')
    modalTitle.append(pokemonName);
    modalBody.append(pokemonSprite);
    modalBody.append(pokemonHeight);
    // modalBody.append(pokemonTypes);
    };


// loop to add pokemon buttons to DOM and log them in console
    function addListItem(pokemon) {
        let pmListBlock = document.querySelector('.list-group');
        let pmListBlockItem = document.createElement('li');
        pmListBlockItem.classList.add('list-group-item');
        // pmListBlockItem.classList.add('poke')
    
        let pokeButton = document.createElement('button');
        pokeButton.innerText = pokemon.name;
        pokeButton.classList.add('btn');
        pokeButton.classList.add('btn-primary');
        pokeButton.classList.add('btn-block');
        pokeButton.setAttribute('type', 'button');
        pokeButton.setAttribute('data-toggle', 'modal');
        pokeButton.setAttribute('data-target', '.modal');
        
    
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

