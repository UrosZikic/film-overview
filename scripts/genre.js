const genre = {
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

const genreTV = {
  genres: [
    {
      id: 10759,
      name: "Action",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi",
    },
    {
      id: 10766,
      name: "Soap",
    },

    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

// logic to retrieve the genre
const elements = document.querySelectorAll(".genre");

elements.forEach((element) => {
  element.onclick = () => {
    let genreId;
    const name = element.textContent;
    document.querySelector(".result-title").textContent = name;

    if (callTvDefault.innerHTML === "Series") {
      for (let i = 0; i < genre.genres.length; i++) {
        if (name === genre.genres[i].name) {
          genreId = genre.genres[i].id;
          break;
        }
      }
    } else {
      for (let i = 0; i < genre.genres.length; i++) {
        if (name === genreTV.genres[i].name) {
          genreId = genreTV.genres[i].id;
          break;
        }
      }
    }
    const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreId}`;
    const TVgenre = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}`;

    currentApiUrl = callTvDefault.innerHTML === "Movies" ? TVgenre : genreUrl;

    // -----------------------
    pagination = [];
    fetchMovies(currentApiUrl, "movie-id");
    toggleUp();
  };
});
