function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [aMovie, setAMovie] = React.useState({});
    const [aUser, setAUser] = React.useState({});

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
                    <AllUsersPage 
                        aUser={aUser} 
                        setAUser={setAUser}/>
                </ReactRouterDOM.Route>

                <ReactRouterDOM.Route path="/users/:id">
                    <UserPage aUser={aUser} />
                </ReactRouterDOM.Route>
            </div>

        </ReactRouterDOM.BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));