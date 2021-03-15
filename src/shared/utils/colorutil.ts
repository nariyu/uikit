export const hsv2rgb = (h: number, s: number, v: number) => {
  h = h % 360;
  const c = v * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));

  let r = 0;
  let g = 0;
  let b = 0;
  if (0 <= hp && hp < 1) {
    [r, g, b] = [c, x, 0];
  }
  if (1 <= hp && hp < 2) {
    [r, g, b] = [x, c, 0];
  }
  if (2 <= hp && hp < 3) {
    [r, g, b] = [0, c, x];
  }
  if (3 <= hp && hp < 4) {
    [r, g, b] = [0, x, c];
  }
  if (4 <= hp && hp < 5) {
    [r, g, b] = [x, 0, c];
  }
  if (5 <= hp && hp < 6) {
    [r, g, b] = [c, 0, x];
  }

  const m = v - c;
  [r, g, b] = [r + m, g + m, b + m];

  r = Math.max(0, Math.min(255, Math.floor(r * 255)));
  g = Math.max(0, Math.min(255, Math.floor(g * 255)));
  b = Math.max(0, Math.min(255, Math.floor(b * 255)));

  const hex =
    '#' +
    [
      r.toString(16).padStart(2, '0'),
      g.toString(16).padStart(2, '0'),
      b.toString(16).padStart(2, '0'),
    ].join('');

  return { r, g, b, hex };
};

export const rgb2int = (r: number, g: number, b: number) =>
  // tslint:disable-next-line: no-bitwise
  (r << 16) + (g << 8) + b;
