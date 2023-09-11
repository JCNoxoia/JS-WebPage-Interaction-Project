//array of objects with a name, height, and type attribute
pokemonList = [
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

//Loop will iterate over pokemonList and print name and height in DOM
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < 1.1) {
        document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + 'm)<br><br>'); //I tried using \n at first, had to look up the <br> method.
    } else { //adds a comment to the end of the line if height is greater than 1m
        document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + 'm) - Wow, that\'s big!<br><br>');
    }
}