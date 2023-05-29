import { DefaultTheme } from 'styled-components';
import { HSLA } from 'lib/ui/colors/HSLA';
import { sharedColors } from './shared';

const backgroundHue = 0;
const backgroundSaturation = 0;

export const regularTextAlpha = 0.9;

export const darkTheme: DefaultTheme = {
  name: 'dark',
  colors: {
    ...sharedColors,
    foreground: new HSLA(200, 5, 12),

    foregroundAlt: new HSLA(200, 4, 15),
    foregroundAltHover: new HSLA(200, 3, 18),

    background: new HSLA(200, 9, 7),
    text: new HSLA(0, 0, 100, 0.81),
    textSupporting: new HSLA(0, 0, 100, 0.6),
    textSupporting2: new HSLA(0, 0, 100, 0.44),
    textSupporting3: new HSLA(0, 0, 100, 0.28),

    backgroundGlass: new HSLA(0, 0, 100, 0.06),
    backgroundGlass2: new HSLA(0, 0, 100, 0.13),

    gradient: [new HSLA(318, 32, 72), new HSLA(220, 53, 83), new HSLA(347, 19, 81)],

    overlay: new HSLA(backgroundHue, backgroundSaturation, 1, 0.8),

    outlinedHover: new HSLA(0, 0, 16),

    contrast: new HSLA(0, 0, 100),
  },
  shadows: {
    small: 'rgb(15 15 15 / 20%) 0px 0px 0px 1px, rgb(15 15 15 / 20%) 0px 2px 4px',
    mediud: 'rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 20%) 0px 3px 6px, rgb(15 15 15 / 40%) 0px 9px 24px;',
  },
};
