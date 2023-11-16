document.querySelector(".exit-modal-two").onclick = () => {
  document.querySelector(".info-modal-two").classList.add("invisible-two");
  movieContainer.style.filter = "blur(0px)";
};

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
        // create carousel items
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
          image.classList.add("image-container-two");
          item.appendChild(image);
          item.appendChild(name);
          container.appendChild(item);
        }
        // modal attempt
        const imgContainer2 = document.querySelectorAll(".image-container-two");
        const infoModal2 = document.querySelector(".info-modal-two");
        const modalImage2 = document.querySelector(".modal-image-two");
        const modalName2 = document.querySelector(".modal-name-two");
        const modalRelease2 = document.querySelector(".modal-release-two");
        const modalVote2 = document.querySelector(".modal-vote-two");
        const modalOverview2 = document.querySelector(".modal-overview-two");
        const modalGenre2 = document.querySelector(".modal-genre-two");
        const modalPg2 = document.querySelector(".modal-pg-two");
        const infoInner2 = document.querySelector(".info-inner-two");

        document.addEventListener("click", function (event) {
          const infoModal2 = document.querySelector(".info-modal-two");

          // Check if the clicked element is not a descendant of infoModal2
          if (!infoModal2.contains(event.target)) {
            document.querySelector("body").style.overflow = "auto";
            infoModal2.classList.add("invisible-two");
            movieContainer.style.filter = "blur(0px)";
          }
        });
        // MOVIE DETAILS MODAL
        infoModal2.onclick = (event) => {
          // Prevent the click event from propagating to the body
          event.stopPropagation();
          // infoModal2.classList.add("invisible-two");
        };

        imgContainer2.forEach((movie, index) => {
          if (data.results[index]) {
            let totalVotes = data.results[index].vote_count || 0;
            let averageGrade = data.results[index].vote_average || 0;

            movie.addEventListener("click", function (event) {
              event.stopPropagation();
              const lModal1 = document.querySelector(".info-modal");
              const lModal3 = document.querySelector(".info-modal-three");
              lModal1.classList.add("invisible");
              lModal3.classList.add("invisible-three");

              document.querySelector("body").style.overflow = "hidden";

              let genreContainer = [];
              let genreNames = "";

              movieContainer.style.filter = "blur(4px)";

              if (infoModal2.classList.contains("invisible-two")) {
                infoModal2.classList.remove("invisible-two");
              }

              infoInner2.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${
                baseUrl + imageSize + data.results[index].poster_path
              })`;
              infoInner2.style.backgroundSize = "cover";

              modalImage2.src =
                baseUrl + imageSize + data.results[index].poster_path;
              modalName2.textContent =
                "Show name: " + data.results[index].title;
              modalRelease2.textContent =
                "Release date: " + data.results[index].release_date;
              modalPg2.textContent = data.results[index].adult
                ? "Adult rating: R-rated"
                : "Adult rating: PG-13";
              if (averageGrade && totalVotes) {
                modalVote2.innerHTML = `Average score: ${averageGrade} - total votes: ${totalVotes}`;
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
              modalGenre2.innerHTML = "Genre: " + genreNames.slice(0, -2);
              // end genre ex and con
              modalOverview2.innerHTML =
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

const secondCarouselContainer = document.querySelector(
  ".carousel-container--two"
);
const anotherGenreCarouselUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&with_genres=35&page=2`;
featureCarouselTwo(anotherGenreCarouselUrl, secondCarouselContainer);

document.body.onclick = () => {
  if (!infoModal2.classList.contains("invisible-two")) {
    infoModal2.classList.add("invisible-two");
    movieContainer.style.filter = "blur(0px)";
    console.log("SUCCESS");
  } else {
    console.log("success");
  }
};

const lModal2 = document.querySelector(".info-modal-two");
