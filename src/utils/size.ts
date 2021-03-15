export const getFontSize = () => {
  const fontSize = Math.min(20, window.innerWidth / 25);
  return fontSize;
};

export const getPx = (px: number) => {
  return (getFontSize() / (750 / 25)) * px;
};

export const getVw = (vw: number) => {
  return 750 * (vw / 100);
};
