export default path =>
  new Promise((resolve, reject) => {
    fetch(path)
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
