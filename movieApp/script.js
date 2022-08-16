const apiKey = "132a5d971081c7edc27050e667052636"
const imageUrl = "https://image.tmdb.org/t/p/w500"
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moviesContainer = document.querySelector(".movies")
let page = 1
async function getMovies(page) {
    const movies = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=132a5d971081c7edc27050e667052636&language=en-US&page="+page);
    let resp = await movies.json();

    fillMovieContainers(resp);

}

async function fillMovieContainers(movies) {
    movies.results.forEach((it) => {
        if(it.backdrop_path == null) {
            return;
        }
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="movie-container">
                <img src="${imageUrl + it.backdrop_path}" alt="">
                <div class="title">
                    <span class="title-name">${it.title}</span>
                    <span class="title-rating">${it.vote_average}</span>
                </div>
            </div>`
            moviesContainer.appendChild(div);
            getDetails(div, it);

    });
}

function next() {
    const btn = document.querySelector(".next_btn");
    btn.addEventListener("click", () => {
        page++
        getMovies(page);
    });
}
next();
getMovies(page);

function getDetails(container, elem) {
    container.addEventListener("click", async () => {
        const details = await fetch(`https://api.themoviedb.org/3/movie/${elem.id}?api_key=${apiKey}&language=en-US`);
        const resp = await details.json();
        
    });
    
}

function search() {
    const form = document.querySelector(".form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let page = 0;
        let search = document.querySelector(".input");
        search = search.value;
        let searchInfo = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${search}&page=1`);
        let resp = await searchInfo.json();
        console.log(resp);
        if(resp.total_pages > 1) {
            for(let i = 1; i <= resp.total_pages; i++) {
                if(page > 5) {
                    break;
                }
                page++;
                async function put() {
                    searchInfo = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${search}&page=${page}`);
                    resp = await searchInfo.json();
                    fillMovieContainers(resp);
                    console.log(resp);
                }
                put();
            }
        } else {
            fillMovieContainers(resp);
        }
        document.querySelector(".movies").innerHTML = "";
        if(!document.querySelector(".next_btn").classList.contains("invisible")) {
            document.querySelector(".next_btn").classList.toggle("invisible");
        };
        
        
    });
    
}

search();


