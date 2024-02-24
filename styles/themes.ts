import { border } from './border';
import { breakpoints } from './breakpoints';
import { color } from './color';
import { height } from './height';
import { shadow } from './shadow';
import { space } from './space';
import { text } from './text';
import { utils } from './utils';
import { width } from './width';
import { zIndex } from './zIndex';

const lightTheme = {
  border,
  color,
  text,
  height,
  shadow,
  space,
  width,
  zIndex,
  utils,
  breakpoints,
} as const;

const darkTheme = lightTheme;

export { lightTheme, darkTheme };
