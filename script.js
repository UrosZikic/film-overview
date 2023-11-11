const apiKey = "245d71936de55c199391618d2d244f64";
// random list of popular movies for landing page
const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
// call specific page
const TotalMoviePages = 40919;
// const discoverCustomUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${page}`;

const navigation = document.querySelector(".navJsClass");

window.addEventListener("scroll", function () {
  // Get the number of pixels scrolled from the top
  var pixelsFromTop = window.scrollY;
  if (pixelsFromTop >= 25) {
    navigation.classList.add("navScroll");
  } else {
    navigation.classList.remove("navScroll");
  }
});

// start responsive fixes
const navbarResponsive = document.querySelector(".navbar-nav-manipulate");

function resizeNav() {
  var windowWidth = window.innerWidth;

  if (windowWidth <= 991) {
    navbarResponsive.classList.add("navbar-nav-additional");
  } else {
    navbarResponsive.classList.remove("navbar-nav-additional");
  }
}
window.addEventListener("load", resizeNav);
window.addEventListener("resize", resizeNav);
// end responsive fixes

const movieContainer = document.querySelector(".movie-container");
//
(async function fetchRandom() {
  try {
    await fetch(discoverUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("error 404");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.results[0]);

        const baseUrl = "https://image.tmdb.org/t/p/";
        const imageSize = "w500";

        for (let i = 0; i < data.results.length; i++) {
          const movieValue = i;

          const imageContainer = document.createElement("div");
          const img = document.createElement("img");
          const movieName = document.createElement("p");

          imageContainer.classList.add("image-container");

          img.src = baseUrl + imageSize + data.results[i].backdrop_path;
          img.alt = "movie poster";
          img.classList.add("poster");

          movieName.textContent = data.results[i].title;
          movieName.classList.add("movie-name");

          imageContainer.appendChild(img);
          imageContainer.appendChild(movieName);

          movieContainer.appendChild(imageContainer);
        }
        const imgContainer = document.querySelectorAll(".image-container");
        const infoModal = document.querySelector(".info-modal");
        const modalImage = document.querySelector(".modal-image");
        const modalName = document.querySelector(".modal-name");
        const modalRelease = document.querySelector(".modal-release");
        const modalVote = document.querySelector(".modal-vote");
        const modalOverview = document.querySelector(".modal-overview");
        const modalGenre = document.querySelector(".modal-genre");
        const modalPg = document.querySelector(".modal-pg");
        const infoInner = document.querySelector(".info-inner");

        document.body.onclick = () => {
          if (!infoModal.classList.contains("invisible")) {
            infoModal.classList.add("invisible");
            movieContainer.style.filter = "blur(0px)";
          }
        };

        infoModal.onclick = (event) => {
          // Prevent the click event from propagating to the body
          event.stopPropagation();
        };

        imgContainer.forEach((movie, index) => {
          const averageGrade = data.results[index].vote_average;
          const totalVotes = data.results[index].vote_count;
          movie.addEventListener("click", function (event) {
            event.stopPropagation();

            let genreContainer = [];
            let genreNames = "";

            movieContainer.style.filter = "blur(4px)";

            if (infoModal.classList.contains("invisible")) {
              infoModal.classList.remove("invisible");
            }

            infoInner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${
              baseUrl + imageSize + data.results[index].poster_path
            })`;
            infoInner.style.backgroundSize = "cover";

            modalImage.src =
              baseUrl + imageSize + data.results[index].poster_path;
            modalName.textContent = "Show name: " + data.results[index].title;
            modalRelease.textContent =
              "Release date: " + data.results[index].release_date;
            modalPg.textContent = data.results[index].adult
              ? "Adult rating: R-rated"
              : "Adult rating: PG-13";
            modalVote.innerHTML = `Average score: ${averageGrade} - total votes: ${totalVotes}`;
            //  genre id extraction
            for (let i = 0; i < data.results[index].genre_ids.length; i++) {
              genreContainer.push(data.results[index].genre_ids[i]);
            }
            // genre id to name identification and appendage
            for (let i = 0; i < genre.genres.length; i++) {
              if (genreContainer.includes(genre.genres[i].id)) {
                genreNames += `${genre.genres[i].name}, `;
              }
            }
            //display genres
            modalGenre.innerHTML = "Genre: " + genreNames.slice(0, -2);
            // end genre ex and con
            modalOverview.innerHTML =
              "Overview: " + data.results[index].overview;
          });
        });
      })
      .catch((error) => {
        console.error(`you have an error!`, error);
      });
  } catch (error) {
    console.error("error", error);
  }
})();
