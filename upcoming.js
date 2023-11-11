const upcomingApiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=2`;

const upcomingBtn = document.querySelector(".upcoming");

upcomingBtn.onclick = () => {
  upcomingTop();
};

async function upcomingTop() {
  try {
    await fetch(upcomingApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("error 404");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        while (movieContainer.firstChild) {
          movieContainer.removeChild(movieContainer.firstChild);
        }
        const baseUrl = "https://image.tmdb.org/t/p/";
        const imageSize = "w500";

        for (let i = 0; i < data.results.length; i++) {
          const imageContainer = document.createElement("div");
          const img = document.createElement("img");
          const movieName = document.createElement("p");

          imageContainer.classList.add("image-container");

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
          if (data.results[index]) {
            let totalVotes = data.results[index].vote_count || 0;
            let averageGrade = data.results[index].vote_average || 0;

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
              if (averageGrade && totalVotes) {
                modalVote.innerHTML = `Average score: ${averageGrade} - total votes: ${totalVotes}`;
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
              modalGenre.innerHTML = "Genre: " + genreNames.slice(0, -2);
              // end genre ex and con
              modalOverview.innerHTML =
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
