// https://polaris.shopify.com/tokens/shadow
const shadow = {
  '0': {},
  // 0px 1px 0px 0px rgba(26, 26, 26, 0.07)
  '100': {
    shadowColor: 'rgba(26, 26, 26, 0.07)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
  },
  // 0px 3px 1px -1px rgba(26, 26, 26, 0.07)
  '200': {
    shadowColor: 'rgba(26, 26, 26, 0.07)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  // 0px 4px 6px -2px rgba(26, 26, 26, 0.20)
  '300': {
    shadowColor: 'rgba(26, 26, 26, 0.20)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  // 0px 8px 16px -4px rgba(26, 26, 26, 0.22)
  '400': {
    shadowColor: 'rgba(26, 26, 26, 0.22)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 5,
  },
  // 0px 12px 20px -8px rgba(26, 26, 26, 0.24)
  '500': {
    shadowColor: 'rgba(26, 26, 26, 0.24)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 6,
  },
  // 0px 20px 20px -8px rgba(26, 26, 26, 0.28)
  '600': {
    shadowColor: 'rgba(26, 26, 26, 0.28)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 7,
  },
} as const;

type Shadow = keyof typeof shadow;

export { shadow, type Shadow };
