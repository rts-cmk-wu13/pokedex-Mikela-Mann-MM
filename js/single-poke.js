/* document.addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML = ""; // Rydder body

    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = parseInt(urlParams.get("id"), 10); // Konverter til tal

    let container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);

    // Hent basis Pokémon-data
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(pokemon => {
            let formattedId = String(pokemon.id).padStart(3, "0");

            let headerElm = document.createElement("header");
            headerElm.innerHTML = `
                <a href="index.html" class="back"><img src="/icons/arrow_back.png"></a>
                <h1>${capitalize(pokemon.name)}</h1>
                <span class="pokemon-number">#${formattedId}</span>
            `;
            container.appendChild(headerElm);

            let imageElm = document.createElement("div");
            imageElm.classList.add("pokemon-image");
            imageElm.innerHTML = `<img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">`;
            container.appendChild(imageElm);

            let typesElm = document.createElement("div");
            typesElm.classList.add("types");
            pokemon.types.forEach(type => {
                let typeSpan = document.createElement("span");
                typeSpan.classList.add("type");
                typeSpan.textContent = capitalize(type.type.name);
                typeSpan.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--color-${type.type.name}`).trim();
                typesElm.appendChild(typeSpan);
            });
            container.appendChild(typesElm);

            let aboutSection = document.createElement("section");
            aboutSection.classList.add("about");
            aboutSection.innerHTML = `
                <h2>About</h2>
                <div class="info">
                    <div>
                        <p class="icon"><img src="/icons/weight.png"> ${pokemon.weight / 10} kg</p>
                        <p class="label">Weight</p>
                    </div>
                    <div>
                        <p class="icon"><img src="/icons/straighten.png"> ${pokemon.height / 10} m</p>
                        <p class="label">Height</p>
                    </div>
                    <div>
                        <p>${pokemon.abilities.map(a => capitalize(a.ability.name)).join("<br>")}</p>
                        <p class="label">Abilities</p>
                    </div>
                </div>
            `;
            container.appendChild(aboutSection);

            return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
                .then(response => response.json())
                .then(species => {
                    let infoSection = document.createElement("section");
                    infoSection.classList.add("info");
                    let description = species.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text || "No description available.";
                    infoSection.innerHTML = `<p>${description}</p>`;
                    container.appendChild(infoSection);
                    return pokemon;
                });
        })
        .then(pokemon => {
            let statsSection = document.createElement("section");
            statsSection.classList.add("stats");
            statsSection.innerHTML = `
                <h2>Base Stats</h2>
                ${pokemon.stats.map(stat => `
                    <div class="stat">
                        <p class="stats-headline">${formatStatName(stat.stat.name)}</p>
                        <span class="stats-numbers">${stat.base_stat}</span>
                        <meter class="fill" min="0" max="255" value="${stat.base_stat}"></meter>
                    </div>
                `).join("")}
            `;
            container.appendChild(statsSection);

            let primaryType = pokemon.types[0].type.name;
            let typeColor = getComputedStyle(document.documentElement).getPropertyValue(`--color-${primaryType}`).trim();
            container.style.backgroundColor = typeColor;

            setTimeout(() => {
                document.querySelectorAll(".stats-headline, h2").forEach(h2 => h2.style.color = typeColor);
            }, 100);
        })
        .catch(error => console.error("Error fetching Pokémon data:", error));

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function formatStatName(stat) {
        const statMap = {
            "attack": "ATK",
            "defense": "DFS",
            "special-attack": "SATK",
            "special-defense": "SDEF",
            "speed": "SPD"
        };
        return statMap[stat] || stat.toUpperCase();
    }
});
 */

