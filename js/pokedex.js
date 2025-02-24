document.addEventListener("DOMContentLoaded", () => {
    let mainElm = document.querySelector("main");

    if (!mainElm) {
        mainElm = document.createElement("main");
        document.body.appendChild(mainElm);
    }

    let headerElm = document.createElement("header");
    headerElm.classList.add("header");
    headerElm.innerHTML = `
        <img src="/icons/pokeball.png">
        <h1>Pokédex</h1>
    `;
    mainElm.appendChild(headerElm);

    let sectionElm = document.createElement("section");
    sectionElm.classList.add("pokelist");

    let searchContainer = document.createElement("section");
    searchContainer.classList.add("search-container");
    searchContainer.innerHTML = `
        <input type="text" placeholder="Search" class="search-bar">
        <button class="filter-btn"><img src="/icons/text_format.png"></button>
    `;
    sectionElm.appendChild(searchContainer);

    let divElm = document.createElement("section");
    divElm.classList.add("pokedex-container");
    sectionElm.appendChild(divElm);

    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            return Promise.all(data.results.map(pokemon => fetch(pokemon.url).then(res => res.json())));
        })
        .then(pokemonList => {
            divElm.innerHTML = pokemonList.map(pokemon => {
                let id = pokemon.id;
                return `
                    <article class="pokemon-card" data-id="${id}">
                        <p class="pokemon-number">#${id}</p>
                        <div class="pokemon-image">
                            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                        </div>
                        <p class="pokemon-name">${capitalize(pokemon.name)}</p>
                    </article>
                `;
            }).join("");

            document.querySelectorAll(".pokemon-card").forEach(card => {
                card.addEventListener("click", () => {
                    const pokemonId = card.getAttribute("data-id");
                    window.location.href = `details.html?id=${pokemonId}`;
                });
            });
        })
        .catch(error => console.error("Error fetching Pokémon data:", error));

    mainElm.appendChild(sectionElm);

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    document.addEventListener("input", (event) => {
        if (event.target.matches(".search-bar")) {
            const searchTerm = event.target.value.toLowerCase();
            const allCards = document.querySelectorAll(".pokemon-card");

            allCards.forEach((card) => {
                const pokemonName = card.querySelector(".pokemon-name").textContent.toLowerCase();
                card.style.display = pokemonName.includes(searchTerm) ? "block" : "none";
            });
        }
    });
});
