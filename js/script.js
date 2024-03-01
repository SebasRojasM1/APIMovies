const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=ba78cc43';
const searchInput = document.getElementById('SearchInput');
const resultsContainer = document.querySelector('.contenedor');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    searchMovies(searchTerm);
});

function searchMovies(searchTerm) {
    if (searchTerm.trim() !== '') {
        const searchUrl = `${apiKey}&s=${searchTerm}`;
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => displayResults(data.Search));
    } else {
        cleanResults();
    }
}

function displayResults(movies) {
    cleanResults();

    if (movies && movies.length > 0) {
        movies.forEach(movie => {
            const { Title, Poster, Year } = movie;

            const movieCard = document.createElement('div');
            movieCard.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${Title}</h5>
                <p class="card-text">${Year}</p>
                <a href="#" class="btn btn-primary">Elegir</a>
                </div>
            </div>
            `;

            resultsContainer.appendChild(movieCard);
        });
    } else {
        resultsContainer.innerHTML = '<p>No se encontraron resultados</p>';
    }
}

function cleanResults() {
    resultsContainer.innerHTML = '';
}