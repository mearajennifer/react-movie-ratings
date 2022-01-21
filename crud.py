"""CRUD operations."""

from model import db, User, Movie, Rating, connect_to_db


def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user

def create_movie(title, overview, release_date, poster_path):
    """Create and return a new movie."""

    movie = Movie(title=title,
                  overview=overview,
                  release_date=release_date,
                  poster_path=poster_path)
    
    db.session.add(movie)
    db.session.commit()

    return movie

def create_rating(user, movie, score):
    """Create and return a new rating."""

    rating = Rating(user=user, movie=movie, score=score)

    db.session.add(rating)
    db.session.commit()

    return rating

def query_all_movies():
    """Return all movies in a list."""

    return Movie.query.all()

def query_all_users():
    """Return all users in a list."""

    return User.query.all()

def query_movie_by_id(movie_id):
    """Return movie object by id."""

    return Movie.query.get(movie_id)

def query_user_by_id(user_id):
    """Return user object by id."""

    return User.query.get(user_id)

def query_user_by_email(email):
    """Return user object by email."""

    return User.query.filter_by(email=email).first()

def query_rating(user, movie):
    """Return rating object."""

    return Rating.query.filter_by(user=user, movie=movie).first()

def get_average_movie_rating(movie):
    """Return list of all ratings for movie."""

    ratings = Rating.query.filter_by(movie=movie).all()

    total = 0
    count = 0

    if ratings:
        for rating in ratings:
            total += rating.score
            count += 1
        return [int(round(total/count, 0)), count]
    
    return None


def update_rating(rating, score):
    """Update a movie's rating."""

    rating.score = score
    db.session.commit()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)