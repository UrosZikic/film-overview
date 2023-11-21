function sendMail() {
  // Check if any of the required fields are empty
  if (
    !document.querySelector("#subject").value ||
    !document.querySelector("#from_name").value ||
    !document.querySelector("#message").value ||
    !document.querySelector("#email").value
  ) {
    alert("Please fill in all required fields");
    return; // Exit the function if any field is empty
  }

  (function () {
    emailjs.init("K2PSUkRlxwE8wR98m"); // Replace with your actual user ID
  })();

  const params = {
    subject: document.querySelector("#subject").value,
    to_name: "uros",
    from_name: document.querySelector("#from_name").value,
    message: document.querySelector("#message").value,
    email: document.querySelector("#email").value,
  };
  const serviceID = "service_sxnbe4j";
  const templateID = "template_0muz62m";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      alert("Email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending email: ", error);
    });

  document.querySelector("#subject").value = "";
  document.querySelector("#from_name").value = "";
  document.querySelector("#message").value = "";
  document.querySelector("#email").value = "";

  const formContainer = document.querySelector(".form-container");
  formContainer.classList.add("disappear");
}

document.querySelector(".contact-button").onclick = () => {
  const formContainer = document.querySelector(".form-container");
  const overlay = document.querySelector(".overlay-body");
  if (formContainer.classList.contains("disappear")) {
    formContainer.classList.remove("disappear");
    document.querySelector("html").style.overflowY = "hidden";
    overlay.classList.add("overlay-appear");
  } else {
    formContainer.classList.add("disappear");
    document.querySelector("html").style.overflowY = "scroll";
    overlay.classList.remove("overlay-appear");
  }
};

document.addEventListener("click", function (event) {
  const formContainer = document.querySelector(".form-container");
  const overlay = document.querySelector(".overlay-body");
  if (!formContainer.classList.contains("disappear")) {
    if (
      !formContainer.contains(event.target) &&
      !document.querySelector(".contact-button").contains(event.target)
    ) {
      formContainer.classList.add("disappear");
      document.querySelector("html").style.overflowY = "scroll";
      overlay.classList.remove("overlay-appear");
    }
  }
});
