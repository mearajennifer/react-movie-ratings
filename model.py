"""Models for movie ratings app."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


# classes for the ratings web app
class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    # rating = db.relationship("Rating")

    def __repr__(self):
        """A readable representation of a User object."""
        return f"<User id={self.user_id} email={self.email}"
    
    def to_dict(self):
        return {'userId': self.user_id,
                'email': self.email}

class Movie(db.Model):
    """A movie."""

    __tablename__ = "movies"

    movie_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String)
    overview = db.Column(db.Text)
    release_date = db.Column(db.DateTime)
    poster_path = db.Column(db.String)

    # rating = db.relationship("Rating")

    def __repr__(self):
        """A readable representatino of a Movie object."""
        return f"<Movie id={self.movie_id} title={self.title}"
    
    def to_dict(self):
        return {'movieId': self.movie_id,
                'title': self.title,
                'overview': self.overview,
                'releaseDate': self.release_date,
                'posterPath': self.poster_path}

class Rating(db.Model):
    """A rating."""

    __tablename__ = "ratings"

    rating_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    score = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.movie_id"))

    # relationships
    user = db.relationship("User", backref="ratings")
    movie = db.relationship("Movie", backref="ratings")

    def __repr__(self):
        """A readable representation of a Rating object."""
        return f"<Rating id={self.rating_id} score={self.score}>"


def connect_to_db(flask_app, db_uri="postgresql:///ratings", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = False
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)
