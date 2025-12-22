/**
 * 1. RAW PALETTE
 * The exact RGBA values from your Tailwind CSS file.
 * We define them here once so we can reference them easily.
 */
const palette = {
  // Base Colors
  white: 'rgba(255, 255, 255, 1)',
  black: 'rgba(0, 0, 0, 1)',

  // Slate Scale (Used for Backgrounds/Borders in your CSS)
  slate50: 'rgba(248, 250, 252, 1)',
  slate100: 'rgba(241, 245, 249, 1)', // Light Mode Secondary/Muted/Accent
  slate200: 'rgba(226, 232, 240, 1)', // Light Mode Border/Input
  slate400: 'rgba(148, 163, 184, 1)', // Dark Mode Muted Foreground
  slate500: 'rgba(100, 116, 139, 1)', // Light Mode Muted Foreground
  slate700: 'rgba(51, 65, 85, 0.5)', // Dark Mode Border/Input
  slate800: 'rgba(30, 41, 59, 1)', // Dark Mode Secondary/Muted/Accent
  slate900: 'rgba(15, 23, 42, 1)', // Dark Mode Background / Light Mode Foreground

  // Brand Colors
  beamOrange: 'rgba(249, 115, 22, 1)', // --primary
  beamOrangeRing: 'rgba(249, 115, 22, 0.2)', // --ring (Light)
  beamOrangeRingDark: 'rgba(249, 115, 22, 0.4)', // --ring (Dark)

  // Status Colors
  greenSuccess: 'rgba(90, 183, 82, 1)', // --success (#5AB752)
  amberWarning: 'rgba(245, 158, 11, 1)', // --warning
  blueInfo: 'rgba(59, 130, 246, 1)', // --info
  redDestructive: 'rgba(239, 68, 68, 1)', // --destructive (Light)
  redDestructiveDark: 'rgba(235, 54, 54, 1)', // --destructive (Dark)
};

/**
 * 2. SEMANTIC THEME
 * This matches your Tailwind @theme structure perfectly.
 * Use these tokens in your components (e.g., Colors.light.primary).
 */
export const Colors = {
  light: {
    background: palette.white,
    foreground: palette.slate900, // Main Text

    primary: palette.beamOrange,
    primaryForeground: palette.white,

    secondary: palette.slate100,
    secondaryForeground: palette.slate900,

    muted: palette.slate100,
    mutedForeground: palette.slate500,

    accent: palette.slate100,
    accentForeground: palette.slate900,

    destructive: palette.redDestructive,
    destructiveForeground: palette.white,

    success: palette.greenSuccess,
    successForeground: palette.white,

    warning: palette.amberWarning,
    warningForeground: palette.white,

    info: palette.blueInfo,
    infoForeground: palette.white,

    border: palette.slate200,
    input: palette.slate200,
    ring: palette.beamOrangeRing,
  },

  dark: {
    background: palette.slate900,
    foreground: palette.white, // Main Text

    primary: palette.beamOrange, // Keeps Orange in Dark Mode
    primaryForeground: palette.white,

    secondary: palette.slate800,
    secondaryForeground: palette.white,

    muted: palette.slate800,
    mutedForeground: palette.slate400,

    accent: palette.slate800,
    accentForeground: palette.white,

    destructive: palette.redDestructiveDark,
    destructiveForeground: palette.white,

    // Status colors remain consistent (as requested in CSS)
    success: palette.greenSuccess,
    successForeground: palette.white,

    warning: palette.amberWarning,
    warningForeground: palette.white,

    info: palette.blueInfo,
    infoForeground: palette.white,

    border: palette.slate700,
    input: palette.slate700,
    ring: palette.beamOrangeRingDark,
  },
};
