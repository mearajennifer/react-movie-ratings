"""Server for movie ratings app."""

from flask import (Flask, render_template, request, session, jsonify)
from model import connect_to_db, User, Movie, Rating
import crud
from random import randint, choice

app = Flask(__name__)
app.secret_key = "dev"

GENRES = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller"]



##################################################################
# ROUTES #
##################################################################

@app.route("/")
def show_homepage():
    return render_template("index.html")

@app.route("/api/movies")
def show_all_movies():
    movies = crud.query_all_movies()
    return jsonify({movie.movie_id: movie.to_dict() for movie in movies})

# @app.route("/api/movies/<movie_id>")
# def show_movie(movie_id):
#     movie = crud.query_movie_by_id(movie_id)

#     if "user_id" in session:
#         user = crud.query_user_by_id(session["user_id"])
#         rating = crud.query_rating(user, movie)
#     else:
#         rating = None
    
#     average = crud.get_average_movie_rating(movie)

#     return render_template('movie_details.html', movie=movie, rating=rating, average=average)

# @app.route("/movies/<movie_id>/rate", methods=["POST"])
# def create_rating(movie_id):
#     if "user_id" not in session:
#         flash("Please login to start rating movies.")
#         return redirect("/")

#     user_id = session["user_id"]
#     score = request.form.get("score")

#     user = crud.query_user_by_id(user_id)
#     movie = crud.query_movie_by_id(movie_id)

#     rating = crud.query_rating(user, movie)
#     # {{ '%0.2f'| format(average|float) }}

#     if rating:
#         crud.update_rating(rating, score)
#     else:
#         new_rating = crud.create_rating(user, movie, score)

#     flash(f"You've rated rated {movie.title} {score} out of 5.")

#     return redirect(f"/movies/{movie.movie_id}")

@app.route("/api/users", methods=["GET"])
def show_all_users():
    users = crud.query_all_users()
    return jsonify({user.user_id: user.to_dict() for user in users})

@app.route("/api/register", methods=["POST"])
def register_user():
    """Create user."""

    email = request.json.get("email")
    password = request.json.get("pass")
    print()
    print(f"Received register email:{email}, pass: {password}")
    print()

    verify_email = crud.query_user_by_email(email)
    if verify_email:
        success = False
        msg = "A user with that email is already registered. Please log in."
    else:
        new_user = crud.create_user(email, password)
        print()
        print(new_user)
        print()
        success = True
        msg = "Thanks for registering! Please log in."
    
    return jsonify({"success": success, "msg": msg})


@app.route("/api/login", methods=["POST"])
def login_user():
    """Login user."""

    email = request.json.get("loginEmail")
    password = request.json.get("loginPass")
    print()
    print(f"Received login email:{email}, pass: {password}")
    print()

    user = crud.query_user_by_email(email)
    if user:
        print()
        print(user)
        print()
        if password == user.password:
            success = True
            msg = "You are now logged in!"
        else:
            success = False
            msg = "Incorrect password."
    else:
        success = False
        msg = "No user with that password exists!"

    return jsonify({
        "success": success, 
        "msg": msg, 
        "user": {
            "user_id": user.user_id,
            "email": user.email,
        }
    })


@app.route("/api/user-data", methods=["POST"])
def get_user_data():
    # Need to update user table to store more info on user
    # for now we'll make it up
    user_id = request.json.get("userId")
    user = crud.query_user_by_id(user_id)

    fav_movie = crud.query_movie_by_id(randint(1,80))
    fav_genre = choice(GENRES)
    print()
    print(f"user_id: {user_id} favMovie: {fav_movie.title}, favGenre: {fav_genre}")
    print()

    return jsonify({"userId": user_id, "favMovie": fav_movie.title, "favGenre": fav_genre})


@app.route("/api/user-ratings", methods=["POST"])
def get_user_ratings():
    user_id = request.json.get("userId")
    ratings = Rating.query.filter_by(user_id=user_id).all()
    print()
    print(f"user_id is {user_id}")
    print("ratings are")
    print(ratings)
    print()

    user_ratings = []

    for rating in ratings:
        user_ratings.append({
            "movieId": rating.movie_id,
            "movieTitle": rating.movie.title,
            "movieImg": rating.movie.poster_path,
            "userRating": rating.score,
        })

    return jsonify({"userRatings": user_ratings})



if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)

    app.run(host="0.0.0.0", debug=True)
