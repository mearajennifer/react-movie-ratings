const { useState } = require("react");

function Loading() {
    return (
        <React.Fragment>
            Loading...
        </React.Fragment>
    );
}

function Navbar() {
    return (
        <nav>
            <ReactRouterDOM.Link to="/">
                <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/40/000000/external-clapperboard-cinema-icongeek26-linear-colour-icongeek26-1.png" height="40" alt="logo" />
                <span>React Movie Ratings App</span>
            </ReactRouterDOM.Link>

            <section>
                <ReactRouterDOM.NavLink to="/movies">
                    <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/40/000000/external-video-camera-retro-icongeek26-linear-colour-icongeek26.png"/>
                    Movies
                </ReactRouterDOM.NavLink>

                <ReactRouterDOM.NavLink to="/users">
                    <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/40/000000/external-pop-corn-party-icongeek26-linear-colour-icongeek26.png"/>
                    Users
                </ReactRouterDOM.NavLink>
            </section>
        </nav>
    );
}

function Login(props) {
    const [regEmail, setRegEmail] = React.useState("");
    const [regPass, setRegPass] = React.useState("");
    const [loginEmail, setLoginEmail] = React.useState("");
    const [loginPass, setLoginPass] = React.useState("");
    console.log(props.loggedIn);

    // Handle registration form submit
    const handleRegistration = (e) => {
        e.preventDefault();
        console.log(`regEmail: ${regEmail}`);
        console.log(`regPass: ${regPass}`);

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({regEmail, regPass})
        })
        .then((response) => response.json())
        .then((result) => {
            alert(`${result.msg}`);
        })
    }

    // handle login form submit
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(`loginEmail: ${loginEmail}`);
        console.log(`loginPass: ${loginPass}`);

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "loginEmail": loginEmail, 
                "loginPass": loginPass,
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.success == true) {
                console.log(`${result.user.user_id}: ${result.msg}`);
                props.setCurrentUser({
                    "userId": result.user.user_id,
                    "userEmail": result.user.email,
                });
                props.setLoggedIn(true);
            } else {
                console.log("Unsuccessful login!");
                console.log(`${result.msg}`)
            }
            
        })
    }

    return (
        <React.Fragment>
            <h2>Create An Account</h2>
            <form onSubmit={(e) => handleRegistration(e)}>
                <p>
                    <label htmlFor="create-email-input">Email</label>
                    <input 
                        type="email" 
                        name="reg-mail" 
                        id="create-email-input" 
                        onChange={(event) => setRegEmail(event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="create-password-input">Password</label>
                    <input 
                        type="password" 
                        name="reg-pass" 
                        id="create-password-input" 
                        onChange={(event) => setRegPass(event.target.value)}
                    />
                </p>
                <p>
                    <button type="submit">
                        Register
                    </button>
                </p>
            </form>

            <h2>Log In</h2>
            <form onSubmit={(e) => handleLogin(e)}>
                <p>
                    <label htmlFor="login-email-input">Email</label>
                    <input 
                        type="email" 
                        name="login-email" 
                        id="login-email-input" 
                        onChange={(event) => setLoginEmail(event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="login-password-input">Password</label>
                    <input 
                        type="password" 
                        name="login-pass" 
                        id="login-password-input" 
                        onChange={(event) => setLoginPass(event.target.value)}
                    />
                </p>
                <p>
                    <button type="submit">
                        Log In
                    </button>
                </p>
            </form>
        </React.Fragment>
    );
}

function UserProfile(props) {
    const [userName, setUserName] = React.useState("");
    const [favMovie, setFavMovie] = React.useState("");
    const [favGenre, setFavGenre] = React.useState("");
    const [ratingDivs, setRatingDivs] = React.useState([]);
    console.log(props.loggedIn);
    console.log(props.currentUser.userId)

    // make api call to get user data
    React.useEffect(() => {
        fetch("/api/user-data", {
            method: "POST",
            body: JSON.stringify({"userId": props.currentUser.userId}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("user data is:");
            console.log(result);
            setUserName(result.userId);
            setFavMovie(result.favMovie)
            setFavGenre(result.favGenre)
        })
    }, []);

    // make api call to get user ratings
    React.useEffect(() => {
        const makeRatings = [];
        fetch("/api/user-ratings", {
            method: "POST",
            body: JSON.stringify({"userId": props.currentUser.userId}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((result) => {
            let userRatings = result.userRatings
            for (let i=0; i<userRatings.length; i+=1) {
                makeRatings.push(
                    <div key={userRatings[i].movieId}>
                        <img src={userRatings[i].movieImg} style={{height:"100px"}} />
                        <p>{userRatings[i].movieTitle}</p>
                        <p>{userRatings[i].userRating}</p>
                    </div>
                );
            }
            setRatingDivs(makeRatings);
        })
    }, []);

    console.log("user ratings are:");
    console.log(ratingDivs);

    return (
        <React.Fragment>
            <div>
                <h2>Profile: {userName}</h2>
                <p>Favorite Movie: {favMovie}</p>
                <p>Favorite Genre: {favGenre}</p>
            </div>
            <h3>Your ratings:</h3>
            <div>
                {ratingDivs}
            </div>
        </React.Fragment>
    )
}

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
                    <div key={movies[movieId].movie_id}>
                        <ReactRouterDOM.Link to={`/movies/${movieId}`} onClick={() => setAMovie(movies[movieId])}>
                            <img src={movies[movieId].poster_path} style={{height:"100px"}} />
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
    const {aMovie, currentUser, loggedIn} = props;
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
        fetch("/api/avg-movie-rating", {
            method: "POST",
            body: JSON.stringify({"movie_id": aMovie.movie_id}),
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
                <img src={aMovie.poster_path} style={{height:"400px"}} />
                <p><b>Average Rating: </b> {ratings}</p>
                
                { loggedIn ?
                <UserMovieRating 
                    currentUser={currentUser} 
                    aMovie={aMovie} 
                    userRating={userRating} 
                    setUserRating={setUserRating}/> : 
                <p></p> }

                <p><b>Released: </b> {formatDate(aMovie.release_date)}</p>
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
                "movieId": aMovie.movie_id,
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
                "movieId": aMovie.movie_id,
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

function AllUsersPage(props) {
    const {aUser, setAUser} = props;
    const [userDivs, setUserDivs] = React.useState([]);

    // Make API call to server for users data
    React.useEffect(() => {
        const makeUsers = [];
        fetch("/api/users")
        .then((response) => response.json())
        .then((users) => {
            for (let userId in users) {
                makeUsers.push(
                    <div key={users[userId].user_id}>
                        <ReactRouterDOM.Link to={`/users/${userId}`} onClick={() => setAUser(users[userId])}>
                            <p>User {users[userId].user_id}</p>
                        </ReactRouterDOM.Link>
                    </div>
                );
            }
            setUserDivs(makeUsers);
        })
    }, []);

    return (
        <React.Fragment>
            <h1>Users</h1>
            <div>
                {userDivs}
            </div>
        </React.Fragment>
    );
}

function UserPage(props) {
    const {aUser} = props;

    return (
        <React.Fragment>
            <h1>User {aUser.user_id}</h1>
            <p>email: {aUser.email}</p>
        </React.Fragment>
    );
}