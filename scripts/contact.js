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

  // Check for proper email extension
  if (
    !document.querySelector("#email").value.includes("@gmail.com") &&
    !document.querySelector("#email").value.includes("@yahoo.com")
  ) {
    alert("Please provide a proper email");
    return;
  }
  // Define a regular expression for valid Gmail or Yahoo addresses
  const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  const yahooRegex = /^[a-zA-Z0-9._-]+@yahoo\.com$/;

  // Check if the email matches the defined patterns
  if (
    !(
      gmailRegex.test(document.querySelector("#email").value) ||
      yahooRegex.test(document.querySelector("#email").value)
    )
  ) {
    alert("Please enter a valid Gmail or Yahoo address");
    return; // Exit the function if the email is not Gmail or Yahoo
  }

  // Check if the email contains both "@gmail.com" and "@yahoo.com"
  if (
    document.querySelector("#email").value.includes("@gmail.com") &&
    document.querySelector("#email").value.includes("@yahoo.com")
  ) {
    alert(
      "Please enter a valid email address. It cannot contain both Gmail and Yahoo domains."
    );
    return; // Exit the function if the email contains both Gmail and Yahoo
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
  document.querySelector("html").style.overflowY = "scroll";
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

document.querySelector(".close-form").onclick = () => {
  document.querySelector(".form-container").classList.add("disappear");
  document.querySelector("html").style.overflowY = "scroll";
  document.querySelector(".overlay-body").classList.remove("overlay-appear");
};
