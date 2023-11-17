const apiKey = "245d71936de55c199391618d2d244f64";
// random list of popular movies for landing page
const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
// call specific page
const TotalMoviePages = 41039;
// starting page number
localStorage.setItem("page-num", 1);

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
const toggleManipulate = document.querySelector(".toggler-manipulate");

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

// close nav via toggle on smaller screens
function toggleUp() {
  if (window.innerWidth <= 991) {
    toggleManipulate.click();
  }
}

// minimize modal on click
document.querySelector(".exit-modal").onclick = () => {
  document.querySelector(".info-modal").classList.add("invisible");
  document.querySelector("body").style.overflow = "auto";
  movieContainer.style.filter = "blur(0px)";
};

// 0. Initial random call
currentApiUrl = discoverUrl;
fetchMovies(currentApiUrl);

// 1. Now playing
const NPapiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`;
const nowPlayingBtn = document.querySelector(".now-playing");
nowPlayingBtn.onclick = () => {
  currentApiUrl = NPapiUrl;
  fetchMovies(currentApiUrl, "movie-id");
  toggleUp();
};

// 2. Popular
const popularApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;
const popularBtn = document.querySelector(".popular");
popularBtn.onclick = () => {
  currentApiUrl = popularApiUrl;
  fetchMovies(currentApiUrl, "movie-id");
  toggleUp();
};

// 3.top rated
const topRatedApiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`;
const topBtn = document.querySelector(".top");
topBtn.onclick = () => {
  currentApiUrl = topRatedApiUrl;
  fetchMovies(currentApiUrl, "movie-id");
  toggleUp();
};