/* document.addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML = ""; // Rydder body

    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = parseInt(urlParams.get("id"), 10); // Konverter til tal

    let container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);

    // Hent basis Pokémon-data
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(pokemon => {
            let formattedId = String(pokemon.id).padStart(3, "0");

            let headerElm = document.createElement("header");
            headerElm.innerHTML = `
                <a href="index.html" class="back"><img src="/icons/arrow_back.png"></a>
                <h1>${capitalize(pokemon.name)}</h1>
                <span class="pokemon-number">#${formattedId}</span>
            `;
            container.appendChild(headerElm);

            let imageElm = document.createElement("div");
            imageElm.classList.add("pokemon-image");
            imageElm.innerHTML = `<img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">`;
            container.appendChild(imageElm);

            let detailsContainer = document.createElement("div");
            detailsContainer.classList.add("details-container");
            container.appendChild(detailsContainer);

            let typesElm = document.createElement("div");
            typesElm.classList.add("types");
            pokemon.types.forEach(type => {
                let typeSpan = document.createElement("span");
                typeSpan.classList.add("type");
                typeSpan.textContent = capitalize(type.type.name);
                typeSpan.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--color-${type.type.name}`).trim();
                typesElm.appendChild(typeSpan);
            });
            detailsContainer.appendChild(typesElm);

            let aboutSection = document.createElement("section");
            aboutSection.classList.add("about");
            aboutSection.innerHTML = `
                <h2>About</h2>
                <div class="info">
                    <div>
                        <p class="icon"><img src="/icons/weight.png"> ${pokemon.weight / 10} kg</p>
                        <p class="label">Weight</p>
                    </div>
                    <div>
                        <p class="icon"><img src="/icons/straighten.png"> ${pokemon.height / 10} m</p>
                        <p class="label">Height</p>
                    </div>
                    <div>
                        <p>${pokemon.abilities.map(a => capitalize(a.ability.name)).join("<br>")}</p>
                        <p class="label">Abilities</p>
                    </div>
                </div>
            `;
            detailsContainer.appendChild(aboutSection);

            return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
                .then(response => response.json())
                .then(species => {
                    let infoSection = document.createElement("section");
                    infoSection.classList.add("info");
                    let description = species.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text || "No description available.";
                    infoSection.innerHTML = `<p>${description}</p>`;
                    detailsContainer.appendChild(infoSection);
                    return pokemon;
                });
        })
        .then(pokemon => {
            let statsSection = document.createElement("section");
            statsSection.classList.add("stats");
            statsSection.innerHTML = `
                <h2>Base Stats</h2>
                ${pokemon.stats.map(stat => `
                    <div class="stat">
                        <p class="stats-headline">${formatStatName(stat.stat.name)}</p>
                        <span class="stats-numbers">${stat.base_stat}</span>
                        <meter class="fill" min="0" max="255" value="${stat.base_stat}"></meter>
                    </div>
                `).join("")}
            `;
            document.querySelector(".details-container").appendChild(statsSection);

            let primaryType = pokemon.types[0].type.name;
            let typeColor = getComputedStyle(document.documentElement).getPropertyValue(`--color-${primaryType}`).trim();
            container.style.backgroundColor = typeColor;

            setTimeout(() => {
                document.querySelectorAll(".stats-headline, h2").forEach(h2 => h2.style.color = typeColor);
            }, 100);
        })
        .catch(error => console.error("Error fetching Pokémon data:", error));

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function formatStatName(stat) {
        const statMap = {
            "attack": "ATK",
            "defense": "DFS",
            "special-attack": "SATK",
            "special-defense": "SDEF",
            "speed": "SPD"
        };
        return statMap[stat] || stat.toUpperCase();
    }
}); */

