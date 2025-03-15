const API_KEY = "e1f0ea6bd4624b907cd5abe3612a5321";  // Palitan ito ng TMDB API key mo
const BASE_URL = "https://api.themoviedb.org/3";

document.addEventListener("DOMContentLoaded", () => {
    fetchTrendingMovies();
    document.getElementById("search-box").addEventListener("keyup", (event) => {
        if (event.key === "Enter") searchMovies();
    });
    document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
});

async function fetchTrendingMovies() {
    try {
        let response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        let data = await response.json();
        displayMovies(data.results, "trending-container");
    } catch (error) {
        console.error("Error fetching trending movies:", error);
    }
}

async function searchMovies() {
    let query = document.getElementById("search-box").value.trim();
    if (!query) return alert("Enter a movie name!");
    
    try {
        let response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        let data = await response.json();
        displayMovies(data.results, "movies-container");
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies(movies, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";
    
    if (movies.length === 0) {
        container.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach(movie => {
        let movieCard = document.createElement("div");
        movieCard.className = "movie-card";

        movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.overview}</p>
        `;
        container.appendChild(movieCard);
    });
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Load Adsterra Ad
function loadAdsterra() {
    let adContainer = document.getElementById("adsterra-ad");
    adContainer.innerHTML = '<script type="text/javascript" src="//plxxx.adsterra.com/..."><\/script>';
}

loadAdsterra();
