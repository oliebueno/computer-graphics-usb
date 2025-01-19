// #version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
out vec4 fragColor;

vec3 white = vec3(1.0, 1.0, 1.0);
vec3 red = vec3(1.0, 0.0, 0.0);
vec3 green = vec3(0.0, 1.0, 0.0);
vec3 blue = vec3(0.0, 0.0, 1.0);

void main() {
  // step 0 - show colors

  // step 1 - show swizzling
  // swizzling:
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // shorthand for:
  // float u = gl_FragCoord.x / u_resolution.x;
  // float v = gl_FragCoord.y / u_resolution.y;
  // vec2 uv = vec2(u, v);
  // ----------------------------------------

  // step 2
  // uv = uv + 0.5;
  // step 3
  // uv = uv * u_resolution / 100.0;
  // uv *= u_resolution / 100.0;

  // step 4
  // uv = uv - 0.5;
  // step 4.x
  // uv *= u_resolution / 40.0;// a
  // uv *= u_resolution / 10.0;// b
  // uv *= u_resolution / 1.0;// c

  // vec3 color = white;
  // vec3 color = green;
  // vec3 color = blue + red;// it's additive

  // along with step 1+
  vec3 color = vec3(uv, 0.0);

  //
  // last operation
  fragColor = vec4(color, 1.0);
}
