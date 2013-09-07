# heightmap-mesher [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

A naive heightmap mesher: takes a 2-dimensional
[ndarray](http://github.com/mikolalysenko/ndarray) and returns a `Float32Array`
that contains the required vertices to render the heightmap as a 3D mesh.
There's no optimisations, so this is mostly for convenience.

Should be pretty trivial to use in combination with
[ndarray-continuous](http://github.com/hughsk/ndarray-continuous) for infinite
terrain, too :)

[check out the demo](http://hughsk.github.io/heightmap-mesher)

## Installation ##

[![heightmap-mesher](https://nodei.co/npm/heightmap-mesher.png?mini=true)](https://nodei.co/npm/heightmap-mesher)

## Usage ##

### `require('heightmap-mesher')(map)` ###

Takes an 2D ndarray, where each value corresponds to a height in the map. The X
and Z vertices will be between 0 and 1, and the Y vertices will be the same
values you specify.

You can transform the model after the fact to scale the dimensions of the
resulting mesh.
