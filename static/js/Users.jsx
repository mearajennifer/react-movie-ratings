
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
                    <div key={userId}>
                        <ReactRouterDOM.Link to={`/users/${userId}`} onClick={() => setAUser(users[userId])}>
                            <p>User {userId}</p>
                        </ReactRouterDOM.Link>
                    </div>
                );
            }
            setUserDivs(makeUsers);
        })
    }, []);

    return (
        <React.Fragment>``
            <h1>Users</h1>
            <div>
                {userDivs}
            </div>
        </React.Fragment>
    );
}

function UserPage(props) {
    const {aUser, aMovie, setAMovie} = props;
    const [userRatingDivs, setUserRatingDivs] = React.useState([]);

    // make api call to get user ratings
    React.useEffect(() => {
        const makeUserRatings = [];
        fetch("/api/user-ratings", {
            method: "POST",
            body: JSON.stringify({"userId": aUser.userId}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((result) => {
            let userRatings = result.userRatings
            console.log(userRatings);
            for (let i=0; i<userRatings.length; i+=1) {
                makeUserRatings.push(
                    <div key={userRatings[i].movieId}>
                        <ReactRouterDOM.Link to={`/movies/${userRatings[i].movieId}`} onClick={() => setAMovie({"movieId": userRatings[i].movieId})}>
                            <img src={userRatings[i].posterPath} style={{height:"100px"}} />
                            <p>{userRatings[i].movieTitle}</p>
                            <p>{userRatings[i].userRating}</p>
                        </ReactRouterDOM.Link>
                    </div>
                );
            }
            setUserRatingDivs(makeUserRatings);
        })
    }, []);

    return (
        <React.Fragment>
            <h1>User {aUser.userId}</h1>
            <p>email: {aUser.email}</p>
            <h3>User Ratings</h3>
            <div>
                {userRatingDivs}
            </div>
        </React.Fragment>
    );
}