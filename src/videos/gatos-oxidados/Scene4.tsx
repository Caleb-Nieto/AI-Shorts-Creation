// Scene 4: Desmitificación y Cierre Circular
import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  staticFile,
  AbsoluteFill,
} from "remotion";
import { Audio } from "@remotion/media";
import {
  fonts,
  palette,
  geometry,
  springSnappy,
  springBouncy,
  getImpactShake,
} from "./styles";

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera punch-in
  const punchIn = interpolate(frame, [0, 331], [1, 1.04], {
    extrapolateRight: "clamp",
  });

  // Impact shake
  const strikeShake = getImpactShake(frame, 15);
  const questionShake = getImpactShake(frame, 160);

  // Springs
  const mythSpring = springSnappy(frame, fps, 5);
  const splitSpring = springBouncy(frame, fps, 35);
  const questionSpring = springSnappy(frame, fps, 155);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.backgroundPrimary,
        transform: `scale(${punchIn}) translate(${strikeShake + questionShake}px, ${(strikeShake + questionShake) * 0.5}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* Background Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${palette.gridAndBorders}10 1px, transparent 1px), linear-gradient(90deg, ${palette.gridAndBorders}10 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* SAFE ZONE CONTAINER */}
      <div
        style={{
          position: "absolute",
          top: 220,
          bottom: 380,
          left: 80,
          right: 140,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* HEADER: Myth Strike-through */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            transform: `scale(${interpolate(mythSpring, [0, 1], [0.9, 1])})`,
            opacity: interpolate(mythSpring, [0, 0.4, 1], [0, 1, 1]),
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <div
              style={{
                fontFamily: fonts.headingFont,
                fontSize: 52,
                fontWeight: 800,
                color: palette.textMuted,
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              ¿ÓXIDO DE HIERRO?
            </div>

            {/* Red Strike line */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: -15,
                right: -15,
                height: 8,
                backgroundColor: palette.alertRed,
                transform: "rotate(-4deg)",
                boxShadow: "0 2px 8px rgba(217, 4, 41, 0.4)",
              }}
            />
          </div>

          <div
            style={{
              fontFamily: fonts.monoFont,
              fontSize: 26,
              fontWeight: 800,
              color: palette.accentPrimary,
              backgroundColor: palette.backgroundSecondary,
              border: `${geometry.borderWidthPx}px solid ${palette.gridAndBorders}`,
              padding: "6px 20px",
              borderRadius: geometry.borderRadiusPx,
              boxShadow: geometry.hardShadowSm,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginTop: 10,
            }}
          >
            DOS CAUSAS REALES
          </div>
        </div>

        {/* VISUAL CENTERPIECE: Split Screen Summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            width: "100%",
            transform: `scale(${interpolate(splitSpring, [0, 1], [0.8, 1])})`,
            opacity: interpolate(splitSpring, [0, 0.3, 1], [0, 1, 1]),
          }}
        >
          {/* Card 1: Sol UV */}
          <div
            style={{
              backgroundColor: palette.backgroundSecondary,
              border: `${geometry.borderWidthPx}px solid ${palette.gridAndBorders}`,
              borderRadius: geometry.borderRadiusPx,
              padding: "24px 20px",
              boxShadow: geometry.hardShadow,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                backgroundColor: palette.sunYellow,
                border: `2px solid ${palette.gridAndBorders}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                boxShadow: geometry.hardShadowSm,
                marginBottom: 12,
              }}
            >
              ☀️
            </div>
            <div
              style={{
                fontFamily: fonts.monoFont,
                fontSize: 18,
                fontWeight: 700,
                color: palette.accentSecondary,
                letterSpacing: 1,
              }}
            >
              EXTERIOR
            </div>
            <div
              style={{
                fontFamily: fonts.headingFont,
                fontSize: 30,
                fontWeight: 800,
                color: palette.textPrimary,
                lineHeight: 1.15,
                marginTop: 4,
              }}
            >
              RAYOS UV
            </div>
            <div
              style={{
                fontFamily: fonts.bodyFont,
                fontSize: 20,
                fontWeight: 600,
                color: palette.textMuted,
                marginTop: 8,
              }}
            >
              Decolora el pelo viejo
            </div>
          </div>

          {/* Card 2: Tirosina */}
          <div
            style={{
              backgroundColor: palette.backgroundSecondary,
              border: `${geometry.borderWidthPx}px solid ${palette.gridAndBorders}`,
              borderRadius: geometry.borderRadiusPx,
              padding: "24px 20px",
              boxShadow: geometry.hardShadow,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                backgroundColor: palette.proteinBlue,
                border: `2px solid ${palette.gridAndBorders}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                boxShadow: geometry.hardShadowSm,
                marginBottom: 12,
              }}
            >
              🥩
            </div>
            <div
              style={{
                fontFamily: fonts.monoFont,
                fontSize: 18,
                fontWeight: 700,
                color: palette.proteinBlue,
                letterSpacing: 1,
              }}
            >
              INTERIOR
            </div>
            <div
              style={{
                fontFamily: fonts.headingFont,
                fontSize: 30,
                fontWeight: 800,
                color: palette.textPrimary,
                lineHeight: 1.15,
                marginTop: 4,
              }}
            >
              TIROSINA
            </div>
            <div
              style={{
                fontFamily: fonts.bodyFont,
                fontSize: 20,
                fontWeight: 600,
                color: palette.textMuted,
                marginTop: 8,
              }}
            >
              Nutrición desde la raíz
            </div>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION: Retention Loop Question */}
        <div
          style={{
            width: "100%",
            backgroundColor: palette.accentHighlighter,
            border: `3px solid ${palette.gridAndBorders}`,
            borderRadius: geometry.borderRadiusPx,
            padding: "24px 28px",
            boxShadow: geometry.hardShadowLg,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${interpolate(questionSpring, [0, 1], [0.85, 1])})`,
            opacity: interpolate(questionSpring, [0, 0.3, 1], [0, 1, 1]),
          }}
        >
          <div>
            <div
              style={{
                fontFamily: fonts.monoFont,
                fontSize: 20,
                fontWeight: 800,
                color: palette.gridAndBorders,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              PREGUNTA DIRECTA
            </div>
            <div
              style={{
                fontFamily: fonts.headingFont,
                fontSize: 42,
                fontWeight: 900,
                color: palette.gridAndBorders,
                lineHeight: 1.05,
                marginTop: 4,
              }}
            >
              ¿TU GATO TAMBIÉN CAMBIA DE COLOR?
            </div>
          </div>

          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              backgroundColor: palette.backgroundPrimary,
              border: `3px solid ${palette.gridAndBorders}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              boxShadow: geometry.hardShadowSm,
              flexShrink: 0,
            }}
          >
            🐈‍⬛
          </div>
        </div>
      </div>

      {/* SFX CHOREOGRAPHY */}
      <Audio src={staticFile("sfx/cinematic-impact.mp3")} volume={0.55} />
      <Audio src={staticFile("sfx/pop.mp3")} from={35} volume={0.45} />
      <Audio src={staticFile("sfx/purring-cat.mp3")} from={90} volume={0.6} />
      <Audio src={staticFile("sfx/bell.mp3")} from={155} volume={0.5} />

      {/* Narration Voiceover */}
      <Audio src={staticFile("assets/gatos-oxidados/act4.wav")} volume={1} />
    </AbsoluteFill>
  );
};
