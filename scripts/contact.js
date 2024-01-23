function sendMail() {
  // Check if any of the required fields are empty
  if (
    !document.querySelector("#subject").value ||
    !document.querySelector("#from_name").value ||
    !document.querySelector("#message").value ||
    !document.querySelector("#email").value
  ) {
    document.querySelector(".form-notification").innerHTML =
      "Please fill in all required fields";
    return; // Exit the function if any field is empty
  }
  const domains = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com",
    "@aol.com",
    "@icloud.com",
    "@protonmail.com",
    "@mail.com",
    "@yandex.com",
    "@livemail.com",
    "@msn.com",
    "@zoho.com",
    "@gmx.com",
    "@fastmail.com",
  ];
  // Check for proper email extension
  if (
    !document.querySelector("#email").value.includes("@gmail.com") &&
    !document.querySelector("#email").value.includes("@yahoo.com") &&
    !document.querySelector("#email").value.includes("@hotmail.com") &&
    !document.querySelector("#email").value.includes("@outlook.com") &&
    !document.querySelector("#email").value.includes("@aol.com") &&
    !document.querySelector("#email").value.includes("@icloud.com") &&
    !document.querySelector("#email").value.includes("@protonmail.com") &&
    !document.querySelector("#email").value.includes("@mail.com") &&
    !document.querySelector("#email").value.includes("@yandex.com") &&
    !document.querySelector("#email").value.includes("@livemail.com") &&
    !document.querySelector("#email").value.includes("@msn.com") &&
    !document.querySelector("#email").value.includes("@zoho.com") &&
    !document.querySelector("#email").value.includes("@gmx.com") &&
    !document.querySelector("#email").value.includes("@fastmail.com")
  ) {
    document.querySelector(".form-notification").innerHTML =
      "Please provide a proper email";
    return;
  }
  // Define a regular expression for valid Gmail or Yahoo addresses
  const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  const yahooRegex = /^[a-zA-Z0-9._-]+@yahoo\.com$/;
  const hotmailRegex = /^[a-zA-Z0-9._-]+@hotmail\.com$/;
  const outlookRegex = /^[a-zA-Z0-9._-]+@outlook\.com$/;
  const aolRegex = /^[a-zA-Z0-9._-]+@aol\.com$/;
  const icloudRegex = /^[a-zA-Z0-9._-]+@icloud\.com$/;
  const protonmailRegex = /^[a-zA-Z0-9._-]+@protonmail\.com$/;
  const mailRegex = /^[a-zA-Z0-9._-]+@mail\.com$/;
  const yandexRegex = /^[a-zA-Z0-9._-]+@yandex\.com$/;
  const livemailRegex = /^[a-zA-Z0-9._-]+@livemail\.com$/;
  const msnRegex = /^[a-zA-Z0-9._-]+@msn\.com$/;
  const zohoRegex = /^[a-zA-Z0-9._-]+@zoho\.com$/;
  const gmxRegex = /^[a-zA-Z0-9._-]+@gmx\.com$/;
  const fastmailRegex = /^[a-zA-Z0-9._-]+@fastmail\.com$/;

  // Check if the email matches the defined patterns
  if (
    !(
      gmailRegex.test(document.querySelector("#email").value) ||
      yahooRegex.test(document.querySelector("#email").value) ||
      hotmailRegex.test(document.querySelector("#email").value) ||
      outlookRegex.test(document.querySelector("#email").value) ||
      aolRegex.test(document.querySelector("#email").value) ||
      icloudRegex.test(document.querySelector("#email").value) ||
      protonmailRegex.test(document.querySelector("#email").value) ||
      mailRegex.test(document.querySelector("#email").value) ||
      yandexRegex.test(document.querySelector("#email").value) ||
      livemailRegex.test(document.querySelector("#email").value) ||
      msnRegex.test(document.querySelector("#email").value) ||
      zohoRegex.test(document.querySelector("#email").value) ||
      gmxRegex.test(document.querySelector("#email").value) ||
      fastmailRegex.test(document.querySelector("#email").value)
    )
  ) {
    document.querySelector(".form-notification").innerHTML =
      "Please enter a valid address";
    return; // Exit the function if the email is not Gmail or Yahoo
  }

  // Check if the email contains both more than one mail type

  let domainCounter = 0;
  for (let i = 0; i < domains.length; i++) {
    if (document.querySelector("#email").value.includes(domains[i])) {
      domainCounter++;
    }
  }

  if (domainCounter > 1) {
    document.querySelector(".form-notification").innerHTML =
      "Please enter a valid domain!";
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
  const templateID = "template_918g5xh";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.querySelector(".form-notification").innerHTML =
        "Email sent successfully";

      setTimeout(() => {
        document.querySelector(".form-notification").innerHTML = "";
      }, 2000);
      document
        .querySelector(".overlay-body")
        .classList.remove("overlay-appear");
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
  document.querySelector("body").classList.remove("no-scroll");
}

