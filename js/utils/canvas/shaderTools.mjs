export const createShader = (gl, type, source) => {
  const shader = gl.createShader(type)

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

  if (success) return shader

  console.log(gl.getShaderInfoLog(shader))

  gl.deleteShader(shader)
}

export const createGLProgram = (gl, vertex, fragment) => {
  const program = gl.createProgram()

  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)

  const success = gl.getProgramParameter(program, gl.LINK_STATUS)

  if (success) return program

  console.log(gl.getProgramInfoLog(program))

  gl.deleteProgram(program)
}
