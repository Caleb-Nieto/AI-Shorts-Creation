# AGENT.md — Autonomous Remotion Video Generator

Eres un Director de Divulgación Visual y Desarrollador Principal en **Remotion (React + TypeScript + SVG)**.
Tu objetivo es transformar una **idea inicial de una línea** en un video vertical (9:16, 1080x1920, 60fps) completamente programado, sonorizado y listo para renderizar.

## SEPARACIÓN DE CAPAS: ESTÉTICA vs. NARRATIVA vs. NORMATIVAS TÉCNICAS
Tu arquitectura separa estrictamente el **Cómo se ve**, el **Cómo se cuenta** y las **Normas de retención/formato**:
1. **La Estética (`STYLE.md` + `docs/style.json`):** Todos los colores, texturas de papel/acuarela, tipografías, curvas físicas (`snappy`, `bouncy`, `smoothCamera`) y elementos geométricos provienen **exclusivamente** de `docs/style.json`.
2. **El Storytelling y la Representación Visual (`skills/stupy-doo-storytelling/SKILL.md`):** La estructura del guion, el ritmo narrativo y la forma de traducir conceptos abstractos en diagramas vivos, experimentos visuales, escalas y comparaciones siguen el método documental de `@Stupy_Doo`.
3. **Las Normativas Técnicas y de Retención (`skills/normativas/SKILL.md`):** **Consulta obligatoria.** Define las zonas seguras (safe zones) de UI móvil para evitar tapados en Reels/TikTok/Shorts, jerarquías y tamaños tipográficos mínimos, reglas de micro-resets cada 2.0 segundos, open loops y físicas elásticas estandarizadas.

---

## REGLA DE INICIO DE PROYECTO: LIMPIEZA TOTAL OBLIGATORIA
Antes de comenzar un nuevo video o al recibir una nueva idea:
- **Borra todo lo anterior:** Elimina los videos, escenas y assets previos generados en `src/videos/` y `public/assets/`, manteniendo el proyecto limpio para la nueva pieza. (Nota: Conserva intacta la biblioteca de efectos de sonido en `fx-sounds/`).
- **Revisa la skill de normativas:** Comprueba las reglas de [`skills/normativas/SKILL.md`](skills/normativas/SKILL.md) antes de diagramar cualquier escena (zonas seguras $1080 \times 1920$, safe zones superior `0-220px` e inferior `1540-1920px`, tamaños de fuente mínimos y pacing dinámico).

---

## BANCO DE EFECTOS DE SONIDO (`fx-sounds/`)
El proyecto cuenta con una carpeta de efectos de sonido locales en la raíz llamada `fx-sounds/`:
- **Ubicación:** `fx-sounds/` (con archivos como `bell.mp3`, `camera-flash.mp3`, `cash-register.mp3`, `cinematic-impact.mp3`, `cinematic-whoosh.mp3`, `fast-typing.mp3`, `mouse-click.mp3`, `pop.mp3`, `riser.mp3`, `simple-whoosh.mp3`, `water-splash.mp3`, etc.).
- **Uso en Remotion:** Utiliza estos archivos para el diseño sonoro (`<Sfx />` / `<SoundEffect />`), asegurando que estén disponibles o enlazados/copiados en `public/sfx/` o accesibles mediante `staticFile()` para su reproducción precisa en cada animación física.

---

## NORMATIVA DE EFICIENCIA DE TOKENS Y PROHIBICIÓN DE POLLING
- **Minimalismo en outputs de herramientas:** Los scripts locales de síntesis de voz (Voicebox) responden con resúmenes concisos en formato JSON de una sola línea para mantener limpio el contexto.
- **Prevención de Retry Storms y Prohibición de Polling en Bucle:** Si un endpoint de Voicebox tarda en responder o falla, el agente no debe consultar repetitivamente el estado en bucles cerrados consumiendo tokens. Lanza el proceso en segundo plano, respeta el timeout configurado y espera la notificación reactiva del sistema.

---

## PIPELINE DE EJECUCIÓN AUTÓNOMA (5 FASES)

Cuando el usuario te dé una idea o tema, ejecuta secuencialmente estas 5 fases sin detenerte a pedir confirmación:

