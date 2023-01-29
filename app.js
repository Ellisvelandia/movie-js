let toggle = document.querySelector(".toggle");
toggle.addEventListener("click", () => {
  let bottomHeader = document.querySelector(".bottomHeader");
  bottomHeader.classList.toggle("show");
  let i = document.querySelector("i")
  i.classList.toggle("fa-xmark")
})

apikey = "8bb7f4763d0c0ea36982da5add0ff854"

let i = 1
let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`

let showMore = document.querySelector("#showMore");

showMore.addEventListener("click", nextData)

function nextData() {
  i++;
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=${i}`
  
  fetchData();
}

function fetchData() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `A error ocurred ${response.status}`
        throw new Error(message);
        console.log(error(message));
      }
      return response.json();
    })
    .then((movies) => {
      console.log(movies.results)
      let container = document.querySelector(".container");
      let movieLen = movies.results.length

      showMovies();
      function showMovies() {
        for (let j = 0; j < movieLen; j++) {
          let movie = movies.results[j];
          container.innerHTML += `
          <div class="box">
          <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="poster"">
          <div class="movieDetails">
            <div class="leftDetails">
              <h5>${movie.original_title}</h5>
              <p>Release Date: ${movie.release_date}</p>
            </div>
            <div class="rightDetails">
              <p>${movie.vote_average}</p>
            </div>
          </div>
        </div>
          
          `
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
fetchData()
