import { loadFont as loadSyne } from "@remotion/google-fonts/Syne";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadSpaceMono } from "@remotion/google-fonts/SpaceMono";
import { spring } from "remotion";

const { fontFamily: headingFont } = loadSyne("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
});

const { fontFamily: bodyFont } = loadJakarta("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
});

const { fontFamily: monoFont } = loadSpaceMono("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const fonts = { headingFont, bodyFont, monoFont };

export const palette = {
  backgroundPrimary: "#ECE7DE",
  backgroundSecondary: "#F6F2EB",
  textPrimary: "#1E2224",
  textMuted: "#656C6E",
  accentHighlighter: "#F6B800",
  accentPrimary: "#099855",
  accentSecondary: "#E64B2A",
  rustColor: "#C85A17",
  gridAndBorders: "#1E2224",
  blackFur: "#181A1B",
  sunYellow: "#FB8500",
  uvViolet: "#6A0572",
  proteinBlue: "#1D70B8",
  alertRed: "#D90429",
};

export const geometry = {
  borderRadiusPx: 4,
  borderWidthPx: 2,
  hardShadow: "8px 8px 0px #1E2224",
  hardShadowSm: "4px 4px 0px #1E2224",
  hardShadowLg: "12px 12px 0px #1E2224",
  cutoutOutlinePx: 3,
  cutoutOutlineColor: "#1E2224",
};

// Physics springs defined in normativas
export const springSnappy = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      mass: 0.6,
      stiffness: 210,
    },
  });

export const springBouncy = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 10,
      mass: 0.9,
      stiffness: 190,
    },
  });

export const springFirm = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 18,
      mass: 1.0,
      stiffness: 140,
    },
  });

export const springCamera = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 24,
      mass: 1.4,
      stiffness: 75,
    },
  });

export const getImpactShake = (frame: number, impactFrame: number): number => {
  const diff = frame - impactFrame;
  if (diff < 0 || diff > 8) return 0;
  const decay = Math.exp(-diff * 0.45);
  return Math.sin(diff * 2.5) * 12 * decay;
};
