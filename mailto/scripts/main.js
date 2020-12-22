const initiateMailtoGenerator = (() => {
  const createURL = string => {
    const apostrophe = "%27";

    string = string.replace("'", apostrophe);

    return encodeURI(string)
      .replace(/%5B/g, "[")
      .replace(/%5D/g, "]");
  };

  const copyContent = (e = null, element) => {
    if (e != null) e.preventDefault();
    window.getSelection().selectAllChildren(element);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    let copyInfo = document.getElementsByTagName("h2")[0];
    let original = copyInfo.textContent;
    copyInfo.textContent = "copied to clipboard!";

    setTimeout(() => (copyInfo.textContent = original), 2000);
  };

  const generated = document.getElementById("generated");

  generated.addEventListener("click", e => copyContent(e, generated));

  Array.from(document.querySelectorAll(".input")).forEach(input => {
    input.addEventListener("input", () => {
      const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

      switch (input.id) {
        case "to":
          to = createURL(input.value);
          break;
        case "cc":
          cc = createURL(input.value);
          break;
        case "bcc":
          bcc = createURL(input.value);
          break;
        case "subject":
          subject = createURL(input.value);
          break;
        case "body":
          body = createURL(input.value);
          break;
      }

      let fields = [to, cc, bcc, subject, body];
      let finalString = `mailto:${to}`;

      fields.forEach((field, i) => {
        if (field.length > 0 && i > 0) {
          if (finalString.indexOf("?") == -1) finalString += "?";
          else finalString += "&";

          switch (i) {
            case 1:
              finalString += `cc=${field}`;
              break;
            case 2:
              finalString += `bcc=${field}`;
              break;
            case 3:
              finalString += `subject=${field}`;
              break;
            case 4:
              finalString += `body=${field}`;
              break;
          }
        }
      });

      let resArray = [];

      [to, cc, bcc].forEach(item => {
        console.log(item);
        if (typeof item === "string" && item.length !== 0)
          resArray.push(EMAIL_REGEX.test(item));
      });

      console.log(resArray);

      generated.classList.remove("invalid");

      if (to.length == 0) generated.classList.add("invalid");

      if (resArray.includes(false)) generated.classList.add("invalid");
      else generated.classList.remove("invalid");

      resArray = [];

      generated.textContent = finalString;
    });
  });
})();
