const trailers = {
  results: [
    {
      name: "Mission: Impossible",
      src: "https://www.youtube-nocookie.com/embed/avz06PDqDbM?si=64yVRK7mlOWnhitg&autoplay=0&rel=0",
      image: "images/missionimpossible.webp",
      color: "#ced4da",
    },
    {
      name: "Five Nights at Freddy's",
      src: "https://www.youtube-nocookie.com/embed/0VH9WCFV6XQ?si=2xCW0-jS1vqMDjUk&autoplay=0&rel=0",
      image: "images/fivenightsatfreddy.webp",
      color: "#ffe066",
    },
    {
      name: "Expendables",
      src: "https://www.youtube-nocookie.com/embed/DhlaBO-SwVE?si=9xb5KjIb_mYPBjVS&autoplay=0&rel=0",
      image: "images/expendables.webp",
      color: "#38d9a9",
    },
    {
      name: "Blue Beetle",
      src: "https://www.youtube-nocookie.com/embed/4wxyy8Rcz4k?si=E1zCOjpzu-SD9dmK&autoplay=0&rel=0",
      image: "images/bluebeetle.webp",
      color: "#5c7cfa",
    },
    {
      name: "Oppenheimer",
      src: "https://www.youtube-nocookie.com/embed/uYPbbksJxIg?si=TlGomCgREf_d7XED&autoplay=0&rel=0",
      image: "images/oppenheimer.webp",
      color: "#e67700",
    },
  ],
  resultsTV: [
    {
      name: "Marvel's Daredevil",
      src: "https://www.youtube.com/embed/jAy6NJ_D5vU?si=enhH0gl83IUywYr2",
      image: "images/dd.webp",
      color: "#c92a2a",
    },
    {
      name: "Cobra Kai",
      src: "https://www.youtube.com/embed/lkaIYfA1WOs?si=wEcIbom9CJZ1Ylmd",
      image: "images/kobra.webp",
      color: "#c92a2a",
    },
    {
      name: "Adventure Time",
      src: "https://www.youtube.com/embed/DRaLQ3kKz_k?si=L93Wjq99Tp5XguwF",
      image: "images/at.webp",
      color: "#38d9a9",
    },
    {
      name: "Last Kingdom",
      src: "https://www.youtube.com/embed/eqCYw_o5lng?si=RymCD0E3MhHMkIDD",
      image: "images/lk.webp",
      color: "#ced4da",
    },
    {
      name: "Rick and Morty",
      src: "https://www.youtube.com/embed/BKYJ5AIOU9I?si=GBIKWYhrjrCwx_VM",
      image: "images/rm.webp",
      color: "#15aabf",
    },
  ],
};

// iframe youtube
const iFrame = document.querySelector(".youtube-frame");
const trailerInfo = document.querySelector(".trailer-info");
const trailerName = document.querySelector(".trailer-name");

document.addEventListener("DOMContentLoaded", function () {
  iFrameSet(true);
});

window.addEventListener("resize", function () {
  iFrameSet(false);
});

function iFrameSet(trailerValid) {
  let trailer;
  let iFrameWidth = iFrame.clientWidth;

  iFrame.style.height = (9 / 16) * parseInt(iFrameWidth) + "px";

  if (trailerValid) {
    trailer = Math.floor(Math.random() * trailers.results.length);
    if (callTvDefault.innerHTML === "Series") {
      iFrame.src = trailers.results[trailer].src;
      trailerName.textContent =
        "You're watching: " + trailers.results[trailer].name;
      trailerInfo.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${trailers.results[trailer].image})`;
      trailerInfo.style.backgroundSize = "cover";
      trailerInfo.style.color = `${trailers.results[trailer].color}`;
    } else {
      iFrame.src = trailers.resultsTV[trailer].src;
      trailerName.textContent =
        "You're watching: " + trailers.resultsTV[trailer].name;
      trailerInfo.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${trailers.resultsTV[trailer].image})`;
      trailerInfo.style.backgroundSize = "cover";
      trailerInfo.style.color = `${trailers.resultsTV[trailer].color}`;
    }
  }

  // if (document.body.clientWidth <= 901) {
  //   document
  //     .querySelector(".youtube-container")
  //     .classList.add("youtube-container-min");
  //   trailerInfo.classList.add("trailer-info-min");
  //   trailerName.classList.add("trailer-paragraph-min");
  //   iFrame.classList.add("iframe-min");
  // } else {
  //   document
  //     .querySelector(".youtube-container")
  //     .classList.remove("youtube-container-min");
  //   trailerInfo.classList.remove("trailer-info-min");
  //   trailerName.classList.remove("trailer-paragraph-min");
  //   iFrame.classList.remove("iframe-min");
  // }
}
