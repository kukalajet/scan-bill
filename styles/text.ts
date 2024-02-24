import { font } from './font';

const text = {
  heading: {
    '3xl': {
      fontFamily: 'Inter',
      fontSize: font.size[900],
      fontWeight: font.weight.bold,
      letterSpacing: font.letterSpacing.densest,
      lineHeight: font.lineHeight[1200],
    },
    '2xl': {
      fontFamily: 'Inter',
      fontSize: font.size[750],
      fontWeight: font.weight.bold,
      letterSpacing: font.letterSpacing.denser,
      lineHeight: font.lineHeight[1000],
    },
    xl: {
      fontFamily: 'Inter',
      fontSize: font.size[600],
      fontWeight: font.weight.bold,
      letterSpacing: font.letterSpacing.dense,
      lineHeight: font.lineHeight[800],
    },
    lg: {
      fontFamily: 'Inter',
      fontSize: font.size[500],
      fontWeight: font.weight.semibold,
      letterSpacing: font.letterSpacing.dense,
      lineHeight: font.lineHeight[600],
    },
    md: {
      fontFamily: 'Inter',
      fontSize: font.size[350],
      fontWeight: font.weight.semibold,
      letterSpacing: font.letterSpacing.normal,
      lineHeight: font.lineHeight[500],
    },
    sm: {
      fontFamily: 'Inter',
      fontSize: font.size[325],
      fontWeight: font.weight.semibold,
      letterSpacing: font.letterSpacing.normal,
      lineHeight: font.lineHeight[500],
    },
    xs: {
      fontFamily: 'Inter',
      fontSize: font.size[300],
      fontWeight: font.weight.semibold,
      letterSpacing: font.letterSpacing.normal,
      lineHeight: font.lineHeight[400],
    },
  },
  body: {
    lg: {
      fontFamily: 'Inter',
      fontSize: font.size[350],
      fontWeight: font.weight.regular,
      letterSpacing: font.letterSpacing.normal,
      lineHeight: font.lineHeight[500],
    },
    md: {
      fontFamily: 'Inter',
      fontSize: font.size[325],
      fontWeight: font.weight.regular,
      letterSpacing: font.letterSpacing.normal,
      lineHeight: font.lineHeight[500],
    },
    sm: {
      fontFamily: 'Inter',
      fontSize: font.size[300],
      fontWeight: font.weight.regular,
      letterSpacing: font.letterSpacing.normal,
      lineHeight: font.lineHeight[400],
    },
    xs: {
      fontFamily: 'Inter',
      fontSize: font.size[275],
      fontWeight: font.weight.regular,
      letterSpacing: font.letterSpacing.normal,
      lineHeight: font.lineHeight[300],
    },
  },
} as const;

export { text };
