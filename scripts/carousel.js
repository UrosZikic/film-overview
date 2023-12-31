document.querySelector(".exit-modal-three").onclick = () => {
  document.querySelector(".info-modal-three").classList.add("invisible-three");
  document.querySelector("body").style.overflow = "auto";
  movieContainer.style.filter = "blur(0px)";
  document.querySelectorAll(".carousel-outer").forEach((container) => {
    container.style.filter = "blur(0px)";
  });
  document.querySelector(".result-title").style.filter = "blur(0px)";
  // document.querySelector(".youtube-container").style.filter = "blur(0px)";
};
// carousel
var carouselContainer = document.querySelector(".carousel-container");
const carouselTitle = document.querySelector(".caro-title-one");

// var carouselContainer = document.querySelector(".carousel-container");
const randPage = Math.floor(Math.random() * 3 + 1);
const genreGroupOne = [0, 28, 12, 16, 35, 80, 17, 10751, 14, 36];
const randGenre = Math.floor(Math.random() * 10 + 1);

for (let i = 0; i < genre.genres.length; i++) {
  if (genreGroupOne[randGenre] === genre.genres[i].id) {
    carouselTitle.textContent = "Best " + "Animation" + " flicks";
  }
}

let topRatedCarousel;
if (callTvDefault.innerHTML !== "Series") {
  topRatedCarousel = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=1&with_genres=16&page=2`;
} else {
  topRatedCarousel = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&with_genres=16&page=${randPage}`;
}
featureCarousel(topRatedCarousel, carouselContainer);

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
          item.classList.add("image-container-three");
          item.appendChild(image);
          item.appendChild(name);
          // carouselContainer.appendChild(item);
          container.appendChild(item);
        }

        // modal attempt
        // added
        // const opener = document.querySelectorAll(".item");
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

        document.body.onclick = () => {
          if (!infoModal3.classList.contains("invisible-three")) {
            document.querySelector("body").style.overflow = "auto";
            infoModal3.classList.add("invisible-three");
            movieContainer.style.filter = "blur(0px)";
            document
              .querySelectorAll(".carousel-outer")
              .forEach((container) => {
                container.style.filter = "blur(0px)";
              });
            document.querySelector(".result-title").style.filter = "blur(0px)";
            // document.querySelector(".youtube-container").style.filter =
            //   "blur(0px)";
            document
              .querySelector(".overlay-body")
              .classList.add("overlay-disappear");
          }
        };

        // MOVIE DETAILS MODAL
        infoModal3.onclick = (event) => {
          // Prevent the click event from propagating to the body
          event.stopPropagation();
        };
        // changed
        imgContainer3.forEach((movie, index) => {
          if (data.results[index]) {
            let totalVotes = data.results[index].vote_count || 0;
            let averageGrade = data.results[index].vote_average || 0;

            movie.addEventListener("click", function (event) {
              event.stopPropagation();
              document
                .querySelector(".overlay-body")
                .classList.remove("overlay-disappear");
              const lModal1 = document.querySelector(".info-modal");
              const lModal2 = document.querySelector(".info-modal-two");
              lModal2.classList.add("invisible-two");
              lModal1.classList.add("invisible");

              document.querySelector("body").style.overflow = "hidden";

              let genreContainer = [];
              let genreNames = "";

              movieContainer.style.filter = "blur(4px)";
              document
                .querySelectorAll(".carousel-outer")
                .forEach((container) => {
                  container.style.filter = "blur(4px)";
                });
              document.querySelector(".result-title").style.filter =
                "blur(4px)";
              // document.querySelector(".youtube-container").style.filter =
              //   "blur(4px)";

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

        //

        // Initialize the Slick carousel after dynamically adding items
        $(container).slick({
          lazyLoad: "ondemand",
          dots: false,
          infinite: true,
          swipe: false,
          speed: 500,
          slidesToShow: 5,
          slidesToScroll: 1,
          prevArrow:
            '<button class="slick-prev" aria-label="Scroll Left""><ion-icon name="chevron-back-outline"></ion-icon></button>',
          nextArrow:
            '<button class="slick-next" aria-label="Scroll right""><ion-icon name="chevron-forward-outline"></ion-icon></button>',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                swipe: true,
                infinite: true,
                dots: false,
              },
            },
            {
              breakpoint: 600,
              settings: {
                swipe: true,
                infinite: true,
                dots: false,
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                swipe: true,
                infinite: true,
                dots: false,
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
