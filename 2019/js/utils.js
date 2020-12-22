// mouse cursor interactions

const originalTitle = document.title;

const calcDist = (el, x, y) => {
  return Math.floor(
    Math.sqrt(
      Math.pow(x - (el.offset().left + el.width() / 2), 2) +
        Math.pow(y - (el.offset().top + el.height() / 2), 2)
    )
  );
};

const cursor = document.getElementById("cursor");
const cursorInner = document.getElementsByClassName("cursor-inner")[0];
const hoverEvents = document.querySelectorAll(".hoverEvents");

// hovering hover items

hoverEvents.forEach(item => {
  const pickRandomClass = () => {
    return cursorColors[Math.floor(Math.random() * cursorColors.length)];
  };

  let currentRandomClass;

  item.addEventListener("mouseover", () => {
    let randClass = pickRandomClass();
    currentRandomClass = randClass;
    cursor.classList.add(randClass);
    cursor.classList.add("scaleup");
  });

  item.addEventListener("mouseout", () => {
    cursor.classList.remove("scaleup");
    cursor.classList.remove(currentRandomClass);
  });
});

// gaining / losing focus
let didIntroRun = false;

// I think this is so I could prevent the loading screen / intro from
// running until I was sure the user was looking at it but that might be annoying
const focusEvents = ev => {
  switch (ev) {
    case "intro":
      if (didIntroRun == false) didIntroRun = true;

      break;
  }
};

window.onblur = () => {
  document.title = "hey come back";
};

window.onfocus = () => {
  document.title = originalTitle;
};

// misc utils

// once: makes it so a function only runs once
const once = (fn, ctx) => {
  let res;
  return function() {
    if (fn) {
      res = fn.apply(ctx || this, arguments);
      fn = null;
    }
    return res;
  };
};

// prints the date, with timezone corrected for my timezone because it's my website >:)
// just kidding it's so site visitors can see if I'm awake or not. creepy
const printDate = () => {
  const changeTimezone = (date, ianatz) => {
    let invdate = new Date(
      date.toLocaleString("en-US", {
        timeZone: ianatz
      })
    );

    let diff = date.getTime() - invdate.getTime();

    return new Date(date.getTime() + diff);
  };

  let today = changeTimezone(new Date(), "America/New_York");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let day =
    days[
      today.getDay().toLocaleString("en-US", {
        timeZone: "America/New_York"
      })
    ];

  let dayNum = today.getDate().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });

  let month =
    months[
      today.getMonth().toLocaleString("en-US", {
        timeZone: "America/New_York"
      })
    ];

  let hour = today
    .getHours()
    .toLocaleString("en-US", {
      timeZone: "America/New_York"
    })
    .padStart(2, "0");
  let minute = today
    .getMinutes()
    .toLocaleString("en-US", {
      timeZone: "America/New_York"
    })
    .padStart(2, "0");
  let second = today
    .getSeconds()
    .toLocaleString("en-US", {
      timeZone: "America/New_York"
    })
    .padStart(2, "0");

  let dateString = `${hour}:${minute}:${second}`;

  let awakeOrNot;
  // if hours are between 13 - 05
  if (
    today.getHours() > 12 ||
    (today.getHours() >= 0 && today.getHours() <= 5)
  ) {
    awakeOrNot = "awake";
  } else awakeOrNot = "asleep";

  document.getElementById("time-display").textContent = dateString;
  document.getElementById("awake-or-not").textContent = awakeOrNot;
  document.getElementById("comms-recommendation").textContent =
    awakeOrNot == "awake"
      ? "why not send me a message?"
      : "send me a message! I'll get back to you when I wake up.";

  setTimeout(printDate, 500);
};

printDate();

// break words into a bunch of spans containing a single character each
const toSpans = salt => {
  const bgElement = document.getElementById("backgroundTitle");
  let a = [];
  let letters = salt.split("");
  for (let i = 0; i < letters.length; i++) {
    let span = document.createElement("span");
    // they need to display as 'inline-block' so they can be animated.
    span.style.display = "inline-block";
    span.style.opacity = 0;
    // give each element an animation delay based on their position in the string
    span.style.animation = `0.3s ease-out ${(i + 1) /
      (letters.length * 1.75)}s forwards fadeIn`;
    if (/\s/.test(letters[i])) {
      span.innerHTML = "&nbsp;";
      bgElement.appendChild(span);
      a.push(span);
    } else {
      let cont = document.createTextNode(letters[i]);
      span.appendChild(cont);
      bgElement.appendChild(span);
      a.push(span);
    }
  }
  return a;
};

// update background text to whatever 'text' is
// I didn't end up using this, but it is kind of cool. might use in the future.
const updateBgText = text => {
  const bgElement = document.getElementById("backgroundTitle");
  let f = 0;
  const array = Array.from(bgElement.children);
  const removeOld = () => {
    return new Promise((resolve, _reject) => {
      if (array.length == 0) resolve();

      array.forEach((child, i) => {
        const delay = (i + 1) / (child.textContent.split("").length * 1.75);
        child.style.opacity = 1;
        child.style.animation = `0.3s ease-out ${delay *
          200}ms forwards fadeOut`;

        setTimeout(() => {
          f++;
          if (f == bgElement.children.length) resolve();
        }, delay * 200);
      });
    });
  };

  removeOld().then(() => {
    array.forEach(child => child.remove());
    toSpans(text);
  });
};

// scroll settings

