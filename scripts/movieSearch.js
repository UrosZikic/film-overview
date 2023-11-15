// call specific page
const movieSubmit = document.querySelector(".submit-button");
const movieInput = document.querySelector(".movie-browser");
let currentPage = 1;

const fetchAndClear = () => {
  fetchMovie(movieInput.value);
  movieInput.value = "";
};

movieSubmit.onclick = fetchAndClear;

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    movieSubmit.click();
  }
});

//
async function fetchMovie(movieName) {
  try {
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        movieName
      )}&page=${currentPage}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("error 404");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        iFrameSet();
        while (movieContainer.firstChild) {
          movieContainer.removeChild(movieContainer.firstChild);
        }
        const baseUrl = "https://image.tmdb.org/t/p/";
        const imageSize = "w500";

        for (let i = 0; i < data.results.length; i++) {
          const imageContainer = document.createElement("div");
          const img = document.createElement("img");
          const movieName = document.createElement("p");

          imageContainer.classList.add("image-container-three");

          if (data.results[i].backdrop_path) {
            img.src = baseUrl + imageSize + data.results[i].backdrop_path;
            img.classList.add("backdrop-path");
          } else if (
            data.results[i].poster_path &&
            !data.results[i].backdrop_path
          ) {
            img.src = baseUrl + imageSize + data.results[i].poster_path;
            img.classList.add("poster-path");
          } else if (
            !data.results[i].poster_path &&
            !data.results[i].backdrop_path
          ) {
            img.src =
              "https://t3.ftcdn.net/jpg/05/09/38/44/360_F_509384487_IA21H3HyRO4whYBRcLG3BvClrRvXLvmw.jpg";
            img.classList.add("poster-path");
          }
          img.alt = "movie poster";
          img.classList.add("poster");

          movieName.textContent = data.results[i].title;
          movieName.classList.add("movie-name");

          imageContainer.appendChild(img);
          imageContainer.appendChild(movieName);

          movieContainer.appendChild(imageContainer);
        }
        const imgContainer3 = document.querySelectorAll(
          ".image-container-three"
        );
        const infoModal3 = document.querySelector(".info-modal-three");
        const modalImage3 = document.querySelector(".modal-image-three");
        const modalName3 = document.querySelector(".modal-name-three");
        const modalRelease3 = document.querySelector(".modal-release-three");
        const modalVote3 = document.querySelector(".modal-vote-three");
        const modalOverview3 = document.querySelector(".modal-overview-three");
        const modalGenre3 = document.querySelector(".modal-genre-three");
        const modalPg3 = document.querySelector(".modal-pg-three");
        const infoInner3 = document.querySelector(".info-inner-three");

        document.body.onclick = (event) => {
          const isInsideModal = event.target.closest(".info-modal-three");
          if (!isInsideModal) {
            if (!infoModal3.classList.contains("invisible-three")) {
              infoModal3.classList.add("invisible-three");
              movieContainer.style.filter = "blur(0px)";
            }
          }
        };
        infoModal3.onclick = (event) => {
          // Prevent the click event from propagating to the body
          event.stopPropagation();
        };

        imgContainer3.forEach((movie, index) => {
          if (data.results[index]) {
            let totalVotes = data.results[index].vote_count || 0;
            let averageGrade = data.results[index].vote_average || 0;

            movie.addEventListener("click", function (event) {
              event.stopPropagation();
              console.log("SUCCESS");

              let genreContainer = [];
              let genreNames = "";

              movieContainer.style.filter = "blur(4px)";

              if (infoModal3.classList.contains("invisible-three")) {
                infoModal3.classList.remove("invisible-three");
              }

              infoInner3.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${
                baseUrl + imageSize + data.results[index].poster_path
              })`;
              infoInner3.style.backgroundSize = "cover";

              modalImage3.src =
                baseUrl + imageSize + data.results[index].poster_path;
              modalName3.textContent =
                "Show name: " + data.results[index].title;
              modalRelease3.textContent =
                "Release date: " + data.results[index].release_date;
              modalPg3.textContent = data.results[index].adult
                ? "Adult rating: R-rated"
                : "Adult rating: PG-13";
              if (averageGrade && totalVotes) {
                modalVote3.innerHTML = `Average score: ${averageGrade} - total votes: ${totalVotes}`;
              } //  genre id extraction
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
              modalGenre3.innerHTML = "Genre: " + genreNames.slice(0, -2);
              // end genre ex and con
              modalOverview3.innerHTML =
                "Overview: " + data.results[index].overview;
            });
          }
        });
      })
      .catch((error) => {
        console.error(`you have an error!`, error);
      });
  } catch (error) {
    console.error("error", error);
  }
}
