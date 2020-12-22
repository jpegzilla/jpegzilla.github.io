let index = 0;
const words = ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "🅑", "🅐", "⎆"];

const addClass = setInterval(() => {
  preloader.classList.add("active");
  preloader.children[0].innerText = words[index];

  ++index;
  if (index == words.length) index = 0;

  setTimeout(() => {
    preloader.classList.remove("active");
  }, 150);
}, 300);

window.onload = () => {
  let konami = new cheatcode(
    "up, up, down, down, left, right, left, right, b, a, start",
    () => {
      konamiCode.classList.add("flash");
      setTimeout(() => konamiCode.classList.remove("flash"), 500);
    }
  ).start();
  setTimeout(() => {
    preloader.classList.remove("active");
    preloader.classList.add("hide");
    clearInterval(addClass);

    setTimeout(() => preloader.remove(), 1500);
  }, 3250);

  const addCheatCode = code => {
    let div = document.createElement("div");
    div.classList.add("cheatcode");

    let cheatCodeInner = document.createElement("div");
    cheatCodeInner.classList.add("cheatcode-inner");
    cheatCodeInner.innerText = code;

    let removeButton = document.createElement("div");
    removeButton.classList.add("cheatcode-remove-button");
    removeButton.innerText = "remove";
    removeButton.addEventListener("click", () => div.remove());

    div.appendChild(cheatCodeInner);
    div.appendChild(removeButton);

    return div;
  };

  addNewCheatCode.addEventListener("click", () => {
    let code = cheatCodeInput.value;

    if (code.length != 0) {
      let newCode = addCheatCode(code);

      let cheat = new cheatcode(code, () => {
        newCode.classList.add("flash");
        setTimeout(() => newCode.classList.remove("flash"), 500);
      });

      if (
        utils.arraysEqual(
          cheat.cheatcode,
          cheat.cheatcode.filter(n => typeof n == "number")
        )
      ) {
        cheatcodeList.appendChild(newCode);
        cheat.start();
      } else return;
    }
  });
};
