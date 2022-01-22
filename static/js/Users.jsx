const { useState } = require("react");

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
            <h1>User {aUser.userId}</h1>
            <p>email: {aUser.email}</p>
        </React.Fragment>
    );
}