function SearchPage(props) {
    const [titleSearch, setTitleSearch] = React.useState("");
    const [ratingSearch, setRatingSearch] = React.useState(0);
    const [searchResults, setSearchResults] = React.useState([]);

    return(
        <React.Fragment>
            <h1>Search</h1>
            <SearchForm 
                titleSearch={titleSearch} 
                setTitleSearch={setTitleSearch} 
                ratingSearch={ratingSearch} 
                setRatingSearch={setRatingSearch} 
                searchResults={searchResults}
                setSearchResults={setSearchResults} />
            <SearchDisplay 
                searchResults={searchResults} 
                setAMovie={props.setAMovie} />
        </React.Fragment>
    );
}

function SearchForm(props) {
    const {titleSearch, setTitleSearch, ratingSearch, setRatingSearch, searchResults, setSearchResults} = props;
    
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("form submitted!");
        console.log(`title: ${titleSearch}`);
        console.log(`rating: ${ratingSearch}`);

        fetch("/api/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "title": titleSearch,
                "avgRating": ratingSearch,
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            console.log(result.searchResults);
            setSearchResults(result.searchResults);
        })
    }

    return (
        <div>
            <form onSubmit={(e) => handleSearch(e)}>
                <p>
                    <label htmlFor="title-input">Movie title: </label>
                    <input 
                        type="text" 
                        name="title"
                        id="title-input"
                        onChange={(event) => setTitleSearch(event.target.value)} />
                </p>
                <p>
                    <label htmlFor="avg-rating-input">Average Rating</label>
                    <select name="avg-rating" id="avg-rating-input" onChange={(event) => setRatingSearch(event.target.value)} >
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </p>
                <p>
                    <button>
                        Search
                    </button>
                </p>
            </form>
        </div>
    );
}

function SearchDisplay(props) {
    const {searchResults, setAMovie} = props;
    let makeMovies = []

    for (let movie of searchResults) {
        makeMovies.push(
            <div key={movie.movieId}>
                <ReactRouterDOM.Link to={`/movies/${movie.movieId}`} onClick={() => setAMovie({"movieId": movie.movieId})}>
                    <img src={movie.posterPath} style={{height:"100px"}} />
                    <p>{movie.title}</p>
                </ReactRouterDOM.Link>
            </div>
        );
    }

    return (
        <div>
            {makeMovies}
        </div>
    );
}