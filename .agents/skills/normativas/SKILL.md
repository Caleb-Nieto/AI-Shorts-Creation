# Skill: Normativas Visuales, Carga Cognitiva, Retención y Reactividad en Remotion Vertical

Usa esta skill para diseñar, diagramar y auditar la puesta en escena, el manejo de ecosistemas SVG, el control de carga cognitiva y la ingeniería de retención en composiciones verticales de Remotion ($1080 \times 1920$ px, relación de aspecto 9:16, **60fps**) destinadas a plataformas de consumo rápido (TikTok, Instagram Reels, YouTube Shorts).

---

## 1. NORMATIVA TÉCNICA DEL CANVAS ($1080 \times 1920$) Y ZONAS SEGURAS

En video vertical para móviles, hasta el $35\%$ de la pantalla está cubierto por las interfaces nativas de las aplicaciones (UI overlays). Cualquier elemento crítico fuera del área activa sufrirá tapado o descarte por parte del usuario.

### 1.1 Matriz de Zonas Seguras (Safe Zones)

```
0px    +-------------------------------------------------------+
       | [ZONA DE PELIGRO SUPERIOR: 0px - 220px]               |
       | Pestañas (Para ti/Siguiendo), buscador, cámara        |
220px  +-------------------------------------------------------+
       |                                      |                |
       |                                      | [ZONA PELIGRO  |
       |         CANVAS SEGURO ÚTIL           |  LATERAL DER.] |
       |                                      | Iconos nativos |
       |         Ancho: 860px                 | Like, Compartir|
       |         Alto: 1320px                 | Guardar, Perfil|
       |                                      |                |
       |                                      | Margen: 140px  |
       |                                      |                |
1540px +-------------------------------------------------------+
       | [ZONA DE PELIGRO INFERIOR: 1540px - 1920px]           |
       | Nombre de cuenta, caption colapsable, audio, barra UI |
1920px +-------------------------------------------------------+
       0px                                    940px       1080px
```

* **Límites Absolutos del Contenedor Activo:**
  * `top`: Mínimo `220px` (óptimo para librar cabeceras de "Live" y "Search").
  * `bottom`: Mínimo `380px` (1540px en Y; cubre descripciones largas y barra de progreso).
  * `left`: `80px` (margen de respiro visual).
  * `right`: `140px` (reserva para la columna vertical de interacción).
* **Centro de Gravedad Visual:**
  * El centro geométrico es $y = 960\text{px}$, pero el **centro de atención ergonómico** en móviles se sitúa en $y = 860\text{px} \dots 900\text{px}$. Coloca aquí el corazón del sistema visual o experimento SVG para evitar que el pulgar del usuario lo tape.

---

## 2. ARQUITECTURA DE CARGA COGNITIVA Y COMPOSICIÓN MULTI-SVG

Un video explicativo de alta retención requiere **riqueza visual en sus ilustraciones vectoriales**, pero **simplicidad absoluta en su lectura**. Para no saturar la pantalla sin limitar la complejidad de las animaciones SVG, aplica siempre la distinción entre **Sistemas Visuales SVG** y **Bloques de Información Independientes**.

### 2.1 Diferenciación Crítica: Ecosistema SVG vs. Bloques Cognitivos
* **Libertad Multi-SVG (Apoyo Visual Compuesto):** **SÍ puede y debe haber múltiples figuras SVG en pantalla simultáneamente** cuando formen parte de una misma representación mecánica, escena o metáfora visual. Ejemplos permitidos y fomentados:
  * *Comparaciones de escala o grupos:* 3 o más sujetos vectoriales comparados lado a lado (ej. tamaños de sondas, planetas, órganos o herramientas).
  * *Sistemas e interacciones mecánicas:* Un emisor disparando partículas hacia un núcleo atómico, un cohete separando etapas, o un mapa con múltiples nodos y rutas conectadas.
  * *Matrices de proporción:* Múltiples iconos o figuras repetidas en rejilla para ilustrar magnitudes estadísticas (ej. iluminar 1 figura entre decenas para representar `1 de cada 8.000`).
* **Restricción de Bloques Cognitivos Independientes (Regla del 1 + 2):** Lo que **NUNCA** debe acumularse son conceptos desconectados o textos compitiendo entre sí. En cualquier frame dado, la pantalla solo puede contener un máximo de **3 unidades cognitivas**:
  1. **1 Escenario o Sistema Visual Principal (Protagonista):** El conjunto o ecosistema de figuras SVG que ejecutan la acción o experimento actual.
  2. **1 Ancla de Contexto / Ubicación:** Un encabezado breve, etiqueta temporal/espacial (ej. `Manchester • 1909`) o título de sección.
  3. **1 Dato de Impacto o Conclusión:** Una magnitud numérica (`1 de cada 8.000`) o flecha de conclusión corta (`→ casi vacío`).

