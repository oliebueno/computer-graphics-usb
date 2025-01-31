#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
out vec4 fragColor;

float sdfBox(vec2 p, vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0f)) + min(max(d.x, d.y), 0.0f);
}

float sdStar5(vec2 p, float r, float rf) {
    const vec2 k1 = vec2(0.809016994375f, -0.587785252292f);
    const vec2 k2 = vec2(-k1.x, k1.y);
    p.x = abs(p.x);
    p -= 2.0*max(dot(k1, p), 0.0f) * k1;
    p -= 2.0*max(dot(k2, p), 0.0f) * k2;
    p.x = abs(p.x);
    p.y -= r;
    vec2 ba = rf*vec2(-k1.y, k1.x) - vec2(0,1);
    float h = clamp(dot(p, ba)/dot(ba, ba), 0.0f, r);
    return length(p - ba*h) * sign(p.y*ba.x - p.x*ba.y);
}

void main() {
    // Colores 
    vec3 yellow = vec3(0.969f, 0.82f, 0.09);
    vec3 blue = vec3(0.0f, 0.2f, 0.671f);
    vec3 red = vec3(0.812f, 0.078f, 0.169f);
    vec3 white = vec3(1.0f, 1.0f, 1.0f);

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    uv = uv * 2.0f - 1.0f;

    vec2 sizeYellow = vec2((1.0f + 2.0f/3.0f), 1.0f/3.0f);
    vec2 sizeBlue = vec2(1.0f, 1.0f/3.0f);

    float distanceToShapeYellow = sdfBox(uv - (2.0f/3.0f), sizeYellow);
    float distanceToShapeBlue = sdfBox(uv, sizeBlue);

    vec3 color = distanceToShapeYellow > 0.0f ? red : yellow;
    color = distanceToShapeBlue > 0.0f ? color : blue;

    // Pintar las 7 estrellas
    for(int i = 0; i < 7; i++) {
        float angle = 3.14159265359 * float(i) / 6.0f;
        vec2 starPos = vec2(0.5f * cos(angle), 0.5f * sin(angle) - 0.25);
        float distanceToStart = sdStar5(uv - starPos, 0.08f, 0.5f);
        color = distanceToStart > 0.0f? color : white;
    }

    fragColor = vec4(color, 1.0f);
}

