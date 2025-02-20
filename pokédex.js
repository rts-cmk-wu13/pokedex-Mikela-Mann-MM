document.addEventListener("DOMContentLoaded", () => {
    const pokedexContainer = document.querySelector(".pokedex-container");
    const searchBar = document.querySelector(".search-bar");

    // Henter data fra PokéAPI
    async function fetchPokemonData() {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
            const data = await response.json();

            // Henter detaljer om hver Pokémon
            const pokemonDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    return res.json();
                })
            );

            displayPokemon(pokemonDetails);
        } catch (error) {
            console.error("Fejl ved hentning af data:", error);
        }
    }

    // Funktion til at vise Pokémon-kort
    function displayPokemon(pokemonList) {
        pokedexContainer.innerHTML = ""; // Ryd tidligere indhold

        pokemonList.forEach((pokemon) => {
            const card = document.createElement("div");
            card.classList.add("pokemon-card");

            card.innerHTML = `
                <p class="pokemon-number">#${pokemon.id}</p>
                <div class="pokemon-image">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                </div>
                <p class="pokemon-name">${capitalize(pokemon.name)}</p>
            `;

            pokedexContainer.appendChild(card);
        });
    }

    // Funktion til at formatere navne med stort forbogstav
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Funktion til søgefilter
    searchBar.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const allCards = document.querySelectorAll(".pokemon-card");

        allCards.forEach((card) => {
            const pokemonName = card.querySelector(".pokemon-name").textContent.toLowerCase();
            card.style.display = pokemonName.includes(searchTerm) ? "block" : "none";
        });
    });

    fetchPokemonData(); // Kald funktionen ved load
});
