precision mediump float;

varying vec3 pos;

void main() {
  gl_FragColor = vec4(pos.xyz, 1.0);
}