document.addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML = ""; // Rydder body

    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = parseInt(urlParams.get("id"), 10); // Konverter til tal

    let container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);

    // Tilføj navigation
    let navContainer = document.createElement("div");
    navContainer.classList.add("navigation");
    container.appendChild(navContainer);

    if (pokemonId > 1) {
        let leftArrow = document.createElement("a");
        leftArrow.href = `?id=${pokemonId - 1}`;
        leftArrow.innerHTML = `<img src="/icons/chevron_left.png" alt="Previous">`;
        leftArrow.classList.add("nav-left");
        navContainer.appendChild(leftArrow);
    }

    if (pokemonId < 1304) {
        let rightArrow = document.createElement("a");
        rightArrow.href = `?id=${pokemonId + 1}`;
        rightArrow.innerHTML = `<img src="/icons/chevron_right.png" alt="Next">`;
        rightArrow.classList.add("nav-right");
        navContainer.appendChild(rightArrow);
    }

    // Hent basis Pokémon-data
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(pokemon => {
            let formattedId = String(pokemon.id).padStart(3, "0");

            let headerElm = document.createElement("header");
            headerElm.innerHTML = `
                <a href="index.html" class="back"><img src="/icons/arrow_back.png"></a>
                <h1>${capitalize(pokemon.name)}</h1>
                <span class="pokemon-number">#${formattedId}</span>
            `;
            container.appendChild(headerElm);

            let imageElm = document.createElement("div");
            imageElm.classList.add("pokemon-image");
            imageElm.innerHTML = `<img loading="lazy" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">`;
            container.appendChild(imageElm);

            let detailsContainer = document.createElement("div");
            detailsContainer.classList.add("details-container");
            container.appendChild(detailsContainer);

            let typesElm = document.createElement("div");
            typesElm.classList.add("types");
            pokemon.types.forEach(type => {
                let typeSpan = document.createElement("span");
                typeSpan.classList.add("type");
                typeSpan.textContent = capitalize(type.type.name);
                typeSpan.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--color-${type.type.name}`).trim();
                typesElm.appendChild(typeSpan);
            });
            detailsContainer.appendChild(typesElm);

            let aboutSection = document.createElement("section");
            aboutSection.classList.add("about");
            aboutSection.innerHTML = `
                <h2>About</h2>
                <div class="info">
                    <div>
                        <p class="icon"><img src="/icons/weight.png"> ${pokemon.weight / 10} kg</p>
                        <p class="label">Weight</p>
                    </div>
                    <div>
                        <p class="icon"><img src="/icons/straighten.png"> ${pokemon.height / 10} m</p>
                        <p class="label">Height</p>
                    </div>
                    <div>
                        <p>${pokemon.abilities.map(a => capitalize(a.ability.name)).join("<br>")}</p>
                        <p class="label">Abilities</p>
                    </div>
                </div>
            `;
            detailsContainer.appendChild(aboutSection);

            return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
                .then(response => response.json())
                .then(species => {
                    let infoSection = document.createElement("section");
                    infoSection.classList.add("info");
                    let description = species.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text || "No description available.";
                    infoSection.innerHTML = `<p>${description}</p>`;
                    detailsContainer.appendChild(infoSection);
                    return pokemon;
                });
        })
        .then(pokemon => {
            let statsSection = document.createElement("section");
            statsSection.classList.add("stats");
            statsSection.innerHTML = `
                <h2>Base Stats</h2>
                ${pokemon.stats.map(stat => `
                    <div class="stat">
                        <p class="stats-headline">${formatStatName(stat.stat.name)}</p>
                        <span class="stats-numbers">${stat.base_stat}</span>
                        <meter class="fill" min="0" max="255" value="${stat.base_stat}"></meter>
                    </div>
                `).join("")}
            `;
            document.querySelector(".details-container").appendChild(statsSection);

            let primaryType = pokemon.types[0].type.name;
            let typeColor = getComputedStyle(document.documentElement).getPropertyValue(`--color-${primaryType}`).trim();
            container.style.backgroundColor = typeColor;

            setTimeout(() => {
                document.querySelectorAll(".stats-headline, h2").forEach(h2 => h2.style.color = typeColor);
            }, 100);
        })
        .catch(error => console.error("Error fetching Pokémon data:", error));

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function formatStatName(stat) {
        const statMap = {
            "attack": "ATK",
            "defense": "DFS",
            "special-attack": "SATK",
            "special-defense": "SDEF",
            "speed": "SPD"
        };
        return statMap[stat] || stat.toUpperCase();
    }
});
