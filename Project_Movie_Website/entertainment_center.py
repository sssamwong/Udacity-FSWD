import media
import fresh_tomatoes


# code to make a movies website

# dd movie - Captain America
cap_america = media.Movie("Captain America",
                          "Birth and transformation of an American hero",
                          "https://upload.wikimedia.org/wikipedia/en/3/37/"
                          "Captain_America_The_First_Avenger_poster.jpg",
                          "https://www.youtube.com/watch?v=JerVrbLldXw")

# add movie - Avatar
avatar = media.Movie("Avatar",
                     "A marine on an alien planet",
                     "https://upload.wikimedia.org/wikipedia/"
                     "en/b/b0/Avatar-Teaser-Poster.jpg",
                     "https://www.youtube.com/watch?v=5PSNL1qE6VY")

# add movie - The Stolen Years
the_stolen_years = media.Movie("The Stolen Years",
                               "A story of a divorced couple reunions after "
                               "the wife lost her memory",
                               "https://upload.wikimedia.org/wikipedia/"
                               "en/d/d1/The_Stolen_Years_poster.jpg",
                               "https://www.youtube.com/watch?v=6gqZiR7rMHM")

# add movie - Secretly, Greatly
secretyly_greatly = media.Movie("Secretly, Greatly",
                                "A few young spies were trained by North "
                                "Korean elite forces, to unify Korea",
                                "https://upload.wikimedia.org/wikipedia/"
                                "zh/1/10/Secretly_Greatly.jpg",
                                "https://www.youtube.com/watch?v=uhwb4mlXtGI")

# add movie - Duckweed
duckweed = media.Movie("Duckweed",
                       "The story about the reconciliation "
                       "between a father and his son",
                       "https://upload.wikimedia.org/wikipedia/"
                       "en/1/13/Duckweed_Film_Poster.jpg",
                       "https://www.youtube.com/watch?v=Pu7ZARHtX10")

# add movie - Love in the Buff
love_in_the_buff = media.Movie("Love in the Buff",
                               "Five months after the events in Love in a "
                               "Puff, Jimmy was under a high pressure in "
                               "working hours and workload, Cherie was "
                               "dissatisfied with it...",
                               "https://upload.wikimedia.org/wikipedia/"
                               "en/thumb/2/21/Love_in_the_Buff_poster.jpg/"
                               "220px-Love_in_the_Buff_poster.jpg",
                               "https://www.youtube.com/watch?v=OoFNhcl-gXA")

movies = [cap_america,
          avatar,
          the_stolen_years,
          secretyly_greatly,
          duckweed,
          love_in_the_buff]
fresh_tomatoes.open_movies_page(movies)
