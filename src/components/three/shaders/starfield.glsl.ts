/* Starfield point sprites (spec §7): size attenuation, slow twinkle, token colour. */
export const starfieldVertex = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScale;
  varying float vTwinkle;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uScale * uPixelRatio * (24.0 / -mv.z);
    vTwinkle = 0.6 + 0.4 * sin(uTime * (0.6 + aSeed * 1.4) + aSeed * 40.0);
  }
`;

export const starfieldFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vTwinkle;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float core = smoothstep(0.5, 0.0, d);
    float alpha = pow(core, 2.2) * vTwinkle * uOpacity;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;
