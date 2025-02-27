document.addEventListener("DOMContentLoaded", () => {
    const sortCard = document.createElement("div");
    sortCard.classList.add("sort-card");
    sortCard.innerHTML = `
        <form class="sort-options">
            <p>Sort by:</p>
            <div class="option">
                <input type="radio" id="sort-by-id" name="sort" value="id">
                <label for="sort-by-id">Number</label>
            </div>
            <div class="option">
                <input type="radio" id="sort-by-name" name="sort" value="name">
                <label for="sort-by-name">Name</label>
            </div>
        </form>
    `;
    document.body.appendChild(sortCard);

    const filterBtn = document.querySelector(".filter-btn");
    filterBtn.addEventListener("click", () => {
        sortCard.classList.toggle("visible");
    });

    document.querySelector("#sort-by-id").addEventListener("change", () => {
        pokemonList.sort((a, b) => a.id - b.id);
        renderPokemonList();
        sortCard.classList.remove("visible");
    });

    document.querySelector("#sort-by-name").addEventListener("change", () => {
        pokemonList.sort((a, b) => a.name.localeCompare(b.name));
        renderPokemonList();
        sortCard.classList.remove("visible");
    });
});
