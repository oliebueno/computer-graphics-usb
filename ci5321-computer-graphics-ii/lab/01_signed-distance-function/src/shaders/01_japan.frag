#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
out vec4 fragColor;

// reference material: 
// https://iquilezles.org/articles/distfunctions2d/
// p -> fragment point
// r -> radius
float sdfCircle(vec2 p, float r) {
  return length(p) - r;
}

void main() {
  vec3 red = vec3(0.73f, 0.0f, 0.18f);
  vec3 white = vec3(1.f, 1.f, 1.f);

  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // interval [-1, 1]
  uv = uv * 2.0f - 1.0f;

  // correct aspect ratio to prevent distortion
  float aspect = u_resolution.x / u_resolution.y;
  uv.x *= aspect;
  // circle properties
  // float radius = 1.0f;
  float radius = 0.3f;
  vec2 center = vec2(0, 0);
  float distanceToCircle = sdfCircle(uv - center, radius);

  vec3 color = distanceToCircle > 0.0f ? white : red;

  fragColor = vec4(color, 1.0f);
}
