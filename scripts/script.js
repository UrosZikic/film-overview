const apiKey = "245d71936de55c199391618d2d244f64";
// random list of popular movies for landing page
const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
// starting page number
localStorage.setItem("page-num", 1);

const navigation = document.querySelector(".navJsClass");

// array for pagination
let pagination = [];

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

// TV SHOWS CALL
const tvDefault = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`;
const callTvDefault = document.querySelector(".type");

callTvDefault.addEventListener("click", () => {
  if (callTvDefault.innerHTML === "Series") {
    currentApiUrl = tvDefault;
    document.querySelector(".tv").style.display = "block";
    document.querySelector(".movie").style.display = "none";
    callTvDefault.innerHTML = "Movies";
  } else {
    currentApiUrl = discoverUrl;
    document.querySelector(".tv").style.display = "none";
    document.querySelector(".movie").style.display = "block";
    callTvDefault.innerHTML = "Series";
  }
  pagination = [];
  iFrameSet(true);
  fetchMovies(currentApiUrl, "movie-id");
  toggleUp();
});

// 1. Now playing
const NPapiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`;
const NPTVUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}`;
const nowPlayingBtn = document.querySelector(".now-playing");
nowPlayingBtn.onclick = () => {
  document.querySelector(".result-title").textContent = "Now Playing";
  if (callTvDefault.innerHTML !== "Series") {
    currentApiUrl = NPTVUrl;
  } else {
    currentApiUrl = NPapiUrl;
  }
  pagination = [];
  fetchMovies(currentApiUrl, "movie-id");
  toggleUp();
};

// 2. Popular
const popularApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;
const popularTVUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
const popularBtn = document.querySelector(".popular");
popularBtn.onclick = () => {
  document.querySelector(".result-title").textContent = "Popular Movies";

  if (callTvDefault.innerHTML !== "Series") {
    currentApiUrl = popularTVUrl;
  } else {
    currentApiUrl = popularApiUrl;
  }
  pagination = [];
  fetchMovies(currentApiUrl, "movie-id");
  toggleUp();
};

// 3.top rated
const topRatedApiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`;
const topRatedTV = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`;
const topBtn = document.querySelector(".top");
topBtn.onclick = () => {
  document.querySelector(".result-title").textContent = "Top Rated Shows";
  if (callTvDefault.innerHTML !== "Series") {
    currentApiUrl = topRatedTV;
  } else {
    currentApiUrl = topRatedApiUrl;
  }
  pagination = [];
  fetchMovies(currentApiUrl, "movie-id");
  toggleUp();
};

// 4. upcoming
const upcomingApiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`;
const upcomingTV = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`;
const upcomingBtn = document.querySelector(".upcoming");
upcomingBtn.onclick = () => {
  document.querySelector(".result-title").textContent = "Upcoming Movies";

  if (callTvDefault.innerHTML !== "Series") {
    currentApiUrl = upcomingTV;
  } else {
    currentApiUrl = upcomingApiUrl;
  }
  pagination = [];
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
        // retrieves the total amount of result pages
        const totalPages = data.total_pages;
        // sets a new trailer from my custom object

        // iFrameSet(true);

        // scrolls to the result section
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

          movieName.textContent = data.results[i].title
            ? data.results[i].title
            : data.results[i].name;
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
            document
              .querySelector(".overlay-body")
              .classList.add("overlay-disappear");
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
              document
                .querySelector(".overlay-body")
                .classList.remove("overlay-disappear");
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
        let paginationContainer = document.querySelector(".pagination");
        while (paginationContainer.firstChild) {
          paginationContainer.removeChild(paginationContainer.firstChild);
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
          const prevLinkDOM = document.querySelector(".previous-page--link");

          for (let i = 1; i <= pagination.length; i++) {
            const page = document.createElement("button");
            page.textContent = `${pagination[i - 1]}`;
            page.classList.add("page-link");
            paginationContainer.appendChild(page);
          }
          //work
          paginationContainer.appendChild(nextLink);
          const nextLinkDOM = document.querySelector(".next-page--link");
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
        const prevLinkDOM = document.querySelector(".previous-page--link");
        const nextLinkDOM = document.querySelector(".next-page--link");
        const pageLinks = document.querySelectorAll(".page-link");

        let currentPageNumber = Number(localStorage.getItem("page-num"));

        // API PAGE NUMBER DOESN'T UPDATE BEYOND INITIAL 1-10 -> IMPORTANT FIX
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
      })

      .catch((error) => {
        console.error(`you have an error!`, error);
      });
  } catch (error) {
    console.error("error", error);
  }
}
