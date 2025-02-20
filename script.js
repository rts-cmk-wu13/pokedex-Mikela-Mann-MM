fetch("https://pokeapi.co/api/v2/pokemon")

    .then((response) => response.json())
    .then((data) => {


        let bodyElm = document.createElement("body");

        let headerElm = document.querySelector("header");

        let sectionElm = document.querySelector("section");
        sectionElm.classList.add("search-container");

        listElm.innerHTML = `
        ${data.employees
                .map((employees) => `<li> ${employees.name} </li>`)
                .join("")}
    `;
        bodyElm.append(listElm);
    }); 

    
let sectionElm = document.createElement("section")
sectionElm.class = "pokelist"

fetch("/data/pokemon.json")
    .then(function(response) {
        return response.json()
    }).then(
        function(data) {

        let divElm = document.createElement("div")
        divElm.innerHTML = data.map(function(pokemon) {    
            
            let id = pokemon.url.slice(0, -1).split("/").pop()
            console.log(id);
            

        return `
            <article>
                <h2>${pokemon.name}</h2>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
            </article>
        `
        }).join("")

            sectionElm.append(divElm)
        }
    )



document.querySelector("main").append(sectionElm)

/* 
<body>
    <header class="header">
        <img src="icons/pokeball.png">
        <h1>Pokédex</h1>
    </header>
    
    <section class="search-container">
        <input type="text" placeholder= "Search" class="search-bar">
        <button class="filter-btn"><img src="icons/text_format.png"></button>
    </section>
    
    <section class="pokedex-container">
        <div class="pokemon-card" v-for="i in 12">
            <p class="pokemon-number">#999</p>
            <div class="pokemon-image"></div>
            <p class="pokemon-name">Pokémon Name</p>
        </div>
    </section>
</body> */