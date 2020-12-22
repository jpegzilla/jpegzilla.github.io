const lightSwitchContainer = document.getElementById("ls-container");
const lightSwitch = document.getElementById("ls");
let lights = "off";

// copyright year

let currentYear =
  new Date().getFullYear().toString() == "2019"
    ? "2019"
    : "2019 - " + new Date().getFullYear().toString();

document.getElementById("current-year").textContent = currentYear;

document.getElementById("show-flags").addEventListener("click", () => {
  const flagDisplay = document.getElementById("flag-display");
  if (flagDisplay.classList.contains("active"))
    flagDisplay.classList.remove("active");
  else flagDisplay.classList.add("active");
});

// handle switching between light and dark modes
const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (!prefersColorScheme.matches) {
  lights = "on";
  document.body.classList.remove("dark");
}

const switchColorScheme = e => {
  if (e.matches) {
    lights = "off";
    lightSwitch.classList.add("stretch");
    setTimeout(() => {
      lightSwitchContainer.classList.add("lightsOut");
      lightSwitch.classList.remove("stretch");
      document.body.classList.add("dark");
    }, 200);
  } else {
    lights = "on";
    lightSwitch.classList.add("stretch");
    setTimeout(() => {
      lightSwitchContainer.classList.remove("lightsOut");
      lightSwitch.classList.remove("stretch");
      document.body.classList.remove("dark");
    }, 200);
  }
};

prefersColorScheme.addListener(switchColorScheme);

lightSwitchContainer.addEventListener("click", e => {
  e.preventDefault();
  if (lights == "on") {
    lights = "off";

    lightSwitch.classList.add("stretch");
    setTimeout(() => {
      lightSwitchContainer.classList.add("lightsOut");
      lightSwitch.classList.remove("stretch");
      document.body.classList.add("dark");
    }, 200);
  } else if (lights == "off") {
    lights = "on";

    lightSwitch.classList.add("stretch");
    setTimeout(() => {
      lightSwitchContainer.classList.remove("lightsOut");
      lightSwitch.classList.remove("stretch");
      document.body.classList.remove("dark");
    }, 200);
  }
});

// anything that needs to occur during scrolling
const handleScrollEvents = () => {
  let delta = document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const introContainer = document.getElementsByClassName("intro-container")[0];
  const moon = document.getElementsByClassName("shining-moon")[0];
  let progress = (delta / height) * 100;

  // change the height of the scrollbar based on scroll progress
  document.getElementsByClassName(
    "scrollbar-inner"
  )[0].style.height = `${progress}%`;

  // show / hide the little moon and intro text
  if (delta < 100) {
    introContainer.classList.remove("hidden");
    moon.classList.remove("active");
  }

  if (delta > 100) {
    introContainer.classList.add("hidden");
    moon.classList.add("active");
  }
};

document.addEventListener("scroll", e => handleScrollEvents(e));

// clicking things

// clicking the social links button (the "+" icon) to show / hide social links
document.getElementById("social-expand").addEventListener("click", () => {
  const plus = document.getElementById("social-expand");
  const links = document.getElementById("social-icons");
  if (plus.classList.contains("active")) {
    plus.classList.remove("active");
    links.classList.remove("active");
  } else {
    plus.classList.add("active");
    links.classList.add("active");
  }
});