### 2.2 Coreografía para Escenas con Múltiples Figuras SVG
Cuando una escena requiera 2 o más figuras SVG en pantalla, evita el caos visual aplicando estas 4 reglas de composición:
1. **Foco Selectivo (Spotlight entre SVGs):** Si hay varias figuras SVG presentes (ej. 3 objetos comparados o 4 partes de una máquina), no animes todas de forma caótica al mismo tiempo. Aplica el impulso principal (`snappy` o `bouncy`) y el 100% de contraste a la figura exacta que el narrador está mencionando según `timestamps.json`, mientras las demás figuras del grupo permanecen en reposo relativo o con opacidad secundaria (`40% - 70%`) hasta que les toque actuar.
2. **Aparición Escalonada (Staggered Entrance):** Cuando entren múltiples figuras SVG de apoyo, prográmalas con un desfase secuencial (`stagger` de `4 a 10 frames` a 60fps) o sincronizadas una a una con las palabras del locutor, nunca como un bloque estático repentino.
3. **Zonas de Exclusión Texto-Vector:** Ninguna etiqueta de texto, contador numérico o badge puede superponerse de forma accidental sobre las caras, centros de acción o líneas críticas de las figuras SVG. Asigna franjas dedicadas (ej. tercio superior del área segura para contexto, centro para el sistema SVG, tercio inferior del área segura para conclusiones o magnitudes).
4. **Ciclo de Vida FIFO entre Conceptos (First-In, First-Out):** Dentro de una misma idea, puedes añadir figuras SVG para completar el diagrama o experimento. Sin embargo, **cuando el narrador cambia de idea o pasa al siguiente punto lógico**, el sistema visual anterior debe:
   * **Reemplazarse:** Salir de escena (por escala, opacidad o barrido de cámara) antes de que entre el nuevo sistema SVG.
   * **Colapsarse en Ancla:** Reducir su escala (`scale: 0.35`) y moverse a un extremo si sigue siendo necesario como referencia para la siguiente comparación.

### 2.3 Presupuesto de Texto y Espacio de Respiro
* **Prohibición de Karaoke y Muros de Texto:** Nunca muestres subtítulos completos de la locución. El total de palabras simultáneas en pantalla (sumando etiquetas, fechas y flechas de conclusión) **no debe superar las 12 a 15 palabras**.
* **Espacio de Respiro (Negative Space):** Aunque existan múltiples figuras SVG en escena, agrupa y dimensiona los vectores para que al menos el **35% - 40% del área segura** conserve el fondo limpio (textura de papel/acuarela de `style.json`), permitiendo que las siluetas vectoriales se distingan con nitidez inmediata.

---

## 3. SISTEMA DE ESCALA Y JERARQUÍA TIPOGRÁFICA MÓVIL

La visualización en pantallas de $6.1''$ a $6.7''$ exige grosores altos y tamaños mínimos estrictos para evitar fatiga cognitiva.

### 3.1 Tokens de Tipografía en Remotion

| Elemento | Tamaño Fuente | Peso (`fontWeight`) | Altura de Línea (`lineHeight`) | Regla de Oro |
| :--- | :--- | :--- | :--- | :--- |
| **Hook / Palabra Clave** | `68px - 84px` | `800` o `900` | `1.05 - 1.15` | Máximo 3 líneas. Jamás ocupar más del 70% del ancho seguro. |
| **Números de Impacto / Odómetro** | `96px - 140px` | `700` (Mono) | `1.0` | Siempre acompañados de unidad o contexto (`%`, `x`, `km`, `1 de cada X`). |
| **Titulares Secundarios / Preguntas** | `44px - 52px` | `700` | `1.2` | Frases cortas de lectura inmediata (< 1.2 segundos). |
| **Etiquetas de Diagrama / Fechas** | `32px - 38px` | `600` | `1.25` | Con contenedor tipo píldora (`badge`) o flecha de conclusión clara. |
| **Metadatos / Citas / Fuentes** | `24px - 28px` | `500` (Mono) | `1.3` | **Límite inferior absoluto.** Menor a `24px` es ilegible en móvil. |

### 3.2 Reglas de Legibilidad y Aislamiento
* **Longitud Máxima de Línea:** Entre 18 y 28 caracteres por línea en titulares.
* **Prohibición de Palabras Huérfanas:** Aplica `textWrap: "balance"` o controla los saltos de línea manualmente.
* **Contraste sobre Vectores:** Si una etiqueta debe cruzar cerca de una ruta o ilustración SVG, envuélvela en un badge sólido o semitransparente con `backdropFilter: "blur(12px)"` y `padding: "12px 24px"` para no perder legibilidad.

