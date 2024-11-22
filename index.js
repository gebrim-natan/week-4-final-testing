document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();  
    if (searchTerm) {
      main(searchTerm);  
    } else {
      alert("Please enter a search term!");  
    }
  });
});

async function main(search) {
  const data = await fetch(
    `http://www.omdbapi.com/?apikey=4a9e8b55&s=${search}`
  );
  const moviesData = await data.json();
  const movieListEl = document.querySelector(".title-list");


  if (moviesData.Response === "True") {

    const movies = moviesData.Search;

    if (filter === "LOW_TO_HIGH") {
      movies.title.Year.sort(
        (a, b) =>
          (a.year || a.year) - (b.year || b.year)
      );
    } else (filter === "HIGH_TO_LOW") {
      movies.title.Year.sort(
        (a, b) =>
          (b.year || b.year) - (a.year || a.year)
      );
    }

    movieListEl.innerHTML = movies
      .map(
        (title) =>
          `<div class="title-card">
            <div class="title-card__container">
              <h3 class="movie-name">${title.Title}</h3>
              <p class="movie-year"><b>Year:</b> ${title.Year}</p>
              <p><b></b> <img class="movie-poster" src="${title.Poster}" alt="Poster"></p>
            </div>
          </div>`
      )
      .join("");
  } else {
  
    movieListEl.innerHTML = `<p>No movies found for "${search}".</p>`;
  }
}

function filterMovies(event) {
  main(event.target.value);
}

main(search);