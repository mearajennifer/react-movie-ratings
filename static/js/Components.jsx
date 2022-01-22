

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