---

## 4. DIMENSIONAMIENTO DE ELEMENTOS GRÁFICOS Y SVG BESPOKE

* **Jerarquía de Trazos (`strokeWidth`):**
  * Contornos principales de sujetos SVG y rutas causales: `6px` a `12px`.
  * Detalles internos, despieces mecánicos o órbitas secundarias: `3px` a `5px`.
  * Rejillas de fondo o guías de medición: `1.5px` a `2.5px` con opacidad reducida (`0.2 - 0.4`).
  * Terminaciones de flecha (`marker-end` o polígonos): mínimo `18px` de envergadura.
* **Dimensionamiento de Figuras SVG en Grupo:**
  * **Sujeto Único Central:** Puede ocupar entre `450px` y `700px` de ancho/alto dentro del canvas seguro.
  * **Comparación Dual (2 SVGs):** Cada figura en un contenedor de `360px - 400px` de ancho (lado a lado) o apiladas verticalmente con `60px` de separación mínima.
  * **Conjunto o Sistema (3 a 6 SVGs):** Organizados en composición radial, flujo secuencial o grilla limpia, garantizando al menos `32px` de separación entre figuras para evitar tangencias visuales confusas.
  * **Enjambres o Matrices Estadísticas (10+ SVGs):** Usa formas geométricas simplificadas e icónicas de `24px` a `48px` en grillas uniformes, destacando con color de acento y escala (`1.3x`) únicamente el elemento clave del experimento.

---

## 5. PSICOLOGÍA DE RETENCIÓN: LA INGENIERÍA ANTI-SWIPE (A 60 FPS)

La retención depende de sincronizar estímulos visuales y sonoros con los picos de desconexión atencional del cerebro humano.

```
       100% +====\
            |     \ (Abandono crítico si no hay impacto visual en 0-3s)
            |      \
 RETENCIÓN  |       +====================\ (Micro-gancho: abre loop)
            |                             \
            |                              +===================== (Bucle)
         0% +----------------------------------------------------+
            0s    3s                     20s                    60s
```

### 5.1 La Regla de los 2.0 Segundos (120 Frames a 60fps)
El cerebro evalúa cada 2 segundos si seguir viendo o deslizar. Ninguna composición debe permanecer estática por más de **120 frames (a 60fps)**. Si una explicación dura más de 2 segundos sobre el mismo sistema SVG, aplica uno de estos 4 micro-resets sincronizados con `timestamps.json` y `<Sfx />`:

1. **Activación Interna del SVG (Despiece o Acción Mecánica):** Una pieza del SVG rota, emite un pulso, dispara una partícula o cambia de estado.
2. **Cambio de Foco entre Figuras (Focus Shift):** En una escena con varios SVGs, el foco (`opacity: 1`, `scale: 1.08`) salta de la Figura A a la Figura B al ritmo de la voz.
3. **Encuadre de Cámara Virtual (`smoothCamera`):** En vez de meter más elementos, la cámara hace un *punch-in* (`scale: 1 -> 1.18`) o un paneo suave hacia un detalle específico del SVG (ej. acercarse del aparato completo al núcleo atómico).
4. **Aparición de Conclusión Causal:** Se traza una flecha conectora rápida o se estampa una etiqueta de conclusión (`→ resultado`) con sonido `pop.mp3` o `cinematic-impact.mp3`.

---

## 6. CATÁLOGO DE CLIFFHANGERS Y OPEN LOOPS VISUALES

Un *open loop* debe materializarse visualmente en los vectores de la pantalla, no solo en la locución.

### 6.1 Ganchos Visuales de Apertura (Segundos 0 a 3 / Frames 0 a 180)
* **La Incógnita en el Sistema:** Muestra la comparación o el experimento SVG donde el elemento clave está silueteado, bloqueado o con un signo `(?)` reactivo que recién se revelará más adelante.
* **La Asimetría Extrema:** Presenta visualmente un contraste desproporcionado entre dos figuras SVG (ej. un objeto diminuto frente a uno colosal, o un contador disparándose frente a otro inmóvil).
* **El Experimento en Punto Crítico:** Inicia con el mecanismo SVG a un instante de colisionar o activarse, congelando o ralentizando la acción mientras se plantea la premisa histórica o científica.

### 6.2 Micro-Cliffhangers Intermedios (Entre Actos)
* **Tachado de Mito / Falsa Hipótesis:** Se dibuja la creencia común mediante SVGs simples y, cuando el narrador la desmiente, un trazo o sello contundente la tacha o fragmenta con un sonido seco (`cinematic-impact.mp3` o `camera-flash.mp3`), dando paso al mecanismo real.
* **Cambio de Escala Radical (Zoom Macro/Micro):** Cuando una explicación parece terminar a nivel humano, la cámara hace un zoom continuo hacia el interior del SVG para revelar una capa microscópica o astronómica oculta.

