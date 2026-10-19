import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./videos/gatos-oxidados/MainVideo";
import { Scene1 } from "./videos/gatos-oxidados/Scene1";
import { Scene2 } from "./videos/gatos-oxidados/Scene2";
import { Scene3 } from "./videos/gatos-oxidados/Scene3";
import { Scene4 } from "./videos/gatos-oxidados/Scene4";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Composición Principal Vertical (9:16, 1080x1920, 60fps) — Voz Voicebox 'My voice' (curious) — 27.65s / 1659 frames */}
      <Composition
        id="GatosOxidados"
        component={MainVideo}
        durationInFrames={1659}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* Escenas individuales modulares para previsualización */}
      <Composition
        id="Scene1-Hook"
        component={Scene1}
        durationInFrames={348}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene2-EumelaninaUV"
        component={Scene2}
        durationInFrames={444}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene3-Davis2002Tirosina"
        component={Scene3}
        durationInFrames={536}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="Scene4-DesmitificacionCierre"
        component={Scene4}
        durationInFrames={331}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
