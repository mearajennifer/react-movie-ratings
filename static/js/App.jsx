function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [users, setUsers] = React.useState({});
    const [movies, setMovies] =  React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);

    // Make API call to server for movies data
    React.useEffect(() => {
        fetch("/api/movies")
            .then((response) => response.json())
            .then((movieData) => {
                setMovies(movieData);
            })
    }, []);

    // Make API call to server for users datta
    React.useEffect(() => {
        fetch("/api/users")
            .then((response) => response.json())
            .then((usersData) => {
                setUsers(usersData);
            })
    }, []);

    // Handle registration form submit
    const handleRegistration = (e) => {
        e.preventDefault();
        let email = document.querySelector("#create-email-input").value;
        let pass = document.querySelector("#create-password-input").value;

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, pass})
        })
        .then((response) => response.json())
        .then((result) => {
            alert(`${result.msg}`);
        })
    }

    // handle login form submit
    const handleLogin = (e) => {
        e.preventDefault();
        let email = document.querySelector("#login-email-input").value;
        let pass = document.querySelector("#login-password-input").value;
        console.log(email, pass);
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, pass})
        })
        .then((response) => response.json())
        .then((result) => {
            setCurrentUser({
                "userID": result.user.user_id,
                "userEmail": result.user.email,
            })
            alert(`${result.user.user_id}: ${result.msg}`);
            setLoggedIn(true)
        })
    }

    return (
        <ReactRouterDOM.BrowserRouter>
            <Navbar />

            <div className="container-fluid">
                <ReactRouterDOM.Route exact path="/">
                    { loggedIn ? <UserProfile /> : 
                    <Login currentUser={currentUser} 
                            handleRegistration={handleRegistration} 
                            handleLogin={handleLogin} /> 
                    }
                </ReactRouterDOM.Route>

                <ReactRouterDOM.Route exact path="/movies">
                    <AllMoviesPage movies={movies} />
                </ReactRouterDOM.Route>

                <ReactRouterDOM.Route exact path="/users">
                    <AllUsersPage users={users} />
                </ReactRouterDOM.Route>
            </div>

        </ReactRouterDOM.BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));