### 6.3 Continuidad y Cierre
* Diseña la resolución del último acto para que la composición visual y la cadencia narrativa cierren con contundencia o conecten visualmente con el encuadre del frame `0`, favoreciendo la repetición (*loop*).

---

## 7. HELPERS DE FÍSICA, FOCO MULTI-SVG Y CICLO DE VIDA (60 FPS)

Alinea todas las animaciones con las curvas definidas en `docs/style.json` (`snappy`, `bouncy`, `smoothCamera`) y utiliza estos patrones para controlar múltiples SVGs sin sobrecargar la escena:

```tsx
import { interpolate, spring } from "remotion";

// 1. Curvas Físicas Base (Alineadas a 60fps y style.json)
export const springSnappy = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 220 },
  });

export const springBouncy = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, mass: 0.8, stiffness: 180 },
  });

export const smoothCamera = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 26, mass: 1.4, stiffness: 75 },
  });

// 2. Spotlight para Escenas con Múltiples Figuras SVG
// Permite tener N figuras SVG en pantalla destacando la que habla el narrador sin borrar el contexto
export const getSvgFocusStyle = (
  frame: number,
  fps: number,
  isFocused: boolean,
  focusStartFrame: number,
  dimmedOpacity = 0.45
) => {
  const progress = smoothCamera(frame, fps, focusStartFrame);
  const scale = isFocused
    ? interpolate(progress, [0, 1], [1, 1.08])
    : interpolate(progress, [0, 1], [1, 0.94]);
  const opacity = isFocused
    ? interpolate(progress, [0, 1], [dimmedOpacity, 1])
    : interpolate(progress, [0, 1], [1, dimmedOpacity]);

  return {
    transform: `scale(${scale})`,
    opacity,
  };
};

// 3. Ciclo de Vida FIFO para Limpieza de Sistemas/Conceptos (Entrada -> Activo -> Salida Limpia)
export const getSystemLifecycle = (
  frame: number,
  fps: number,
  enterFrame: number,
  exitFrame: number
) => {
  const enter = springSnappy(frame, fps, enterFrame);
  const exit = smoothCamera(frame, fps, exitFrame);

  const isVisible = frame >= enterFrame && frame <= exitFrame + 30;
  const opacity = interpolate(enter, [0, 1], [0, 1]) * interpolate(exit, [0, 1], [1, 0]);
  const scale = interpolate(enter, [0, 1], [0.88, 1]) * interpolate(exit, [0, 1], [1, 0.92]);
  const translateY = interpolate(enter, [0, 1], [36, 0]) + interpolate(exit, [0, 1], [0, -36]);

  return {
    isVisible,
    style: {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
    },
  };
};

// 4. Shake Reactivo de Impacto (Calibrado a 60fps: ~14 frames de duración)
export const getImpactShake = (frame: number, impactFrame: number, intensity = 12): number => {
  const diff = frame - impactFrame;
  if (diff < 0 || diff > 14) return 0;
  const decay = Math.exp(-diff * 0.28);
  return Math.sin(diff * 1.8) * intensity * decay;
};
```

---

## 8. MATRIZ DE AUDITORÍA ANTES DE EXPORTAR (CHECKLIST REACTIVO)

Antes de dar por finalizada una composición en Remotion, verifica cada escena contra esta lista:

- [ ] **Respeto de Zonas Seguras:** ¿Todos los textos, fechas y partes críticas de los SVGs están dentro de `Y: 220px - 1540px` y `X: 80px - 940px`?
- [ ] **Riqueza SVG sin Caos Cognitivo:** Si hay múltiples figuras SVG en escena, ¿forman parte de un mismo experimento/comparación coherente y tienen jerarquía de foco clara?
- [ ] **Cero Colisión Texto-Vector:** ¿Las etiquetas (`Manchester • 1909`), magnitudes (`1 de cada 8.000`) y flechas tienen su propio espacio limpio sin tapar el dibujo principal?
- [ ] **Limpieza FIFO entre Ideas:** ¿Desaparecen o se archivan los diagramas del punto anterior antes de dibujar un concepto nuevo?
- [ ] **Límite de 2.0 Segundos (120 Frames a 60fps):** ¿Hay algún lapso mayor a 120 frames sin una acción mecánica en el SVG, cambio de foco, movimiento de cámara o aparición de etiqueta?
- [ ] **Sincronización con `timestamps.json` y `<Sfx />`:** ¿Cada entrada escalonada de SVG, contador o conclusión dispara su efecto de sonido exacto desde `fx-sounds/`?