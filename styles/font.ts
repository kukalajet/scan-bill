const font = {
  size: {
    275: 11,
    300: 12,
    325: 13,
    350: 14,
    400: 16,
    450: 18,
    500: 20,
    550: 22,
    600: 24,
    750: 30,
    800: 32,
    900: 36,
    1000: 40,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  letterSpacing: {
    densest: -0.54,
    denser: -0.3,
    dense: -0.2,
    normal: 0,
  },
  lineHeight: {
    300: 12,
    400: 16,
    500: 20,
    600: 24,
    700: 28,
    800: 32,
    1000: 40,
    1200: 48,
  },
} as const;

export { font };
