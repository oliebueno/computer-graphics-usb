#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
out vec4 fragColor;

// reference material: 
// https://iquilezles.org/articles/distfunctions2d/
// p -> fragment point
// b -> box dimension
float sdfBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0f)) + min(max(d.x, d.y), 0.0f);
}

void main() {
  vec3 red = vec3(0.67f, 0.08f, 0.11f);
  vec3 yellow = vec3(0.95f, 0.75f, 0.0f);

  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // conversion to [-1, 1] interval
  uv = uv * 2.0f - 1.0f;

  vec2 size = vec2(1.1f, 0.36f);
  float distanceToShape = sdfBox(uv, size);

  vec3 color = distanceToShape > 0.0f ? red : yellow;

  fragColor = vec4(color, 1.0f);
}
