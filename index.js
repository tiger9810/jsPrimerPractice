async function main() {
    try {
        const movieName = getMovieName();
        const movieInfo = await fetchMovieInfo(movieName);
        // console.log(Object.keys(movieInfo));
        // console.log(movieInfo.Error)
        if(movieInfo.Error === 'Movie not found!') {
            const view = errorView(movieInfo);
            displayView(view);
        } else {
            const view = createView(movieInfo);
            displayView(view);}
    } catch (err) {
        console.error(err);
    }

}

function fetchMovieInfo(movieName) {
    return fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=4a3b711b`)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                // jsonオブジェクトで解決するpromiseを返す
                return response.json();
            }
        });
    }

function getMovieName() {
    const input = document.getElementById('movieName');
    return input.value;
}

function createView(movieData) {
    let resultHTML = '<div>';

    for (let i = 0; i < 10; i++) {
        if (movieData.Search[i]) {
            resultHTML += `
                <div>
                    <h1>Search result ${i + 1} for: ${movieData.Search[i].Title}</h1>
                    <img src="${movieData.Search[i].Poster}" />
                    <p>${movieData.Search[i].Year}</p>
                </div>
            `;
        }
    }

    resultHTML += '</div>';
    return resultHTML;
}

function errorView(error) {
    return `<h1>Sorry, ${error.Error}</h1>`;
}


function displayView(view) {
    const result = document.getElementById('result');
    result.innerHTML = view;
}