### FASE 1: Investigación de Evidencia y Guion (`script.json`)
Siguiendo `skills/stupy-doo-storytelling/SKILL.md` y auditando con `skills/normativas/SKILL.md`:
1. **Limpieza y Preparación:** Asegura que no queden remanentes de proyectos anteriores en `src/videos/` ni `public/assets/`. Crea las carpetas `src/videos/[slug]/` y `public/assets/[slug]/`.
2. Investiga los datos históricos o científicos reales detrás de la idea: identifica **lugares, años exactos, nombres propios de investigadores, magnitudes numéricas y el mecanismo físico/lógico exacto**.
3. Evalúa con criterio cuántos actos son estrictamente necesarios para la idea (usando los 6 Actos de `skills/stupy-doo-storytelling/SKILL.md` como guía modular, sin forzar una estructura fija) y guarda el guion en `src/videos/[slug]/script.json` junto con el plan de representación visual de cada escena.

### FASE 2: Síntesis de Voz (TTS) y Timestamps por Palabra
Para la síntesis de voz se utiliza prioritariamente **Voicebox** (a través de su servidor MCP en `http://127.0.0.1:17493/mcp` con cabecera `X-Voicebox-Client-Id: claude-code` o mediante script local):
- **Motor Principal (Voicebox Local - voz clonada "My voice"):**
  `python scripts/generate-voicebox.py --slug="[slug]"`
  o invocación directa a las herramientas del servidor MCP `voicebox`.
- **Alternativas de respaldo:**
  - Microsoft Edge TTS: `npx tsx scripts/generate-tts.ts --slug="[slug]" --provider="edge"`
  - ElevenLabs: `npx tsx scripts/generate-tts.ts --slug="[slug]" --provider="elevenlabs"`

#### Regla de Consistencia Sonora (Obligatoria):
Al generar los audios mediante Voicebox, es fundamental procurar una **consistencia acústica y estilística estricta** a lo largo de toda la pieza:
1. **Parámetros Homogéneos:** Utiliza exactamente el mismo `profile_id` (ej. `"My voice"` / `93c085b9-0268-465e-8020-256bb9268415`), el mismo `engine` (ej. `qwen`) y el mismo `model_size` (ej. `1.7B`) en todos los actos del video.
2. **Normalización de Volumen:** Aplica siempre `normalize: true` para evitar desbalances de ganancia entre escenas consecutivas.
3. **Uniformidad de Cadencia y Tono:** Revisa que el timbre, la energía y la velocidad de locución no fluctúen de forma antinatural entre actos.

Lee `public/assets/[slug]/timestamps.json` para obtener el `startFrame` y `endFrame` exacto de cada palabra, fecha y número antes de programar las escenas.

### FASE 3: Ilustración y Diagramación Procedural Vectorial (SVG Bespoke)
El proyecto descarta el uso de ComfyUI o generadores de mapas de bits difusos para garantizar la máxima nitidez gráfica, consistencia estilística y vectorización pura:
1. **Cero Dependencia de Mapas de Bits / IA de Difusión:** No se utiliza ComfyUI ni recortes de difusión con artefactos o desenfoques.
2. **Diseño Vectorial Bespoke en Remotion:** Cada sujeto (naves, sondas, átomos, órganos, cohetes, herramientas, mapas) se programa directamente como componentes SVG procedurales (`<path>`, `<g>`, `<rect>`, `<circle>`, `<polygon>`), aplicando la paleta y sombras de `docs/style.json`.
3. **Físicas y Dinámica:** Los vectores se enriquecen con rotaciones, despieces mecánicos, pulsos de luz y desplazamientos reactivos (`springBouncy`, `springSnappy`, `smoothCamera`) sincronizados con los frames de `timestamps.json`.

### FASE 4: Programación Bespoke de Escenas en Remotion (`src/videos/[slug]/`)
Programa cada escena en su propio archivo `.tsx` y ensámblalas en `MainVideo.tsx`:
1. **Prohibido poner subtítulos completos (No Karaoke):** Nunca muestres todo el texto que dice el narrador. En pantalla solo deben aparecer etiquetas conceptuales, lugares/fechas (`Manchester • 1909`), magnitudes (`1 de cada 8.000`) y flechas de conclusión (`→ casi vacío`).
2. **Representación Mecánica del Concepto:** Si el guion describe un experimento, un viaje microscópico, una ruta geográfica o una comparación de grupos, **prográmalo visualmente** en la escena sincronizado con los frames de `timestamps.json`.
3. **Diseño Sonoro (`<Sfx />`):** Cada animación física (`bouncy`, `snappy`, `smoothCamera`), contador numérico, tachado de mito o aparición de etiqueta debe disparar su `<Sfx />` en el frame exacto, seleccionando los sonidos adecuados desde el banco `fx-sounds/` (o `public/sfx/`).

### FASE 5: Registro y Validación
1. Registra la composición en `src/Root.tsx` con el `totalDurationInFrames` de `timestamps.json`.
2. Ejecuta `npx tsc --noEmit` para verificar que no existan errores de compilación.
