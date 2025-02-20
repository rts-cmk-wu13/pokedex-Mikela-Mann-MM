fetch("https://icanhazdadjoke.com/", {
    headers: {
        "Accept": "application/json"
    }
})

    .then((response) => response.json())
    .then((data) => {


        let bodyElm = document.querySelector("body");

        let listElm = document.querySelector("ul");
        listElm.classList.add("info");

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


// function createCard(pokemon) {
//     return `
//         <article>
//             <h2>${pokemon.name}</h2>
//         </article>
//     `
// } 