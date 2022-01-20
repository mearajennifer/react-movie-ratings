"""Seed the ratings database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system('dropdb ratings')
os.system('createdb ratings')

model.connect_to_db(server.app)
model.db.create_all()

with open("data/movies.json") as f:
    movie_data = json.loads(f.read())

    movies_in_db = []
    for data in movie_data:

        movie = crud.create_movie(data['title'],
                                  data['overview'],
                                  datetime.strptime(data['release_date'], "%Y-%m-%d"),
                                  data['poster_path'])
        movies_in_db.append(movie)
    print(movies_in_db[:5])

for num in range(1, 11):
    email = f"user{num}@test.com"
    password = "test"

    user = crud.create_user(email, password)

    for n in range(10):
        movie = choice(movies_in_db)
        score = randint(1, 5)
        rating = crud.create_rating(user, movie, score)
