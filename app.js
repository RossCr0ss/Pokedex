const pokedex = document.getElementById("pokedex");
const containerInfo = document.getElementById("container-info")
let pageItems=12;

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= pageItems; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    
    const pokemonHTMLString = pokemon.map(pokeman => `
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}" />
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">${pokeman.type}</p>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;

};

const selectPokemon = async(id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    displayinfo(pokeman);
};

const displayinfo = (pokeman) => {
    
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const stats = pokeman.stats;
    
    const image = pokeman.sprites['front_default'];
    const HTMLString = `
    <div class="container-info">
        <div class="card">
            <img class="card-image-l" src="${image}" />
            <h2 class="card-title">${pokeman.name} #${pokeman.id}</h2>
            <div class="info-attr">
                <table cellpadding="5px" class="table">
                    <tr> 
                        <td>Type:</td>
                        <td>${type}</td>
                    <tr> 
                    <tr> 
                        <td>Attack:</td>
                        <td>${stats[4].base_stat}</td>
                    <tr> 
                    <tr> 
                        <td>Defense:</td>
                        <td>${stats[3].base_stat}</td>
                    <tr> 
                    <tr> 
                        <td>HP:</td>
                        <td>${stats[5].base_stat}</td>
                    <tr>
                    <tr> 
                        <td>SP Attack:</td>
                        <td>${stats[2].base_stat}</td>
                    <tr>  
                    <tr> 
                        <td>SP Defence:</td>
                        <td>${stats[1].base_stat}</td>
                    <tr> 
                    <tr> 
                        <td>Speed:</td>
                        <td>${stats[0].base_stat}</td>
                    <tr> 
                    <tr> 
                        <td>Moves:</td>
                        <td>${pokeman.moves.length}</td>
                    <tr> 
                        <td>Height:</td>
                        <td>${pokeman.height}</td>
                    </tr>
                    <tr> 
                        <td>Weight:</td>
                        <td>${pokeman.weight}</td>
                    </tr>
                </table>
                  
                    
                
            </div>
        </div>
    </div>
    `;
    
    containerInfo.innerHTML = HTMLString;
    
}

function loadMore() {
    console.log('page')
    pageItems += 12;
    fetchPokemon();
}

fetchPokemon();
