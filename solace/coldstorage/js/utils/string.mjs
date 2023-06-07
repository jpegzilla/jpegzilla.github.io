/**
 * truncates a string to a certain length with an ellipsis.
 * @param  {string} string string to cut
 * @param  {number} length length to cut to
 * @return {string}        truncated string
 */
export const trunc = (string, length) => {
  return string.length <= length
    ? string
    : string.substring(0, length - 3).padEnd(length, '.')
}

/**
 * sufficient hash function for rabin-karp
 * @param  {string} string string to hash
 * @param  {number} factor an arbitrary number
 * @return {number}        number hash of the given string
 */
const hash = (string, factor = 50) => {
  // max signed 32-bit int (this could be anything I think)
  const q = 2_147_483_647

  return (
    string.split('').reduce((prev, _curr, i) => {
      return (
        string.charCodeAt(i) * Math.pow(2, string.length - i) + prev * factor
      )
    }, 0) % q
  )
}

/**
 * rough implementation of rabin-karp based on the wikipedia article
 * https://wikipedia.org/wiki/Rabin-Karp_algorithm
 * @param  {string} string  the text to search within
 * @param  {string} pattern the string to search for
 * @return {number}         index at which the string was found, else -1
 */
export const rabinKarp = (string, pattern) => {
  const hPattern = hash(pattern, 50)

  for (let i = 0; i <= string.length - pattern.length; i++) {
    const hString = hash(string.slice(i, i + pattern.length), 50)

    if (
      hString === hPattern &&
      string.slice(i, i + pattern.length) === pattern
    ) {
      return i
    }
  }

  return -1
}

/**
 * finds all instances of pattern in string, using rabin-karp
 * @param  {string} string  the text to search within
 * @param  {string} pattern the string to search for
 * @return {{ indices: array<number>, matchCount: number }}
 */
export const allRabinKarp = (string, pattern) => {
  const indices = []

  const findAll = (s, p) => {
    const i = rabinKarp(s, p)

    if (i !== -1 && !indices.includes(i - 1)) {
      indices.push(i + (indices.at(-1) + 1 || 0))

      findAll(s.substring(i + 1), p)
    }
  }

  findAll(string, pattern)

  return { indices, matchCount: indices.length }
}

/**
 * generates a uuidv4
 * @return {string} uuid
 */
export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * tagged template function to write html in javascript.
 * (basically just used to get my editor to correctly format html strings.)
 * @param  {string} literals the string literal
 * @param  {any}    vars     variables to interpolate
 * @return {string}          string with variables correctly placed
 */
export const html = (literals, ...vars) => {
  let raw = literals.raw,
    result = '',
    i = 1,
    len = vars.length + 1,
    str,
    variable

  while (i < len) {
    str = raw[i - 1]
    variable = vars[i - 1]
    result += str + variable
    i++
  }

  result += raw[raw.length - 1]

  return result
}
