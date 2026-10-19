// Scene 2: Mecanismo 1 — Rayos UV y Eumelanina
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

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera punch-in (retention reset)
  const punchIn = interpolate(frame, [0, 444], [1, 1.05], {
    extrapolateRight: "clamp",
  });

  // Impact shake on UV burst (around frame 180)
  const uvShake = getImpactShake(frame, 180);

  // Entrance springs
  const headerSpring = springSnappy(frame, fps, 5);
  const hairSpring = springBouncy(frame, fps, 30);
  const uvSpring = springSnappy(frame, fps, 110);
  const cardSpring = springSnappy(frame, fps, 250);

  // Melanin degradation factor
  const degradation = interpolate(frame, [170, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.backgroundPrimary,
        transform: `scale(${punchIn}) translate(${uvShake}px, ${uvShake * 0.5}px)`,
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
        {/* HEADER BLOCK */}
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
          {/* Eyebrow Pill */}
          <div
            style={{
              fontFamily: fonts.monoFont,
              fontSize: 24,
              fontWeight: 700,
              color: palette.textPrimary,
              backgroundColor: palette.backgroundSecondary,
              border: `${geometry.borderWidthPx}px solid ${palette.gridAndBorders}`,
              padding: "6px 20px",
              borderRadius: geometry.borderRadiusPx,
              boxShadow: geometry.hardShadowSm,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            NIVEL MICROSCÓPICO • 50 µm
          </div>

          <div
            style={{
              fontFamily: fonts.headingFont,
              fontSize: 64,
              fontWeight: 800,
              color: palette.textPrimary,
              textAlign: "center",
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}
          >
            EL PIGMENTO NEGRO
          </div>

          <div
            style={{
              fontFamily: fonts.monoFont,
              fontSize: 40,
              fontWeight: 700,
              color: palette.accentPrimary,
              backgroundColor: `${palette.accentPrimary}18`,
              padding: "4px 20px",
              borderRadius: geometry.borderRadiusPx,
              border: `2px solid ${palette.accentPrimary}`,
              marginTop: 6,
            }}
          >
            EUMELANINA
          </div>
        </div>

        {/* VISUAL CENTERPIECE: Hair Shaft Cross-Section + UV Ray Breakdown */}
        <div
          style={{
            position: "relative",
            width: 580,
            height: 520,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${interpolate(hairSpring, [0, 1], [0.5, 1])})`,
            opacity: interpolate(hairSpring, [0, 0.3, 1], [0, 1, 1]),
          }}
        >
          {/* Hair Shaft Tube Illustration in SVG */}
          <svg
            width="500"
            height="460"
            viewBox="0 0 460 420"
            style={{
              filter: `drop-shadow(8px 8px 0px ${palette.gridAndBorders})`,
            }}
          >
            {/* Outer Hair Shaft Tube (Cortex / Cuticle) */}
            <rect
              x="50"
              y="60"
              width="240"
              height="300"
              rx="40"
              fill={palette.backgroundSecondary}
              stroke={palette.gridAndBorders}
              strokeWidth="5"
            />

            {/* Inner Core (Medulla) */}
            <rect
              x="135"
              y="90"
              width="70"
              height="240"
              rx="20"
              fill="#D8D0C5"
              stroke={palette.gridAndBorders}
              strokeWidth="3"
              strokeDasharray="6 6"
            />

            {/* Labels inside diagram */}
            <text
              x="170"
              y="80"
              textAnchor="middle"
              fontFamily={fonts.monoFont}
              fontSize="14"
              fontWeight="700"
              fill={palette.textMuted}
            >
              MÉDULA
            </text>

            {/* Melanin Granules inside the hair cortex */}
            {[
              { cx: 90, cy: 110, id: "m1" },
              { cx: 100, cy: 170, id: "m2" },
              { cx: 85, cy: 230, id: "m3" },
              { cx: 95, cy: 290, id: "m4" },
              { cx: 245, cy: 110, id: "m5" },
              { cx: 235, cy: 170, id: "m6" },
              { cx: 250, cy: 230, id: "m7" },
              { cx: 240, cy: 290, id: "m8" },
            ].map((granule, idx) => {
              const isDegraded = degradation > 0.1 && (idx >= 4 || degradation > 0.6);
              const color = isDegraded ? palette.rustColor : palette.blackFur;
              const scalePulse = isDegraded ? 1 + Math.sin(frame * 0.2 + idx) * 0.08 : 1;
              return (
                <g key={granule.id} transform={`scale(${scalePulse}) translate(${(1 - scalePulse) * granule.cx}, ${(1 - scalePulse) * granule.cy})`}>
                  <circle
                    cx={granule.cx}
                    cy={granule.cy}
                    r="20"
                    fill={color}
                    stroke={palette.gridAndBorders}
                    strokeWidth="3"
                  />
                  {/* Molecule sparkle / break line if degraded */}
                  {isDegraded && (
                    <line
                      x1={granule.cx - 10}
                      y1={granule.cy - 10}
                      x2={granule.cx + 10}
                      y2={granule.cy + 10}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                  )}
                </g>
              );
            })}

            {/* UV Ray Influx (Waves from the right) */}
            <g
              opacity={interpolate(uvSpring, [0, 1], [0, 1])}
              transform={`translate(${interpolate(uvSpring, [0, 1], [80, 0])}, 0)`}
            >
              {/* Ray 1 */}
              <path
                d={`M 440 120 Q 380 ${110 + Math.sin(frame * 0.2) * 15}, 300 130`}
                fill="none"
                stroke={palette.sunYellow}
                strokeWidth="7"
                strokeLinecap="round"
              />
              <polygon
                points="295,130 310,120 310,140"
                fill={palette.sunYellow}
                stroke={palette.gridAndBorders}
                strokeWidth="2"
              />

              {/* Ray 2 */}
              <path
                d={`M 450 200 Q 390 ${190 + Math.cos(frame * 0.2) * 15}, 300 210`}
                fill="none"
                stroke={palette.accentSecondary}
                strokeWidth="7"
                strokeLinecap="round"
              />
              <polygon
                points="295,210 310,200 310,220"
                fill={palette.accentSecondary}
                stroke={palette.gridAndBorders}
                strokeWidth="2"
              />

              {/* Ray 3 */}
              <path
                d={`M 440 280 Q 380 ${270 + Math.sin(frame * 0.2) * 15}, 300 290`}
                fill="none"
                stroke={palette.sunYellow}
                strokeWidth="7"
                strokeLinecap="round"
              />
              <polygon
                points="295,290 310,280 310,300"
                fill={palette.sunYellow}
                stroke={palette.gridAndBorders}
                strokeWidth="2"
              />

              {/* UV Tag */}
              <rect
                x="330"
                y="180"
                width="110"
                height="44"
                rx="6"
                fill={palette.accentSecondary}
                stroke={palette.gridAndBorders}
                strokeWidth="3"
              />
              <text
                x="385"
                y="210"
                textAnchor="middle"
                fontFamily={fonts.headingFont}
                fontSize="22"
                fontWeight="800"
                fill="#FFFFFF"
              >
                RAYOS UV
              </text>
            </g>
          </svg>

          {/* Floating Badge: [FOTODEGRADACIÓN] */}
          {degradation > 0.3 && (
            <div
              style={{
                position: "absolute",
                top: 40,
                left: -10,
                backgroundColor: palette.rustColor,
                color: "#FFFFFF",
                border: `3px solid ${palette.gridAndBorders}`,
                padding: "8px 20px",
                borderRadius: geometry.borderRadiusPx,
                boxShadow: geometry.hardShadowSm,
                transform: "rotate(-6deg)",
              }}
            >
              <span
                style={{
                  fontFamily: fonts.monoFont,
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                OXIDACIÓN QUÍMICA ⚡
              </span>
            </div>
          )}
        </div>

        {/* BOTTOM EXPLANATORY CARD: Like a faded black shirt */}
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
            transform: `scale(${interpolate(cardSpring, [0, 1], [0.95, 1])})`,
            opacity: interpolate(cardSpring, [0, 0.4, 1], [0, 1, 1]),
          }}
        >
          <div>
            <div
              style={{
                fontFamily: fonts.monoFont,
                fontSize: 20,
                fontWeight: 700,
                color: palette.textMuted,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              COMPARACIÓN COTIDIANA
            </div>
            <div
              style={{
                fontFamily: fonts.bodyFont,
                fontSize: 30,
                fontWeight: 700,
                color: palette.textPrimary,
                marginTop: 4,
              }}
            >
              Como una playera negra al sol 👕☀️
            </div>
            <div
              style={{
                fontFamily: fonts.monoFont,
                fontSize: 22,
                fontWeight: 700,
                color: palette.accentSecondary,
                marginTop: 2,
              }}
            >
              Eumelanina negra → Degradada a rojizo
            </div>
          </div>

          <div
            style={{
              padding: "10px 16px",
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
                fontFamily: fonts.monoFont,
                fontSize: 16,
                fontWeight: 700,
                color: palette.textMuted,
              }}
            >
              RESULTADO
            </div>
            <div
              style={{
                fontFamily: fonts.headingFont,
                fontSize: 32,
                fontWeight: 800,
                color: palette.rustColor,
              }}
            >
              COBRIZO
            </div>
          </div>
        </div>
      </div>

      {/* SFX CHOREOGRAPHY */}
      <Audio src={staticFile("sfx/cinematic-whoosh.mp3")} volume={0.5} />
      <Audio src={staticFile("sfx/pop.mp3")} from={30} volume={0.4} />
      <Audio src={staticFile("sfx/riser.mp3")} from={110} volume={0.45} />
      <Audio src={staticFile("sfx/cinematic-impact.mp3")} from={180} volume={0.6} />
      <Audio src={staticFile("sfx/camera-flash.mp3")} from={250} volume={0.5} />

      {/* Narration Voiceover */}
      <Audio src={staticFile("assets/gatos-oxidados/act2.wav")} volume={1} />
    </AbsoluteFill>
  );
};
