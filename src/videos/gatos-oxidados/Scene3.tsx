// Scene 3: Anclaje Empírico — Davis 2002 y la Tirosina
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

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera punch-in
  const punchIn = interpolate(frame, [0, 536], [1, 1.05], {
    extrapolateRight: "clamp",
  });

  // Impact shake when the deficiency blocks the pathway (frame 190)
  const blockShake = getImpactShake(frame, 190);

  // Entrance springs
  const headerSpring = springSnappy(frame, fps, 5);
  const pathwaySpring = springBouncy(frame, fps, 35);
  const blockSpring = springSnappy(frame, fps, 190);
  const bottomSpring = springSnappy(frame, fps, 280);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.backgroundPrimary,
        transform: `scale(${punchIn}) translate(${blockShake}px, ${blockShake * 0.5}px)`,
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
        {/* HEADER BLOCK: Empirical Anchor */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            transform: `scale(${interpolate(headerSpring, [0, 1], [0.9, 1])})`,
            opacity: interpolate(headerSpring, [0, 0.4, 1], [0, 1, 1]),
          }}
        >
          {/* Eyebrow Pill: Place + Year */}
          <div
            style={{
              fontFamily: fonts.monoFont,
              fontSize: 24,
              fontWeight: 700,
              color: "#FFFFFF",
              backgroundColor: palette.gridAndBorders,
              border: `${geometry.borderWidthPx}px solid ${palette.gridAndBorders}`,
              padding: "6px 20px",
              borderRadius: geometry.borderRadiusPx,
              boxShadow: geometry.hardShadowSm,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 10,
            }}
          >
            DAVIS, CALIFORNIA • 2002
          </div>

          <div
            style={{
              fontFamily: fonts.headingFont,
              fontSize: 60,
              fontWeight: 800,
              color: palette.textPrimary,
              textAlign: "center",
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}
          >
            DR. QUINTON ROGERS
          </div>

          <div
            style={{
              fontFamily: fonts.bodyFont,
              fontSize: 28,
              fontWeight: 600,
              color: palette.textMuted,
              marginTop: 4,
            }}
          >
            Escuela de Veterinaria UC Davis
          </div>
        </div>

        {/* VISUAL CENTERPIECE: The Biochemical Assembly Line */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 540,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${interpolate(pathwaySpring, [0, 1], [0.8, 1])})`,
            opacity: interpolate(pathwaySpring, [0, 0.3, 1], [0, 1, 1]),
          }}
        >
          {/* Node 1: Dieta Proteica */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "92%",
              backgroundColor: palette.backgroundSecondary,
              border: `${geometry.borderWidthPx}px solid ${palette.gridAndBorders}`,
              borderRadius: geometry.borderRadiusPx,
              padding: "14px 20px",
              boxShadow: geometry.hardShadowSm,
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                backgroundColor: palette.proteinBlue,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 700,
                border: `2px solid ${palette.gridAndBorders}`,
                flexShrink: 0,
              }}
            >
              🥩
            </div>
            <div>
              <div
                style={{
                  fontFamily: fonts.monoFont,
                  fontSize: 16,
                  fontWeight: 700,
                  color: palette.proteinBlue,
                  letterSpacing: 1,
                }}
              >
                PASO 01 • DIETA
              </div>
              <div
                style={{
                  fontFamily: fonts.headingFont,
                  fontSize: 26,
                  fontWeight: 800,
                  color: palette.textPrimary,
                }}
              >
                Proteína con Fenilalanina
              </div>
            </div>
          </div>

          {/* Connector Arrow 1 */}
          <div
            style={{
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="28" viewBox="0 0 24 28">
              <line x1="12" y1="2" x2="12" y2="22" stroke={palette.gridAndBorders} strokeWidth="4" />
              <polygon points="6,18 12,26 18,18" fill={palette.gridAndBorders} />
            </svg>
          </div>

          {/* Node 2: Tirosina (The Crucial Intermediate) */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "92%",
              backgroundColor: frame > 190 ? "#FFE5D9" : palette.backgroundSecondary,
              border: `${geometry.borderWidthPx + (frame > 190 ? 2 : 0)}px solid ${
                frame > 190 ? palette.alertRed : palette.accentPrimary
              }`,
              borderRadius: geometry.borderRadiusPx,
              padding: "16px 20px",
              boxShadow: geometry.hardShadow,
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                backgroundColor: frame > 190 ? palette.alertRed : palette.accentPrimary,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 800,
                border: `2px solid ${palette.gridAndBorders}`,
                flexShrink: 0,
              }}
            >
              {frame > 190 ? "❌" : "🧬"}
            </div>
            <div>
              <div
                style={{
                  fontFamily: fonts.monoFont,
                  fontSize: 16,
                  fontWeight: 700,
                  color: frame > 190 ? palette.alertRed : palette.accentPrimary,
                  letterSpacing: 1,
                }}
              >
                PASO 02 • AMINOÁCIDO CLAVE
              </div>
              <div
                style={{
                  fontFamily: fonts.headingFont,
                  fontSize: 34,
                  fontWeight: 800,
                  color: palette.textPrimary,
                }}
              >
                TIROSINA
              </div>
            </div>

            {/* Stamp on deficiency */}
            {frame > 190 && (
              <div
                style={{
                  position: "absolute",
                  right: 14,
                  backgroundColor: palette.alertRed,
                  color: "#FFFFFF",
                  border: `2px solid ${palette.gridAndBorders}`,
                  padding: "4px 14px",
                  borderRadius: geometry.borderRadiusPx,
                  fontFamily: fonts.monoFont,
                  fontSize: 18,
                  fontWeight: 800,
                  transform: `scale(${interpolate(blockSpring, [0, 1], [1.6, 1])}) rotate(6deg)`,
                }}
              >
                BLOQUEADO 🚫
              </div>
            )}
          </div>

          {/* Connector Arrow 2 */}
          <div
            style={{
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="28" viewBox="0 0 24 28">
              <line
                x1="12"
                y1="2"
                x2="12"
                y2="22"
                stroke={frame > 190 ? palette.alertRed : palette.gridAndBorders}
                strokeWidth="4"
                strokeDasharray={frame > 190 ? "4 4" : "none"}
              />
              <polygon
                points="6,18 12,26 18,18"
                fill={frame > 190 ? palette.alertRed : palette.gridAndBorders}
              />
            </svg>
          </div>

          {/* Node 3: Pigmento Negro vs Oxidado */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "92%",
              backgroundColor: frame > 190 ? "#FFF3EA" : palette.backgroundSecondary,
              border: `${geometry.borderWidthPx}px solid ${palette.gridAndBorders}`,
              borderRadius: geometry.borderRadiusPx,
              padding: "14px 20px",
              boxShadow: geometry.hardShadowSm,
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                backgroundColor: frame > 190 ? palette.rustColor : palette.blackFur,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 700,
                border: `2px solid ${palette.gridAndBorders}`,
                flexShrink: 0,
              }}
            >
              {frame > 190 ? "🍂" : "🐈‍⬛"}
            </div>
            <div>
              <div
                style={{
                  fontFamily: fonts.monoFont,
                  fontSize: 16,
                  fontWeight: 700,
                  color: frame > 190 ? palette.rustColor : palette.textPrimary,
                  letterSpacing: 1,
                }}
              >
                PASO 03 • COLOR FINAL
              </div>
              <div
                style={{
                  fontFamily: fonts.headingFont,
                  fontSize: 26,
                  fontWeight: 800,
                  color: frame > 190 ? palette.rustColor : palette.textPrimary,
                }}
              >
                {frame > 190 ? "Pelo Nace Marrón Rojizo" : "Eumelanina Negra Densa"}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CARD: The 2X Tyrosine Requirement */}
        <div
          style={{
            width: "100%",
            backgroundColor: palette.backgroundSecondary,
            border: `${geometry.borderWidthPx}px solid ${palette.gridAndBorders}`,
            borderRadius: geometry.borderRadiusPx,
            padding: "20px 24px",
            boxShadow: geometry.hardShadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${interpolate(bottomSpring, [0, 1], [0.95, 1])})`,
            opacity: interpolate(bottomSpring, [0, 0.4, 1], [0, 1, 1]),
          }}
        >
          <div>
            <div
              style={{
                fontFamily: fonts.monoFont,
                fontSize: 20,
                fontWeight: 700,
                color: palette.accentSecondary,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              HALLAZGO CIENTÍFICO
            </div>
            <div
              style={{
                fontFamily: fonts.bodyFont,
                fontSize: 28,
                fontWeight: 700,
                color: palette.textPrimary,
                marginTop: 4,
              }}
            >
              Los gatos negros necesitan...
            </div>
            <div
              style={{
                fontFamily: fonts.headingFont,
                fontSize: 32,
                fontWeight: 800,
                color: palette.accentPrimary,
                marginTop: 2,
              }}
            >
              ¡EL DOBLE DE TIROSINA!
            </div>
          </div>

          <div
            style={{
              padding: "10px 18px",
              backgroundColor: palette.backgroundPrimary,
              border: `2px solid ${palette.gridAndBorders}`,
              borderRadius: geometry.borderRadiusPx,
              textAlign: "center",
              boxShadow: geometry.hardShadowSm,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: fonts.headingFont,
                fontSize: 42,
                fontWeight: 900,
                color: palette.accentSecondary,
                lineHeight: 1,
              }}
            >
              2X
            </div>
            <div
              style={{
                fontFamily: fonts.monoFont,
                fontSize: 14,
                fontWeight: 700,
                color: palette.textMuted,
              }}
            >
              PROTEÍNA
            </div>
          </div>
        </div>
      </div>

      {/* SFX CHOREOGRAPHY */}
      <Audio src={staticFile("sfx/fast-typing.mp3")} volume={0.45} />
      <Audio src={staticFile("sfx/pop.mp3")} from={35} volume={0.4} />
      <Audio src={staticFile("sfx/simple-whoosh.mp3")} from={90} volume={0.4} />
      <Audio src={staticFile("sfx/cinematic-impact.mp3")} from={190} volume={0.6} />
      <Audio src={staticFile("sfx/camera-flash.mp3")} from={280} volume={0.5} />

      {/* Narration Voiceover */}
      <Audio src={staticFile("assets/gatos-oxidados/act3.wav")} volume={1} />
    </AbsoluteFill>
  );
};
