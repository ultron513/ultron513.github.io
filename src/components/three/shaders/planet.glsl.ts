/*
 * Procedural wireframe planet (spec §4): latitude/longitude grid, fresnel rim and a day/night
 * terminator. `uDay` blends to the Daylight Orbit look: a sunlit limb with a soft filled disc.
 */
export const planetVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vObject;
  varying vec3 vView;
  void main() {
    vObject = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const planetFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLimb;
  uniform vec3 uLight;
  uniform float uDay;
  varying vec3 vNormal;
  varying vec3 vObject;
  varying vec3 vView;

  float gridLine(float coord, float count) {
    float x = coord * count;
    float w = fwidth(x) * 1.2;
    float f = abs(fract(x - 0.5) - 0.5);
    return 1.0 - smoothstep(0.0, w, f);
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 p = normalize(vObject);
    float lat = asin(clamp(p.y, -1.0, 1.0)) / 3.14159265 + 0.5;
    float lon = atan(p.z, p.x) / 6.2831853 + 0.5;
    float grid = max(gridLine(lat, 12.0), gridLine(lon, 24.0));

    float lit = smoothstep(-0.25, 0.6, dot(n, normalize(uLight)));
    float rim = pow(1.0 - max(dot(n, normalize(vView)), 0.0), 2.6);

    // Deep Space: glowing wireframe on the lit side, faint on the night side.
    float nightAlpha = grid * (0.12 + 0.7 * lit) + rim * 0.75;
    vec3 nightColor = mix(uColor, uLimb, rim * 0.6);

    // Daylight Orbit: soft sunlit disc, warm limb, quieter grid.
    float dayAlpha = 0.03 + 0.10 * lit + grid * (0.18 + 0.22 * lit) + rim * 0.7 * lit;
    vec3 dayColor = mix(uColor, uLimb, rim * lit);

    float alpha = mix(nightAlpha, dayAlpha, uDay);
    vec3 color = mix(nightColor, dayColor, uDay);
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`;
