function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [users, setUsers] = React.useState({});
    const [movies, setMovies] =  React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [aMovie, setAMovie] = React.useState({});


    // Make API call to server for movies data
    React.useEffect(() => {
        fetch("/api/movies")
            .then((response) => response.json())
            .then((movieData) => {
                setMovies(movieData);
            })
    }, []);

    // Make API call to server for users data
    React.useEffect(() => {
        fetch("/api/users")
            .then((response) => response.json())
            .then((usersData) => {
                setUsers(usersData);
            })
    }, []);


    return (
        <ReactRouterDOM.BrowserRouter>
            <Navbar />

            <div className="container-fluid">
                <ReactRouterDOM.Route exact path="/">
                    { loggedIn ? 
                    <UserProfile 
                        currentUser={currentUser} 
                        loggedIn={loggedIn} /> : 
                    <Login currentUser={currentUser} 
                        setCurrentUser={setCurrentUser} 
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn} /> }
                </ReactRouterDOM.Route>

                <ReactRouterDOM.Route exact path="/movies">
                    <AllMoviesPage 
                        movies={movies} 
                        aMovie={aMovie} 
                        setAMovie={setAMovie}/>
                </ReactRouterDOM.Route>

                <ReactRouterDOM.Route path="/movies/:id">
                    <MoviePage 
                        aMovie={aMovie} 
                        currentUser={currentUser} 
                        loggedIn={loggedIn}/>
                </ReactRouterDOM.Route>

                <ReactRouterDOM.Route exact path="/users">
                    <AllUsersPage users={users} />
                </ReactRouterDOM.Route>
            </div>

        </ReactRouterDOM.BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));