// opening button
document.querySelector(".contact-button").onclick = () => {
  const formContainer = document.querySelector(".form-container");
  const overlay = document.querySelector(".overlay-body");
  if (formContainer.classList.contains("disappear")) {
    formContainer.classList.remove("disappear");
    document.querySelector("body").classList.add("no-scroll");
    overlay.classList.add("overlay-appear");
    document.querySelector(".movie-browser").disabled = true;
  } else {
    formContainer.classList.add("disappear");
    document.querySelector("body").classList.remove("no-scroll");
    overlay.classList.remove("overlay-appear");
    document.querySelector(".movie-browser").disabled = false;
    document.querySelector(".form-notification").innerHTML = "";
    document.querySelector("#subject").value = "";
    document.querySelector("#from_name").value = "";
    document.querySelector("#message").value = "";
    document.querySelector("#email").value = "";
  }
};

//closing function
document.addEventListener("click", function (event) {
  const formContainer = document.querySelector(".form-container");
  const overlay = document.querySelector(".overlay-body");
  if (!formContainer.classList.contains("disappear")) {
    if (
      !formContainer.contains(event.target) &&
      !document.querySelector(".contact-button").contains(event.target)
    ) {
      formContainer.classList.add("disappear");
      document.querySelector("body").classList.remove("no-scroll");
      overlay.classList.remove("overlay-appear");
      document.querySelector(".movie-browser").disabled = false;
      document.querySelector(".form-notification").innerHTML = "";
      document.querySelector("#subject").value = "";
      document.querySelector("#from_name").value = "";
      document.querySelector("#message").value = "";
      document.querySelector("#email").value = "";
    }
  }
});

// closing button
document.querySelector(".close-form").onclick = () => {
  document.querySelector(".form-container").classList.add("disappear");
  document.querySelector("body").classList.remove("no-scroll");
  document.querySelector(".overlay-body").classList.remove("overlay-appear");
  document.querySelector(".form-notification").innerHTML = "";
  document.querySelector(".movie-browser").disabled = false;
  document.querySelector("#subject").value = "";
  document.querySelector("#from_name").value = "";
  document.querySelector("#message").value = "";
  document.querySelector("#email").value = "";
};

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" &&
    document.querySelector(".movie-browser").disabled === true
  ) {
    const formContainer = document.querySelector(".form-container");

    formContainer.classList.remove("disappear");
    event.preventDefault();

    const focusedElement = document.activeElement;
    const formElements = Array.from(
      document.querySelectorAll(
        ".form-container input[type='text'], .form-container input[type='email'], .form-container textarea"
      )
    );
    const lastIndex = formElements.length - 1;
    const currentIndex = formElements.indexOf(focusedElement);

    if (currentIndex < lastIndex) {
      // Focus on the next input element
      formElements[currentIndex + 1].focus();
    } else {
      // Check if all required fields are filled
      const allFieldsFilled = formElements.every(
        (element) => element.type !== "text" || element.value.trim() !== ""
      );

      if (allFieldsFilled) {
        // Trigger the button click if all required fields are filled
        document.querySelector(".button-form--submit").click();
      } else {
        document.querySelector(".form-notification").innerHTML =
          "Please fill in all required fields";
      }
    }
  }
});
