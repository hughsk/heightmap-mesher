module.exports = mesher

function mesher(heightmap) {
  var width = heightmap.shape[0]
  var depth = heightmap.shape[1]
  var w = width - 1
  var d = depth - 1
  var size = w * d * 18

  var quads = new Float32Array(size)
  var y = 0
  var i = 0

  for (var x = 0; x < w; x++)
  for (var z = 0; z < d; z++) {
    var z0 = (  z)/d
    var z1 = (1+z)/d
    var x0 = (  x)/w
    var x1 = (1+x)/w

    // Triangle 1
    quads[i  ] = x1
    quads[i+1] = heightmap.get(x+1, z  )
    quads[i+2] = z0

    quads[i+3] = x0
    quads[i+4] = heightmap.get(x  , z  )
    quads[i+5] = z0

    quads[i+6] = x0
    quads[i+7] = heightmap.get(x  , z+1)
    quads[i+8] = z1

    // Triangle 2
    quads[i+9 ] = x0
    quads[i+10] = heightmap.get(x  , z+1)
    quads[i+11] = z1

    quads[i+12] = x1
    quads[i+13] = heightmap.get(x+1, z+1)
    quads[i+14] = z1

    quads[i+15] = x1
    quads[i+16] = heightmap.get(x+1, z  )
    quads[i+17] = z0

    i += 18
  }

  return quads
}
