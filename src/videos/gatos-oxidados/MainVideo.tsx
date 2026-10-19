import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene4 } from "./Scene4";

// Exact Frame counts calculated from Voicebox audio ("My voice", instruct="curious"):
// Act 1 (Hook - El Pelaje Oxidado): 348 frames (starts at 0)
// Act 2 (Mecanismo 1 - Rayos UV y Eumelanina): 444 frames (starts at 348)
// Act 3 (Anclaje Empírico - Davis 2002 / Tirosina): 536 frames (starts at 792)
// Act 4 (Desmitificación y Cierre Circular): 331 frames (starts at 1328)
// Total: 1659 frames = 27.65 seconds (< 30.0s límite estricto)

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#ECE7DE" }}>
      <Series>
        <Series.Sequence durationInFrames={348}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={444}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={536}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={331}>
          <Scene4 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
