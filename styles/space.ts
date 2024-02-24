const baseSpace = {
  0: 0,
  '025': 1,
  '050': 2,
  100: 4,
  150: 6,
  200: 8,
  300: 12,
  400: 16,
  500: 20,
  600: 24,
  800: 32,
  1000: 40,
  1200: 48,
  1600: 64,
  2000: 80,
  2400: 96,
  2800: 112,
  3200: 128,
};

const specificSpace = {
  button: {
    group: {
      gap: baseSpace['200'],
    },
  },
  card: {
    gap: baseSpace['400'],
    padding: baseSpace['400'],
  },
  table: {
    cell: {
      padding: baseSpace['300'],
    },
  },
};

const space = { ...baseSpace, ...specificSpace } as const;

export { space };
