// Scene 1: Hook — La Negación Cotidiana: El Pelaje Oxidado
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

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Micro punch-in camera reset (rule: retention reset)
  const punchIn = interpolate(frame, [0, 348], [1, 1.04], {
    extrapolateRight: "clamp",
  });

  // Impact shake
  const introShake = getImpactShake(frame, 2);
  const stampShake = getImpactShake(frame, 145);
  const totalShake = introShake + stampShake;

  // Title entrance
  const titleSpring = springSnappy(frame, fps, 5);
  const titleScale = interpolate(titleSpring, [0, 1], [0.85, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 0.4, 1], [0, 1, 1]);

  // Secondary line entrance (frame 20)
  const subtitleSpring = springSnappy(frame, fps, 20);
  const subtitleScale = interpolate(subtitleSpring, [0, 1], [0.9, 1]);

  // Cat entrance
  const catSpring = springBouncy(frame, fps, 40);
  const catScale = interpolate(catSpring, [0, 1], [0.3, 1]);
  const catOpacity = interpolate(catSpring, [0, 0.3, 1], [0, 1, 1]);

  // Sun beam entrance at frame 85
  const sunSpring = springBouncy(frame, fps, 85);
  const sunScale = interpolate(sunSpring, [0, 1], [0, 1]);

  // Fur color transition (starts when sun hits around frame 110)
  const rustFactor = interpolate(frame, [110, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stamp [EFECTO ÓXIDO] entrance at frame 145
  const stampSpring = springSnappy(frame, fps, 145);
  const stampScale = interpolate(stampSpring, [0, 1], [1.8, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.2, 1], [0, 1, 1]);

  // Myth badge at frame 210
  const mythSpring = springSnappy(frame, fps, 210);
  const mythY = interpolate(mythSpring, [0, 1], [40, 0]);
  const mythOpacity = interpolate(mythSpring, [0, 0.4, 1], [0, 1, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.backgroundPrimary,
        transform: `scale(${punchIn}) translate(${totalShake}px, ${totalShake * 0.5}px)`,
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

      {/* SAFE ZONE CONTAINER: Top 220px, Bottom 380px, Left 80px, Right 140px */}
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
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
          }}
        >
          {/* Eyebrow Pill */}
          <div
            style={{
              fontFamily: fonts.monoFont,
              fontSize: 26,
              fontWeight: 700,
              color: palette.textPrimary,
              backgroundColor: palette.backgroundSecondary,
              border: `${geometry.borderWidthPx}px solid ${palette.gridAndBorders}`,
              padding: "8px 24px",
              borderRadius: geometry.borderRadiusPx,
              boxShadow: geometry.hardShadowSm,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            PARADOJA FELINA
          </div>

          {/* Main Hook Headline */}
          <div
            style={{
              fontFamily: fonts.headingFont,
              fontSize: 66,
              fontWeight: 800,
              color: palette.textPrimary,
              textAlign: "center",
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}
          >
            TU GATO NEGRO...
          </div>

          {/* Subtitle with rust highlight */}
          <div
            style={{
              fontFamily: fonts.headingFont,
              fontSize: 78,
              fontWeight: 900,
              color: palette.accentSecondary,
              textAlign: "center",
              lineHeight: 1.05,
              textTransform: "uppercase",
              transform: `scale(${subtitleScale})`,
              marginTop: 4,
            }}
          >
            ¡NO ES 100% NEGRO!
          </div>
        </div>

        {/* VISUAL CENTERPIECE: Black Cat + Sun Ray + Rust Color Shift */}
        <div
          style={{
            position: "relative",
            width: 580,
            height: 580,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${catScale})`,
            opacity: catOpacity,
          }}
        >
          {/* Sun Illustration in top right */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              transform: `scale(${sunScale}) rotate(${frame * 0.5}deg)`,
              zIndex: 10,
            }}
          >
            <svg width="130" height="130" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="24"
                fill={palette.sunYellow}
                stroke={palette.gridAndBorders}
                strokeWidth="3"
              />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="16"
                  x2="50"
                  y2="6"
                  stroke={palette.gridAndBorders}
                  strokeWidth="4"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 50 50)`}
                />
              ))}
            </svg>
          </div>

          {/* Sun Light Beam Angle */}
          <div
            style={{
              position: "absolute",
              top: 70,
              right: 70,
              width: 320,
              height: 180,
              background: `linear-gradient(135deg, ${palette.sunYellow}40, transparent)`,
              clipPath: "polygon(0 0, 100% 0, 60% 100%, 0% 80%)",
              opacity: sunScale,
              transformOrigin: "top right",
              pointerEvents: "none",
            }}
          />

          {/* Bespoke Procedural SVG: Black Cat Sitting, Fur Rusting */}
          <svg
            width="460"
            height="460"
            viewBox="0 0 400 400"
            style={{
              filter: `drop-shadow(10px 10px 0px ${palette.gridAndBorders})`,
            }}
          >
            {/* Color interpolations for the coat */}
            <defs>
              <linearGradient id="catCoatGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={palette.blackFur} />
                <stop
                  offset={`${30 + rustFactor * 40}%`}
                  stopColor={
                    rustFactor > 0.1
                      ? interpolate(rustFactor, [0, 1], [0x18, 0xc8], {
                          extrapolateLeft: "clamp",
                        }) > 100
                        ? palette.rustColor
                        : palette.blackFur
                      : palette.blackFur
                  }
                />
                <stop
                  offset="100%"
                  stopColor={rustFactor > 0.5 ? palette.rustColor : palette.blackFur}
                />
              </linearGradient>
            </defs>

            {/* Cat Body Outline & Silhouette */}
            {/* Tail */}
            <path
              d="M 120 340 C 60 360, 40 280, 80 250 C 90 240, 105 260, 95 275 C 75 305, 95 330, 135 325 Z"
              fill={rustFactor > 0.7 ? palette.rustColor : palette.blackFur}
              stroke={palette.gridAndBorders}
              strokeWidth="5"
            />

            {/* Back & Body */}
            <path
              d="M 140 340 C 130 250, 160 170, 220 170 C 280 170, 310 250, 300 340 C 250 360, 180 360, 140 340 Z"
              fill="url(#catCoatGradient)"
              stroke={palette.gridAndBorders}
              strokeWidth="5"
            />

            {/* Sun-rusted fur highlight patch */}
            <path
              d="M 190 200 C 230 190, 260 230, 250 280 C 210 280, 180 240, 190 200 Z"
              fill={palette.rustColor}
              opacity={rustFactor * 0.9}
              stroke={palette.accentSecondary}
              strokeWidth={rustFactor > 0.5 ? "2" : "0"}
              strokeDasharray="4 4"
            />

            {/* Head */}
            <circle
              cx="220"
              cy="150"
              r="65"
              fill={palette.blackFur}
              stroke={palette.gridAndBorders}
              strokeWidth="5"
            />

            {/* Ears */}
            <polygon
              points="165,115 185,55 210,105"
              fill={palette.blackFur}
              stroke={palette.gridAndBorders}
              strokeWidth="5"
            />
            <polygon
              points="230,105 255,55 275,115"
              fill={palette.blackFur}
              stroke={palette.gridAndBorders}
              strokeWidth="5"
            />
            {/* Inner ears */}
            <polygon
              points="175,110 188,75 202,105"
              fill="#E07A5F"
              opacity="0.8"
            />
            <polygon
              points="238,105 252,75 265,110"
              fill="#E07A5F"
              opacity="0.8"
            />

            {/* Eyes (Curious glowing green) */}
            <ellipse
              cx="195"
              cy="145"
              rx="15"
              ry="18"
              fill="#52B788"
              stroke={palette.gridAndBorders}
              strokeWidth="3"
            />
            <ellipse
              cx="245"
              cy="145"
              rx="15"
              ry="18"
              fill="#52B788"
              stroke={palette.gridAndBorders}
              strokeWidth="3"
            />
            {/* Pupils */}
            <ellipse
              cx="195"
              cy="145"
              rx={4 + Math.sin(frame * 0.1) * 1.5}
              ry="14"
              fill={palette.gridAndBorders}
            />
            <ellipse
              cx="245"
              cy="145"
              rx={4 + Math.sin(frame * 0.1) * 1.5}
              ry="14"
              fill={palette.gridAndBorders}
            />
            {/* Eye glint */}
            <circle cx="192" cy="138" r="4" fill="#FFFFFF" />
            <circle cx="242" cy="138" r="4" fill="#FFFFFF" />

            {/* Nose & Mouth */}
            <polygon
              points="216,165 224,165 220,171"
              fill="#E07A5F"
            />
            <path
              d="M 220 171 Q 212 180, 205 176 M 220 171 Q 228 180, 235 176"
              fill="none"
              stroke={palette.gridAndBorders}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Whiskers */}
            <line x1="180" y1="168" x2="135" y2="160" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="180" y1="174" x2="130" y2="175" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="260" y1="168" x2="305" y2="160" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="260" y1="174" x2="310" y2="175" stroke="#FFFFFF" strokeWidth="2.5" />

            {/* Fur texture strokes on chest */}
            <path
              d="M 210 230 L 220 245 L 230 230"
              fill="none"
              stroke="#33383B"
              strokeWidth="3"
            />
          </svg>

          {/* Stamp Badge [EFECTO ÓXIDO] */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: 10,
              backgroundColor: palette.rustColor,
              color: "#FFFFFF",
              border: `3px solid ${palette.gridAndBorders}`,
              padding: "10px 24px",
              borderRadius: geometry.borderRadiusPx,
              boxShadow: geometry.hardShadow,
              transform: `scale(${stampScale}) rotate(-8deg)`,
              opacity: stampOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: fonts.monoFont,
                fontSize: 18,
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              FENÓMENO VISUAL
            </span>
            <span
              style={{
                fontFamily: fonts.headingFont,
                fontSize: 34,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              EFECTO ÓXIDO
            </span>
          </div>
        </div>

        {/* BOTTOM CALLOUT CARD (Myth / Question) */}
        <div
          style={{
            width: "100%",
            backgroundColor: palette.backgroundSecondary,
            border: `${geometry.borderWidthPx}px solid ${palette.gridAndBorders}`,
            borderRadius: geometry.borderRadiusPx,
            padding: "20px 28px",
            boxShadow: geometry.hardShadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `translateY(${mythY}px)`,
            opacity: mythOpacity,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: fonts.monoFont,
                fontSize: 22,
                fontWeight: 700,
                color: palette.accentSecondary,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              ¿METALES EN SU PELAJE?
            </div>
            <div
              style={{
                fontFamily: fonts.bodyFont,
                fontSize: 32,
                fontWeight: 700,
                color: palette.textPrimary,
                marginTop: 4,
              }}
            >
              El sol cambia su química ☀️
            </div>
          </div>

          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              backgroundColor: palette.accentHighlighter,
              border: `2px solid ${palette.gridAndBorders}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              boxShadow: geometry.hardShadowSm,
              flexShrink: 0,
            }}
          >
            🔬
          </div>
        </div>
      </div>

      {/* AUDIO TRACKS */}
      {/* SFX CHOREOGRAPHY */}
      <Audio src={staticFile("sfx/cinematic-impact.mp3")} volume={0.55} />
      <Audio src={staticFile("sfx/cat.mp3")} from={35} volume={0.5} />
      <Audio src={staticFile("sfx/simple-whoosh.mp3")} from={85} volume={0.4} />
      <Audio src={staticFile("sfx/camera-flash.mp3")} from={145} volume={0.5} />
      <Audio src={staticFile("sfx/pop.mp3")} from={210} volume={0.45} />

      {/* Narration Voiceover */}
      <Audio src={staticFile("assets/gatos-oxidados/act1.wav")} volume={1} />
    </AbsoluteFill>
  );
};
