attribute vec3 position;
uniform mat4 projection;
uniform mat4 model;
uniform mat4 view;

varying vec3 pos;

void main() {
  pos = position;
  gl_Position = projection * view * model * vec4(position, 1.0);
}
