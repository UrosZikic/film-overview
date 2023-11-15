const carouselContainer = document.querySelector(".carousel-container");
const topRatedCarousel = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&with_genres=28&page=2 `;
featureCarousel(topRatedCarousel, carouselContainer);

const secondCarouselContainer = document.querySelector(
  ".carousel-container--two"
);
const anotherGenreCarouselUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&with_genres=35&page=2`;
featureCarouselTwo(anotherGenreCarouselUrl, secondCarouselContainer);

async function featureCarousel(url, container) {
  try {
    await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("error 404");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const baseUrl = "https://image.tmdb.org/t/p/";
        const imageSize = "w500";
        for (let i = 0; i < data.results.length; i++) {
          const item = document.createElement("div");
          item.classList.add("item");
          const image = document.createElement("img");
          const name = document.createElement("p");
          if (data.results[i].backdrop_path) {
            image.src = baseUrl + imageSize + data.results[i].backdrop_path;
          } else {
            image.src = baseUrl + imageSize + data.results[i].poster_path;
          }
          image.alt = "movie poster - carousel";
          name.textContent = data.results[i].title;
          name.classList.add("carousel-item--name");
          image.classList.add("image-container");
          item.appendChild(image);
          item.appendChild(name);
          // carouselContainer.appendChild(item);
          container.appendChild(item);
        }
        // modal attempt
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

        // MOVIE DETAILS MODAL
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

        //

        // Initialize the Slick carousel after dynamically adding items
        $(container).slick({
          lazyLoad: "ondemand",
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 5,
          slidesToScroll: 6,
          prevArrow:
            '<button class="slick-prev"><ion-icon name="chevron-back-outline"></ion-icon></button>',
          nextArrow:
            '<button class="slick-next"><ion-icon name="chevron-forward-outline"></ion-icon></button>',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
      })
      .catch((error) => {
        console.error("you have an error!", error);
      });
  } catch (error) {
    console.error("error", error);
  }
}

// x

async function featureCarouselTwo(url, container) {
  try {
    await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("error 404");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const baseUrl = "https://image.tmdb.org/t/p/";
        const imageSize = "w500";
        for (let i = 0; i < data.results.length; i++) {
          const item = document.createElement("div");
          item.classList.add("item");
          const image = document.createElement("img");
          const name = document.createElement("p");
          if (data.results[i].backdrop_path) {
            image.src = baseUrl + imageSize + data.results[i].backdrop_path;
          } else {
            image.src = baseUrl + imageSize + data.results[i].poster_path;
          }
          image.alt = "movie poster - carousel";
          name.textContent = data.results[i].title;
          name.classList.add("carousel-item--name");
          image.classList.add("image-container");
          item.appendChild(image);
          item.appendChild(name);
          container.appendChild(item);
        }
        // modal attempt
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

        // MOVIE DETAILS MODAL
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

        // Initialize the Slick carousel after dynamically adding items
        $(container).slick({
          lazyLoad: "ondemand",
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 5,
          slidesToScroll: 6,
          prevArrow:
            '<button class="slick-prev"><ion-icon name="chevron-back-outline"></ion-icon></button>',
          nextArrow:
            '<button class="slick-next"><ion-icon name="chevron-forward-outline"></ion-icon></button>',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
      })
      .catch((error) => {
        console.error("you have an error!", error);
      });
  } catch (error) {
    console.error("error", error);
  }
}
