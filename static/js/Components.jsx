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
    return (
        <React.Fragment>
            <h2>Create An Account</h2>
            <form >
                <p>
                    <label htmlFor="create-email-input">Email</label>
                    <input type="email" name="email" id="create-email-input" />
                </p>
                <p>
                    <label htmlFor="create-password-input">Password</label>
                    <input type="password" name="password" id="create-password-input" />
                </p>
                <p>
                    <button type="button" onClick={props.handleRegistration} >Register</button>
                </p>
            </form>

            <h2>Log In</h2>
            <form >
                <p>
                    <label htmlFor="login-email-input">Email</label>
                    <input type="email" name="email" id="login-email-input" />
                </p>
                <p>
                    <label htmlFor="login-password-input">Password</label>
                    <input type="password" name="password" id="login-password-input" />
                </p>
                <p>
                    <button type="button" onClick={props.handleLogin} >Log In</button>
                </p>
            </form>
        </React.Fragment>
    );
}

function UserProfile() {
    return (
        <div>
            User's profile
        </div>
    )
}

function AllMoviesPage(props) {
    return (
        <div>All Movies</div>
    );
}

function AllUsersPage(props) {
    return (
        <div>All Users</div>
    );
}