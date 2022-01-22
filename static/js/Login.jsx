const { useState } = require("react");

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
                console.log(`${result.user.userId}: ${result.msg}`);
                props.setCurrentUser({
                    "userId": result.user.userId,
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
    }, [props.currentUser]);

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
                        <ReactRouterDOM.Link to={`/movies/${userRatings[i].movieId}`} onClick={() => props.setAMovie({"movieId": userRatings[i].movieId})}>
                            <img src={userRatings[i].posterPath} style={{height:"100px"}} />
                            <p>{userRatings[i].movieTitle}</p>
                            <p>{userRatings[i].userRating}</p>
                        </ReactRouterDOM.Link>
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