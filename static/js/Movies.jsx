const { useState } = require("react");

function AllMoviesPage(props) {
    const {aMovie, setAMovie} = props;
    const [movieDivs, setMovieDivs] = React.useState([]);

    // Make API call to server for movies data
    React.useEffect(() => {
        const makeMovies = [];
        fetch("/api/movies")
        .then((response) => response.json())
        .then((movies) => {
            for (let movieId in movies) {
                makeMovies.push(
                    <div key={movies[movieId].movieId}>
                        <ReactRouterDOM.Link to={`/movies/${movieId}`} onClick={() => setAMovie({"movieId": movieId})}>
                            <img src={movies[movieId].posterPath} style={{height:"100px"}} />
                            <p>{movies[movieId].title}</p>
                        </ReactRouterDOM.Link>
                    </div>
                );
            }
            setMovieDivs(makeMovies);
        })
    }, []);

    return (
        <React.Fragment>
            <h1>Movies</h1>
            <div>
                {movieDivs}
            </div>
        </React.Fragment>
    );
}

function MoviePage(props) {
    const {aMovie, setAMovie, currentUser, loggedIn} = props;
    const [ratings, setRatings] = React.useState("");
    const [userRating, setUserRating] = React.useState("");

    const formatDate = (data) => {
        let month = data.slice(8, 11);
        let date = data.slice(5, 7);
        if (date[0] == 0) {
            date = date[1];
        }
        let year = data.slice(12, 16);
        let dateString = month + " " + date + ", " + year + " ";
        return dateString;
    }

    React.useEffect(() => {
        const movieId = aMovie.movieId;
        fetch("/api/movies/details", {
            method: "POST",
            body: JSON.stringify({"movieId": movieId}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((movieData) => {
            const newMovie = Object.assign({}, aMovie);
            newMovie.title = movieData[movieId].title;
            newMovie.overview = movieData[movieId].overview;
            newMovie.posterPath = movieData[movieId].posterPath;
            let newDate = formatDate(movieData[movieId].releaseDate);
            newMovie.releaseDate = newDate;
            setAMovie(newMovie);
        })
    }, []);

    

    React.useEffect(() => {
        fetch("/api/avg-movie-rating", {
            method: "POST",
            body: JSON.stringify({"movieId": aMovie.movieId}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            let stars = "";
            if (data.success === true) {
                for (let i=0; i<data.avgRating; i+=1) {
                    stars = stars + "⭐ ";
                }
                setRatings(stars + `${data.count} reviews`);
            } else {
                setRatings("Not rated");
            }
        })
    }, [ratings]);

    return (
        <React.Fragment>
            <h1>{aMovie.title}</h1>
                <img src={aMovie.posterPath} style={{height:"400px"}} />
                <p><b>Average Rating: </b> {ratings}</p>
                
                { loggedIn ?
                <UserMovieRating 
                    currentUser={currentUser} 
                    aMovie={aMovie} 
                    userRating={userRating} 
                    setUserRating={setUserRating}/> : 
                <p></p> }

                <p><b>Released: </b> {aMovie.releaseDate}</p>
                <p><b>Description: </b> {aMovie.overview}</p>
        </React.Fragment>
    );
}

function UserMovieRating(props) {
    const {currentUser, aMovie, userRating, setUserRating} = props;
    const [newRating, setNewRating] = React.useState("");
    
    React.useEffect(() => {
        fetch("/api/user-rating", {
            method: "POST",
            body: JSON.stringify({
                "userId": currentUser.userId,
                "movieId": aMovie.movieId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            let userStars = "";
            if (data.success === true) {
                for (let i=0; i<data.rating; i+=1) {
                    userStars = userStars + "⭐ ";
                }
                setUserRating(userStars);
            } else {
                setUserRating("Not rated");
            }
        })
    }, [userRating]);

    const handleNewRating = (e) => {
        e.preventDefault();

        fetch("/api/create-rating", {
            method: "POST",
            body: JSON.stringify({
                "userId": currentUser.userId,
                "movieId": aMovie.movieId,
                "score": newRating,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.msg);
            setUserRating(newRating);
        })
    };

    return (
        <React.Fragment>
            <p><b>Your Rating: </b> {userRating}</p>
            <form onSubmit={(e) => handleNewRating(e)}>
                <p>
                    <label htmlFor="score_input">Choose a rating:</label>
                    <select name="score" id="score_input" onChange={(event) => setNewRating(event.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </p>
                <p>
                    <button type="submit">Rate</button>
                </p>
            </form>
        </React.Fragment>
    );
}