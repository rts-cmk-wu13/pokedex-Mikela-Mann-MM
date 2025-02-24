document.addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML = ""; // Rydder body

    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get("id") || 1; // Standard til ID 1, hvis ingen angives

    let container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(pokemon => {
            let headerElm = document.createElement("header");
            headerElm.innerHTML = `
                <a href="index.html" class="back"><img src="/icons/arrow_back.png"></a>
                <h1>${capitalize(pokemon.name)}</h1>
                <span class="pokemon-number">#${pokemon.id}</span>
            `;
            container.appendChild(headerElm);

            let imageElm = document.createElement("div");
            imageElm.classList.add("pokemon-image");
            imageElm.innerHTML = `<img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">`;
            container.appendChild(imageElm);

            let typesElm = document.createElement("div");
            typesElm.classList.add("types");
            typesElm.innerHTML = pokemon.types.map(type => `<span class="type">${capitalize(type.type.name)}</span>`).join(" ");
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

        /* fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
        .then(response => response.json())
        .then(pokemon => {
            let infoSection = document.createElement("section");
            infoSection.classList.add("info");
            infoSection.innerHTML = `<p>${pokemon.species}</p>
            `;
            container.appendChild(infoSection);  */

            let statsSection = document.createElement("section");
            statsSection.classList.add("stats");
            statsSection.innerHTML = `
                <h2>Base Stats</h2>
                ${pokemon.stats.map(stat => `
                    <div class="stat">
                        <span class="statname">${stat.stat.name.toUpperCase()}</span>
                        <div class="bar"><div class="fill" style="width: ${stat.base_stat / 2}%;"></div></div>
                        <span>${stat.base_stat}</span>
                    </div>
                `).join("")}
            `;
            container.appendChild(statsSection);

            // Hent den primære type
            let primaryType = pokemon.types[0].type.name;
            let typeColor = getComputedStyle(document.documentElement).getPropertyValue(`--color-${primaryType}`).trim();

            // Sæt baggrundsfarven for hovedcontaineren
            container.style.backgroundColor = typeColor;

            // Sæt farve på Base Stats og About-sektion
            let aboutHeader = aboutSection.querySelector("h2");
            let statsHeader = statsSection.querySelector("h2");

            if (aboutHeader) aboutHeader.style.color = typeColor;
            if (statsHeader) statsHeader.style.color = typeColor;

            // Sæt farve på stats-barer
            document.querySelectorAll(".fill").forEach(bar => {
                bar.style.backgroundColor = typeColor;
            });
        })
        .catch(error => console.error("Error fetching Pokémon data:", error));

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});

