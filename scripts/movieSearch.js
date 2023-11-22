// call specific page
const movieSubmit = document.querySelector(".submit-button");
const movieInput = document.querySelector(".movie-browser");
const resultNotification = document.querySelector(".result-notification");

const fetchAndClear = () => {
  if (callTvDefault.innerHTML !== "Series") {
    currentApiUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(
      movieInput.value
    )}`;
  } else {
    currentApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      movieInput.value
    )}`;
  }
  localStorage.setItem("page-num", 1);
  fetchSpecificMovie(movieInput.value, currentApiUrl);
  if (movieInput.value) {
    toggleUp();
  }
  const resultTitle = document.querySelector(".result-title");
  resultTitle.textContent = "Results for: " + movieInput.value;

  movieInput.value = "";
};

movieSubmit.onclick = fetchAndClear;

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    movieSubmit.click();
  }
});

//
async function fetchSpecificMovie(movieName, url) {
  try {
    if (movieName) {
      await fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("error 404");
          }
          return response.json();
        })
        .then((data) => {
          const totalPages = data.total_pages;
          if (data.total_results > 0) {
            resultNotification.classList.add("invisible");

            // iFrameSet(false);
            scrollToMovies("movie-id");
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
              } else {
                img.src =
                  "https://t3.ftcdn.net/jpg/05/09/38/44/360_F_509384487_IA21H3HyRO4whYBRcLG3BvClrRvXLvmw.jpg";
                img.classList.add("poster-path");
              }
              img.alt = "movie poster";
              img.classList.add("poster");

              movieName.textContent = data.results[i].title
                ? data.results[i].title
                : data.results[i].name;
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

            // document.body.onclick = (event) => {
            //   const isInsideModal = event.target.closest(".info-modal");
            //   if (!isInsideModal) {
            //     if (!infoModal.classList.contains("invisible")) {
            //       infoModal.classList.add("invisible");
            //       movieContainer.style.filter = "blur(0px)";
            //     }
            //   }
            // };
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
                  document
                    .querySelector(".overlay-body")
                    .classList.remove("overlay-disappear");
                  document.querySelector("body").style.overflow = "hidden";

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

                  if (data.results[index].poster_path) {
                    modalImage.src =
                      baseUrl + imageSize + data.results[index].poster_path;
                  } else if (data.results[index].backdrop_path) {
                    modalImage.src =
                      baseUrl + imageSize + data.results[index].backdrop_path;
                  } else {
                    modalImage.src = "/images/tba.jpg";
                  }

                  modalName.textContent = data.results[index].title
                    ? `Show name: ${data.results[index].title}`
                    : `Show name: ${data.results[index].name}`;
                  modalRelease.textContent = data.results[index].release_date
                    ? `Release date: ${data.results[index].release_date}`
                    : `First release on: ${data.results[index].first_air_date}`;
                  modalPg.textContent = data.results[index].adult
                    ? "Adult rating: R-rated"
                    : "Adult rating: PG-13";
                  if (averageGrade && totalVotes) {
                    modalVote.innerHTML = `Average score: ${averageGrade} - total votes: ${totalVotes}`;
                  } //  genre id extraction
                  for (
                    let i = 0;
                    i < data.results[index].genre_ids.length;
                    i++
                  ) {
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
                // PAGINATION

                let paginationContainer = document.querySelector(".pagination");
                while (paginationContainer.firstChild) {
                  paginationContainer.removeChild(
                    paginationContainer.firstChild
                  );
                }

                if (pagination.length === 0) {
                  for (let i = 1; i <= totalPages; i++) {
                    if (i <= 10) {
                      pagination.push(i);
                      if (pagination.length === 10) {
                        break;
                      }
                    }
                  }

                  const prevLink = document.createElement("button");
                  const nextLink = document.createElement("button");
                  prevLink.textContent = "<";
                  nextLink.textContent = ">";
                  prevLink.classList.add("previous-page--link");
                  nextLink.classList.add("next-page--link");

                  //work in progress
                  paginationContainer.appendChild(prevLink);
                  const prevLinkDOM = document.querySelector(
                    ".previous-page--link"
                  );

                  for (let i = 1; i <= pagination.length; i++) {
                    const page = document.createElement("button");
                    page.textContent = `${pagination[i - 1]}`;
                    page.classList.add("page-link");
                    paginationContainer.appendChild(page);
                  }
                  //work
                  paginationContainer.appendChild(nextLink);
                  const nextLinkDOM =
                    document.querySelector(".next-page--link");
                } else {
                  pagination = [];
                  pagination.push(Number(localStorage.getItem("page-num")));

                  for (let i = pagination[0] + 1; i <= totalPages; i++) {
                    if (i <= i + 9) {
                      pagination.push(i);
                      if (pagination.length === 10) {
                        break;
                      }
                    }
                  }

                  const prevLink = document.createElement("button");
                  const nextLink = document.createElement("button");
                  prevLink.textContent = "<";
                  nextLink.textContent = ">";
                  prevLink.classList.add("previous-page--link");
                  nextLink.classList.add("next-page--link");

                  //work in progress
                  paginationContainer.appendChild(prevLink);

                  for (let i = 1; i <= pagination.length; i++) {
                    const page = document.createElement("button");
                    page.textContent = `${pagination[i - 1]}`;
                    page.classList.add("page-link");
                    paginationContainer.appendChild(page);
                  }
                  //work
                  paginationContainer.appendChild(nextLink);
                }
                const prevLinkDOM = document.querySelector(
                  ".previous-page--link"
                );
                const nextLinkDOM = document.querySelector(".next-page--link");
                const pageLinks = document.querySelectorAll(".page-link");

                let currentPageNumber = Number(
                  localStorage.getItem("page-num")
                );

                pageLinks.forEach((link, index) => {
                  link.addEventListener("click", () => {
                    // Calculate the page number based on the index
                    pageNumber = Number(link.textContent);
                    localStorage.setItem("page-num", pageNumber);
                    // Use the correct API URL based on the current category
                    let linkUrl = currentApiUrl + `&page=${pageNumber}`;
                    fetchMovies(linkUrl, "movie-id");
                  });
                });

                nextLinkDOM.addEventListener("click", () => {
                  let currentLastPage = pagination[pagination.length - 1];
                  if (totalPages - currentLastPage >= 10) {
                    lastPage = currentLastPage + 1;
                  } else {
                    lastPage = totalPages - 9;
                  }
                  //needs more work: what if 9
                  localStorage.setItem("page-num", lastPage);
                  let linkUrl = currentApiUrl + `&page=${lastPage}`;
                  fetchMovies(linkUrl, "movie-id");
                });

                prevLinkDOM.addEventListener("click", () => {
                  let firstPage;
                  if (pagination[0] > 10) {
                    firstPage = pagination[0] - 10;
                  } else {
                    firstPage = 1;
                  }
                  localStorage.setItem("page-num", firstPage);
                  let linkUrl = currentApiUrl + `&page=${firstPage}`;
                  fetchMovies(linkUrl, "movie-id");
                });

                // end pagination
              }
            });
          } else {
            // execute based on series / movies filter
            const type = document.querySelector(".type");
            if (type.textContent === "Series") {
              fetchMovies(discoverUrl);
            } else {
              const tvDefault = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`;
              fetchMovies(tvDefault);
            }
            resultNotification.classList.remove("invisible");
          }
        })
        .catch((error) => {
          console.error(`you have an error!`, error);
        });
    }
  } catch (error) {
    console.error("error", error);
  }
}
