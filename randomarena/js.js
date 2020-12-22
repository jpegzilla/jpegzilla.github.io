const randomArenaBlock = () => {
  const baseUrl =
    "https://cors-anywhere.herokuapp.com/https://www.are.na/block/";

  const reqUrl = "https://www.are.na/block/";

  const rDigits = d =>
    `${"x".repeat(d)}`.replace(/x/g, a => (Math.random() * 9) | 0);

  let digits = rDigits(7);

  let randUrl = {
    request: `${baseUrl}${digits}`,
    set: `${reqUrl}${digits}`
  };

  const checkBlock = a => {
    return new Promise((resolve, reject) => {
      fetch(randUrl.request, {
        method: "HEAD",
        headers: {
          origin: "https://jpegzilla.com"
        }
      })
        .then(resp => {
          if (resp.status != 200) {
            return randomArenaBlock();
          } else resolve(resp);
        })
        .catch(err => {
          return new Error(err);
        });
    });
  };

  checkBlock(randUrl).then(resp => {
    let tab = window.open(randUrl.set, "_blank");
    tab.focus();
    return resp.url;
  });
};

randomArenaBlock();
