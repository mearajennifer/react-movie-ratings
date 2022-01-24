

function Loading() {
    return (
        <React.Fragment>
            Loading...
        </React.Fragment>
    );
}


function Navbar(props) {
    const {loggedIn, setLoggedIn, setCurrentUser } = props;

    return (
        <nav>
            <ReactRouterDOM.Link to="/">
                <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-award-cinema-icongeek26-linear-colour-icongeek26-1.png" height="30" alt="logo" />
                <span>React Movie Ratings App</span>
            </ReactRouterDOM.Link>

            <section>
                <ReactRouterDOM.NavLink to="/movies">
                    <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-video-camera-retro-icongeek26-linear-colour-icongeek26.png" height="30" />
                    Movies
                </ReactRouterDOM.NavLink>

                <ReactRouterDOM.NavLink to="/users">
                <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-cinema-screen-cinema-icongeek26-linear-colour-icongeek26-1.png" height="30" />
                    Users
                </ReactRouterDOM.NavLink>

                <ReactRouterDOM.NavLink to="/search">
                <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-movie-cinema-icongeek26-linear-colour-icongeek26-7.png" height="30" />
                    Search
                </ReactRouterDOM.NavLink>

                { loggedIn ?
                    <button onClick={() => {
                        setCurrentUser({});
                        setLoggedIn(false);
                    }}>
                        Logout
                    </button> :
                    <p></p> }
            </section>
        </nav>
    );
}
