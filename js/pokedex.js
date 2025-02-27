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
    <div class="search-wrapper" style="background: none;">
        <img src="/icons/search.png" class="search-icon" alt="Search">
        <input type="text" placeholder="Search" class="search-bar">
    </div>
    <button class="filter-btn"><img src="/icons/text_format.png"></button>`;
    sectionElm.appendChild(searchContainer);

    let divElm = document.createElement("section");
    divElm.classList.add("pokedex-container");
    sectionElm.appendChild(divElm);
    mainElm.appendChild(sectionElm);

    // POP-UP SORTING CARD
    let sortCard = document.createElement("div");
    sortCard.classList.add("sort-card");
    sortCard.innerHTML = `
        <div class="sort-by-options">
            <p>Sort by:</p>
            <div class="sort-options">
            <button class="sort-by-id">Number</button>
            <button class="sort-by-name">Name</button>
            </div>
        </div>
    `;
    document.body.appendChild(sortCard);

    const filterBtn = document.querySelector(".filter-btn");
    filterBtn.addEventListener("click", () => {
        sortCard.classList.toggle("visible");
        const img = filterBtn.querySelector("img");
        img.src = img.src.includes("text_format.png") ? "/icons/tag.png" : "/icons/text_format.png";
    });

    let currentOffset = 0;
    let pokemonList = [];

    function fetchPokemon(offset) {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`)
            .then(response => response.json())
            .then(data => {
                return Promise.all(data.results.map(pokemon => fetch(pokemon.url).then(res => res.json())));
            })
            .then(data => {
                pokemonList = [...pokemonList, ...data];
                renderPokemonList();
            })
            .catch(error => console.error("Error fetching Pokémon data:", error));
    }

    function renderPokemonList() {
        divElm.innerHTML = pokemonList.map(pokemon => {
            let id = String(pokemon.id).padStart(3, "0");
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

        let observedPokemon = divElm.querySelector("article:nth-last-child(5)");
        if (observedPokemon) {
            observer.observe(observedPokemon);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                fetchPokemon(currentOffset);
                currentOffset += 50;
            }
        });
    }, { rootMargin: "100px" });

    fetchPokemon(currentOffset);

    document.querySelector(".sort-by-id").addEventListener("click", () => {
        pokemonList.sort((a, b) => a.id - b.id);
        renderPokemonList();
        sortCard.classList.remove("visible");
    });

    document.querySelector(".sort-by-name").addEventListener("click", () => {
        pokemonList.sort((a, b) => a.name.localeCompare(b.name));
        renderPokemonList();
        sortCard.classList.remove("visible");
    });

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    document.addEventListener("input", (event) => {
        if (event.target.matches(".search-bar")) {
            const searchTerm = event.target.value.toLowerCase();
            document.querySelectorAll(".pokemon-card").forEach(card => {
                const pokemonName = card.querySelector(".pokemon-name").textContent.toLowerCase();
                const pokemonId = card.querySelector(".pokemon-number").textContent.replace("#", "");
                card.style.display = pokemonName.includes(searchTerm) || pokemonId.includes(searchTerm) ? "block" : "none";
            });
        }
    });
});
