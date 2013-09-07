var shell = require('gl-now')({ clearColor: [1, 1, 1, 1] })
var camera = require('game-shell-orbit-camera')(shell)
var perlin = require('perlin').noise.perlin2
var fill = require('ndarray-fill')
var ndarray = require('ndarray')
var zero = require('zeros')
var fs = require('fs')
var mesher = require('./index')

var createShader = require('gl-shader')
var createBuffer = require('gl-buffer')
var createVAO = require('gl-vao')
var glm = require('gl-matrix')
var mat4 = glm.mat4
var vec2 = glm.vec2

shell.on('gl-init', init)
shell.on('gl-render', render)

var meshes = []
var shader

function init() {
  var gl = shell.gl

  shader = createShader(gl
    , fs.readFileSync(__dirname + '/shaders/terrain.vert', 'utf8')
    , fs.readFileSync(__dirname + '/shaders/terrain.frag', 'utf8')
  )

  meshes = [
      createMesh(gl, +1, +1)
    , createMesh(gl, +1, +0)
    , createMesh(gl, +1, -1)

    , createMesh(gl, +0, +1)
    , createMesh(gl, +0, +0)
    , createMesh(gl, +0, -1)

    , createMesh(gl, -1, +1)
    , createMesh(gl, -1, +0)
    , createMesh(gl, -1, -1)
  ]
}

var model = mat4.identity(new Float32Array(16))
var tempm = mat4.identity(new Float32Array(16))
var gridp = [0,0,0]
var scale = [10,2,10]
function render() {
  var gl = shell.gl

  var projection = mat4.perspective(new Float32Array(16), 0.25*Math.PI, shell.width/shell.height, 0.05, 1000)
  var view = camera.view()

  gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)

  shader.bind()
  shader.uniforms.projection = projection
  shader.uniforms.view = view

  for (var i = 0; i < meshes.length; i += 1) {
    gridp[0] = meshes[i].x - 0.5
    gridp[1] = -0.35
    gridp[2] = meshes[i].y - 0.5

    mat4.scale(model, tempm, scale)
    mat4.translate(model, model, gridp)
    shader.uniforms.model = model

    meshes[i].vao.bind()
    gl.drawArrays(gl.TRIANGLES, 0, meshes[i].length)
    meshes[i].vao.unbind()
  }
}

function createMesh(gl, x, y) {
  var vertData = mesher(
    perlinify(
        zero([64, 64])
      , x
      , y
    ), 0.25
  )

  var vertBuffer = createBuffer(gl, vertData)
  var quads = createVAO(gl, null, [{
    buffer: vertBuffer
    , type: gl.FLOAT
    , size: 3
    , offset: 0
    , stride: 0
    , normalized: false
  }])

  return { vao: quads, length: vertData.length / 3, x: x, y: y }
}

function perlinify(array, _x, _y) {
  _x *= array.shape[0] - 1
  _y *= array.shape[1] - 1
  return fill(array, function(x, y) {
    return perlin((x + _x) * 0.055 + 972, (y + _y) * 0.055 - 234)
  })
}
