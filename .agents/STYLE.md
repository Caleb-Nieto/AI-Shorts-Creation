# STYLE.md — Estandarización Visual y Consumo de `docs/style.json`

Todo el aspecto visual del video (paleta, texturas, bordes, tipografías y físicas) está gobernado por `docs/style.json`. Ninguna escena puede definir colores ni fuentes fuera de este archivo.

---

## 1. Mapeo de `docs/style.json` a las Representaciones Visuales
Importa siempre `style` desde `docs/style.json`:

- **Lienzo y Variación de Atmósfera:**
  - Escenas de contexto general: Fondo `style.palette.backgroundPrimary` (`#F1F3F5`).
  - Escenas de inmersión en un estudio histórico o contraste: Fondo `style.palette.backgroundSecondary` (`#D1DBE0`).
  - Ambos fondos aplican siempre el grano de papel (`style.textures.paperGrainOpacity`: `0.12`) y la viñeta (`style.textures.vignetteIntensity`: `0.25`).
- **Codificación Semántica de Colores (Para Comparaciones y Experimentos):**
  - Cuando representes dos variables enfrentadas (Grupo A vs. Grupo B, Mito vs. Evidencia, Postura 1 vs. Postura 2):
    - Sujeto / Variable Principal: `style.palette.accentPrimary` (`#456B77`).
    - Sujeto de Control / Variable Secundaria: `style.palette.accentSecondary` (`#7C9199`).
    - Énfasis, trazos de atención, cursores y hallazgos clave: `style.palette.accentHighlighter` (`#A38580`).
    - Estructura de diagramas, túneles, grillas y conectores: `style.palette.gridAndBorders` (`#A6B4BC`).
- **Jerarquía Tipográfica (`@remotion/google-fonts`):**
  - `style.typography.headingFont` (`Cormorant Garamond`): Para el Hook inicial, conceptos centrales, paradojas y la pregunta final.
  - `style.typography.bodyFont` (`Lora`): Para etiquetas explicativas breves, nombres de investigadores y citas de diarios o documentos.
  - `style.typography.monoFont` (`Courier Prime`): Obligatoria para encabezados de tiempo/lugar (`Nueva York • 2022`), rodillos numéricos (`100x`), escalas métricas (`0.1 mm`) y numeración de nodos.
- **Geometría y Recortes (`geometry`):**
  - Los elementos ilustrados (`<CutoutImage />`) y las tarjetas de datos aplican `borderRadiusPx` (`8px`), contorno de recorte `cutoutOutlinePx` (`2px`) en `cutoutOutlineColor` (`#3A444C`) y sombra `hardShadow`.
- **Físicas de Movimiento (`motionPresets`):**
  - `snappy`: Aparición de etiquetas, líneas de diagramas, tachados y contadores.
  - `bouncy`: Entrada de sujetos recortados, nodos ganadores y sellos de desmitificación.
  - `smoothCamera`: Viajes de cámara entre nodos de un diagrama o descensos de escala.

---

## 2. Formato Estricto para Generación de Imágenes
Cada vez que necesites generar una imagen para un sujeto del video (ej. un elefante, un papiro, una pirámide, un instrumento científico)