const scrollSmooth = (parent, target) => {
  if (target == "top") {
    parent.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0
    });
  } else if (target == "bottom") {
    parent.scrollTo({
      behavior: "smooth",
      left: 0,
      top: document.body.scrollHeight
    });
  } else if (target instanceof Node) {
    parent.scrollTo({
      behavior: "smooth",
      left: 0,
      top: target.offsetTop
    });
  }
};

// intersector interactions

const setupAll = (() => {
  const allItems = Array.from(document.querySelectorAll(".intersection-item"));
  const allSections = Array.from(document.getElementsByTagName("section"));
  const intersectionItems = [...allItems, ...allSections];

  // I set the threshold to only be 0.5 because I only care about triggering animations
  // if the element is just halfway on screen
  const intersectorOptions = {
    root: null,
    threshold: 0.5
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0 && entry.isIntersecting) {
        if (!entry.target.classList.contains("visible")) {
          entry.target.classList.add("visible");
        }
      }
    });
  }, intersectorOptions);

  intersectionItems.forEach(item => observer.observe(item));

  const links = Array.from(document.querySelectorAll("a"));

  links.forEach(link => {
    link.addEventListener("click", e => {
      if (link.dataset.scroll == "anchor") {
        e.preventDefault();
        let target = document.querySelector(link.getAttribute("href"));
        scrollSmooth(document.documentElement, target);
      } else {
        // I commented this out because I was going to put some type of ajax page transition here
        // but then I decided to just use my blog post template for work reviews / case studies
        // ...for now
        // let target = link.getAttribute("href");
        // if (target.startsWith("/works")) {
        //   e.preventDefault();
        //   console.log(target);
        // }
      }
    });
  });
})();

// enable/disable scrolling

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1
};

const preventDefault = e => {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;
};

const preventDefaultForScrollKeys = e => {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
};

const disableScroll = () => {
  if (window.addEventListener)
    window.addEventListener("DOMMouseScroll", preventDefault, false);
  document.addEventListener("wheel", preventDefault, {
    passive: false
  });
  window.onwheel = preventDefault;
  window.onmousewheel = document.onmousewheel = preventDefault;
  window.ontouchmove = preventDefault;
  document.onkeydown = preventDefaultForScrollKeys;
};

const enableScroll = () => {
  if (window.removeEventListener)
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
  document.removeEventListener("wheel", preventDefault, {
    passive: false
  });
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
};

/*************************************************************************************************/
// utils for loading screen

const preloaderText = document.getElementsByClassName(
  "preloader-text-actual"
)[0];
const loadingScreenCursor = document.getElementsByClassName(
  "blinking-cursor"
)[0];
const preloaderTextContainer = document.getElementsByClassName(
  "preloader-text"
)[0];
const loadingIcon = document.getElementsByClassName("preloader-icon")[0];
const lineExpander = document.getElementsByClassName("line-expander")[0];
const preloader = document.getElementById("preloader");

const readPreloaderText = path => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");

    xhr.open("GET", path);

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == "200") {
        resolve(xhr.responseText);
      } else if (xhr.readyState == 4 && xhr.status != "200") {
        reject(xhr.status);
      }
    };

    xhr.send();
  });
};

// writes out characters from an array into a given element
const stringWriter = (arr, element) => {
  let random = arr[Math.floor(Math.random() * arr.length)];

  // replace spaces with css encoded space
  // tack a newline onto the end of every line
  // then put the line back together
  let line = random
    .map(a => a.replace(/\s/gi, `\u00A0`))
    .map(b => b + "\n")
    .join("");

  let count = 0;
  let length = line.length;

  // write a character every 60ms. if you were being snazzy you could pass in
  // a random value as the timeout and simulate more natural typing
  return new Promise((resolve, reject) => {
    let lineWrite = setInterval(() => {
      element.innerText += line[count];
      count++;
      if (count == length - 1) {
        clearInterval(lineWrite);
        resolve();
      }
      if (count > length) reject();
    }, 60);
  });
};

// if the element exists, show the fancy text stuff
disableScroll();
window.onload = () => {
  // please don't look at the sextuple-nested timeout functions
  // but how else would I do something like this?
  // I'll know the answer to that soon, and come back to this code and laugh
  const preloaderAnim = () => {
    return new Promise((resolve, _reject) => {
      if (preloaderText) {
        loadingScreenCursor.classList.add("blinking");
        setTimeout(() => {
          loadingScreenCursor.classList.remove("blinking");
          readPreloaderText("./js/json/preloaderText.json").then(res => {
            const json = JSON.parse(res);
            if (Array.isArray(json.preloader)) {
              stringWriter(json.preloader, preloaderText).then(() => {
                loadingScreenCursor.classList.add("blinking");
                setTimeout(() => {
                  // hide text
                  preloaderTextContainer.classList.add("flicker-out");
                  setTimeout(() => {
                    loadingIcon.classList.add("flicker-out");
                    setTimeout(() => {
                      lineExpander.classList.add("expand");
                      // then hide preloader
                      setTimeout(() => {
                        preloader.classList.add("fadeout");
                        setTimeout(() => {
                          preloader.remove();
                          resolve();
                        }, 300);
                      }, 2000);
                    }, 200);
                  }, 450);
                }, 1000);
              });
            } else return false;
          });
        }, 500);
      }
    });
  };
  // preloader.remove();
  // document.getElementById("intro-para").classList.add("active");
  // enableScroll();
  preloaderAnim().then(() => {
    // show the intro paragraph, and re-enable scrolling
    document.getElementById("intro-para").classList.add("active");
    enableScroll();
  });
};
/*************************************************************************************************/