// 4. upcoming
const upcomingApiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`;
const upcomingBtn = document.querySelector(".upcoming");
upcomingBtn.onclick = () => {
  currentApiUrl = upcomingApiUrl;
  fetchMovies(currentApiUrl, "movie-id");
  toggleUp();
};

const movieContainer = document.querySelector(".movie-container");

function scrollToMovies(el) {
  var element = document.getElementById(el);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
//
async function fetchMovies(url, el) {
  try {
    await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("error 404");
        }
        return response.json();
      })
      .then((data) => {
        console.log(url);

        iFrameSet();
        scrollToMovies(el);
        while (movieContainer.firstChild) {
          movieContainer.removeChild(movieContainer.firstChild);
        }
        // necessary for the full image source path
        const baseUrl = "https://image.tmdb.org/t/p/";
        const imageSize = "w500";

        for (let i = 0; i < data.results.length; i++) {
          // image container will be connected to the imgContainer variable
          const imageContainer = document.createElement("div");
          // img will represent the poster of each link to the modal
          const img = document.createElement("img");
          // it will display name on hover
          const movieName = document.createElement("p");

          // custom js element will inherit this css class found in style.css
          imageContainer.classList.add("image-container");

          // checks for the existence of a backdrop image source
          if (data.results[i].backdrop_path) {
            img.src = baseUrl + imageSize + data.results[i].backdrop_path;
          } else if (data.results[i].poster_path) {
            // implements backup source
            img.src = baseUrl + imageSize + data.results[i].poster_path;
            img.style.position = "absolute";
            img.style.objectFit = "cover";
          } else {
            img.src = "images/tba.jpg";
            img.style.position = "absolute";
            img.style.objectFit = "cover";
          }
          // for SEO purposes
          img.alt = "movie poster";
          // inherits css style from style.css
          img.classList.add("poster");

          //receives text
          movieName.textContent = data.results[i].title;
          // receives styles
          movieName.classList.add("movie-name");

          // posters from the layout will utilize imageContainer as primary holder
          imageContainer.appendChild(img);
          imageContainer.appendChild(movieName);

          // the layout builder will receive the content
          movieContainer.appendChild(imageContainer);
        }
        // imgContainer is connected to imageContainer element created through createElement.
        const imgContainer = document.querySelectorAll(".image-container");
        // connecion to the DOM
        const infoModal = document.querySelector(".info-modal");
        const modalImage = document.querySelector(".modal-image");
        const modalName = document.querySelector(".modal-name");
        const modalRelease = document.querySelector(".modal-release");
        const modalVote = document.querySelector(".modal-vote");
        const modalOverview = document.querySelector(".modal-overview");
        const modalGenre = document.querySelector(".modal-genre");
        const modalPg = document.querySelector(".modal-pg");
        const infoInner = document.querySelector(".info-inner");

        // makes sure the modal is closed when click happens outside of the modal area.
        document.addEventListener("click", function (event) {
          const infoModal = document.querySelector(".info-modal");

          // Check if the clicked element is not a descendant of infoModal2
          if (!infoModal.contains(event.target)) {
            document.querySelector("body").style.overflow = "auto";
            infoModal.classList.add("invisible");
            movieContainer.style.filter = "blur(0px)";
          }
        });

        // MOVIE DETAILS MODAL
        infoModal.onclick = (event) => {
          // Prevent the click event that happens within the modal area from closing the modal
          event.stopPropagation();
        };

        // forEach here separates every single movie from the layout so each can be manipulated separately
        //movie will target the imageContainer itself, index will return its spot in the array
        imgContainer.forEach((movie, index) => {
          // checks for the existence of data under a specific index (spot in the array)
          if (data.results[index]) {
            // validates the existence of this data
            let totalVotes = data.results[index].vote_count || 0;
            let averageGrade = data.results[index].vote_average || 0;

            // Clicking any of the imgContainers will trigger the following function
            movie.addEventListener("click", function (event) {
              event.stopPropagation();

              // checks for other modals and closes them so only 1 modal is open at a time
              const lModal2 = document.querySelector(".info-modal-two");
              const lModal3 = document.querySelector(".info-modal-three");
              lModal2.classList.add("invisible-two");
              lModal3.classList.add("invisible-three");

              // prevents scrolling while modal is open
              document.querySelector("body").style.overflow = "hidden";

              let genreContainer = [];
              let genreNames = "";

              // while modal is open, the layout outside is blurred
              movieContainer.style.filter = "blur(4px)";

              // removes the invisibility style from the element while it's open
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
              }
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
          }
        });
        // pagination
        window.addEventListener("load", () => {
          let paginationContainer = document.querySelector(".pagination");
          let pagination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

          const prevLink = document.createElement("button");
          const nextLink = document.createElement("button");
          prevLink.textContent = "<";
          nextLink.textContent = ">";
          prevLink.classList.add("previous-page--link");
          nextLink.classList.add("next-page--link");

          paginationContainer.appendChild(prevLink);
          const prevLinkDOM = document.querySelector(".previous-page--link");

          for (let i = 1; i <= pagination.length; i++) {
            const page = document.createElement("button");
            page.textContent = `${i}`;
            page.classList.add("page-link");
            paginationContainer.appendChild(page);
          }
          paginationContainer.appendChild(nextLink);
          const nextLinkDOM = document.querySelector(".next-page--link");

          const pageLinks = document.querySelectorAll(".page-link");

          pageLinks.forEach((link, index) => {
            link.addEventListener("click", () => {
              // Calculate the page number based on the index
              pageNumber = index + 1;
              localStorage.setItem("page-num", pageNumber);
              console.log(localStorage.getItem("page-num"));
              // Use the correct API URL based on the current category
              const linkUrl = currentApiUrl + `&page=${pageNumber}`;
              fetchMovies(linkUrl, "movie-id");
            });
          });
          prevLinkDOM.addEventListener("click", () => {
            const currentPageNumber = Number(localStorage.getItem("page-num"));
            if (currentPageNumber > 1) {
              linkUrl = currentApiUrl + `&page=${currentPageNumber - 1}`;
              localStorage.setItem("page-num", currentPageNumber - 1);
              console.log(localStorage.getItem("page-num"));
            } else {
              linkUrl = currentApiUrl + `&page=${1}`;
            }
            fetchMovies(linkUrl, "movie-id");
          });
          nextLinkDOM.addEventListener("click", () => {
            const currentPageNumber = Number(localStorage.getItem("page-num"));
            linkUrl = currentApiUrl + `&page=${currentPageNumber + 1}`;
            localStorage.setItem("page-num", currentPageNumber + 1);
            console.log(localStorage.getItem("page-num"));
            fetchMovies(linkUrl, "movie-id");
          });
        });
      })
      .catch((error) => {
        console.error(`you have an error!`, error);
      });
  } catch (error) {
    console.error("error", error);
  }
}
