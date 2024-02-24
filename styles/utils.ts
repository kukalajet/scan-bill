const convertHexToRGBA = (hex: string, opacity: number) => {
  const rgb = hex
    .replace('#', '')
    .split(/(?=(?:..)*$)/)
    .map((x) => parseInt(x, 16));
  return `rgba(${rgb.at(0)}, ${rgb.at(1)}, ${rgb.at(2)}, ${opacity})`;
};

const convertRGBAToHex = (rgba: string) => {
  const matches = rgba.match(
    /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/i,
  );
  if (!matches) {
    throw new Error('Invalid RGBA input');
  }

  const [r, g, b, a] = matches
    .slice(1)
    .map((match, index) =>
      index < 3 ? parseInt(match, 10) : parseFloat(match),
    );

  const hex = (color: number) => {
    const hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const alpha = Math.round(a * 255);
  const hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();

  return '#' + hex(r) + hex(g) + hex(b) + hexAlpha;
};

const utils = { convertHexToRGBA, convertRGBAToHex } as const;

export { utils };
