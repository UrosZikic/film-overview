const trailers = {
  results: [
    {
      name: "Mission: Impossible Dead Reckoning Part One",
      src: "https://www.youtube-nocookie.com/embed/avz06PDqDbM?si=64yVRK7mlOWnhitg&autoplay=0&rel=0",
      image: "images/missionimpossible.jpg",
      color: "#ced4da",
    },
    {
      name: "Five Nights at Freddy's",
      src: "https://www.youtube-nocookie.com/embed/0VH9WCFV6XQ?si=2xCW0-jS1vqMDjUk&autoplay=0&rel=0",
      image: "images/fivenightsatfreddy.jpg",
      color: "#ffe066",
    },
    {
      name: "Expendables",
      src: "https://www.youtube-nocookie.com/embed/DhlaBO-SwVE?si=9xb5KjIb_mYPBjVS&autoplay=0&rel=0",
      image: "images/expendables.jpg",
      color: "#38d9a9",
    },
    {
      name: "Blue Beetle",
      src: "https://www.youtube-nocookie.com/embed/4wxyy8Rcz4k?si=E1zCOjpzu-SD9dmK&autoplay=0&rel=0",
      image: "images/bluebeetle.jpg",
      color: "#5c7cfa",
    },
    {
      name: "Oppenheimer",
      src: "https://www.youtube-nocookie.com/embed/uYPbbksJxIg?si=TlGomCgREf_d7XED&autoplay=0&rel=0",
      image: "images/oppenheimer.jpg",
      color: "#e67700",
    },
  ],
};

// iframe youtube
const iFrame = document.querySelector(".youtube-frame");
const trailerInfo = document.querySelector(".trailer-info");
const trailerName = document.querySelector(".trailer-name");

document.addEventListener("DOMContentLoaded", iFrameSet);

window.addEventListener("resize", iFrameSet);
// document.addEventListener("resize", moveModalPoster);

function iFrameSet() {
  const trailer = Math.floor(Math.random() * trailers.results.length);
  iFrame.src = trailers.results[trailer].src;
  let iFrameWidth = iFrame.clientWidth;
  iFrame.style.height = (9 / 16) * parseInt(iFrameWidth) + "px";

  trailerName.textContent =
    "You're watching: " + trailers.results[trailer].name;
  trailerInfo.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${trailers.results[trailer].image})`;
  trailerInfo.style.backgroundSize = "cover";
  trailerInfo.style.color = `${trailers.results[trailer].color}`;

  if (window.innerWidth <= 901) {
    console.log("SUCCESS");
    document
      .querySelector(".youtube-container")
      .classList.add("youtube-container-min");
    trailerInfo.classList.add("trailer-info-min");
    trailerName.classList.add("trailer-paragraph-min");
    iFrame.classList.add("iframe-min");
  } else {
    document
      .querySelector(".youtube-container")
      .classList.remove("youtube-container-min");
    trailerInfo.classList.remove("trailer-info-min");
    trailerName.classList.remove("trailer-paragraph-min");
    iFrame.classList.remove("iframe-min");
  }
}
