# Skill: Normativas Visuales, Retención y Reactividad en Remotion Vertical

Usa esta skill para diseñar y auditar la puesta en escena, dimensionamiento técnico de elementos y la ingeniería de retención en composiciones verticales de Remotion ($1080 \times 1920$ px, relación de aspecto 9:16) destinadas a plataformas de consumo rápido (TikTok, Instagram Reels, YouTube Shorts).

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
       |         CANVAS SEGURO ÚTIL           |  LATERAL DIR.] |
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
  * `top`: Mínimo `220px` (óptimo para librar "Live" y "Search").
  * `bottom`: Mínimo `380px` (cubre descripciones largas de Reels y TikTok).
  * `left`: `80px` (margen de respiro visual).
  * `right`: `140px` (reserva para la columna vertical de interacción).
* **Centro de Gravedad Visual:**
  * El centro geométrico es $y = 960\text{px}$, pero el **centro de atención ergonómico** en móviles se sitúa en $y = 860\text{px} \dots 900\text{px}$. Coloca aquí el foco de la acción visual para evitar que el pulgar del usuario lo tape.

---

## 2. SISTEMA DE ESCALA Y JERARQUÍA TIPOGRÁFICA MÓVIL

La visualización en pantallas de $6.1''$ a $6.7''$ exige grosores altos y tamaños mínimos estrictos para evitar fatiga cognitiva.

### 2.1 Tokens de Tipografía en Remotion

| Elemento | Tamaño Fuente | Peso (`fontWeight`) | Altura de Línea (`lineHeight`) | Regla de Oro |
| :--- | :--- | :--- | :--- | :--- |
| **Hook / Palabra Clave** | `68px - 84px` | `800` o `900` | `1.05 - 1.15` | Máximo 3 líneas. Jamás ocupar más del 70% del ancho seguro. |
| **Números de Impacto / Odómetro** | `100px - 144px` | `700` (Mono) | `1.0` | Siempre acompañados de sufijo visible (`%`, `x`, `ms`, `kg`). |
| **Titulares Secundarios / Preguntas** | `44px - 52px` | `700` | `1.2` | Frases cortas de lectura inmediata (< 1.2 segundos). |
| **Etiquetas de Diagrama / Datos** | `32px - 38px` | `600` | `1.25` | Con fondo tipo píldora (`badge`) para garantizar contraste. |
| **Metadatos / Citas / Fuentes** | `24px - 28px` | `500` (Mono) | `1.3` | **Límite inferior absoluto.** Menor a `24px` es ilegible. |

### 2.2 Reglas de Legibilidad y Texto Reactivo
* **Longitud Máxima de Línea:** Entre 18 y 28 caracteres por línea en titulares. Evita líneas largas de borde a borde.
* **Prohibición de Palabras Huérfanas:** Aplica `textWrap: "balance"` en los estilos CSS o formatea manualmente saltos de línea con `\n`.
* **Aislamiento de Fondo (Scrim Layer):** Todo texto montado sobre fondos dinámicos o animaciones complejas debe llevar:
  * O bien `textShadow: "0 4px 24px rgba(0,0,0,0.85)"`.
  * O bien un contenedor con `backgroundColor: "rgba(10, 10, 15, 0.75)"` y `backdropFilter: "blur(16px)"` con `borderRadius: "16px"`.

---

## 3. DIMENSIONAMIENTO DE ELEMENTOS GRÁFICOS Y SVG

* **Líneas y Flechas Conectoras:** 
  * Rutas principales / causales: grosor de `8px` a `12px`.
  * Guías secundarias o rejillas: grosor de `3px` a `5px`.
  * Terminaciones de flecha (`marker-end`): nunca menores a `18px` de envergadura.
* **Nodos y Fichas Circulares:**
  * Diámetro base: mínimo `64px` si llevan numeración interna (`01`, `A`, etc.).
  * Si el nodo debe contener iconos o palabras cortas: mínimo `96px` de ancho.
* **Márgenes de Respiración Interna (`padding`):**
  * Toda tarjeta (`Card`) o contenedor interactivo debe tener un padding mínimo de `24px` horizontal y `20px` vertical para que los bordes no asfixien los datos internos.

---

## 4. PSICOLOGÍA DE RETENCIÓN: LA INGENIERÍA ANTI-SWIPE

La retención no depende de "decorar" el video, sino de sincronizar estímulos visuales con los picos de desconexión atencional del cerebro humano.

```
       100% +====\
            |     \ (Abandono crítico si no hay impacto visual)
            |      \
 RETENCIÓN  |       +====================\ (Micro-gancho: abre loop)
            |                             \
            |                              +===================== (Bucle)
         0% +----------------------------------------------------+
            0s    3s                     20s                    60s
```

### 4.1 La Regla de los 2.0 Segundos (Micro-Resets Visuales)
El cerebro en redes sociales evalúa cada 2 segundos si seguir viendo o deslizar. Ninguna composición debe permanecer en reposo absoluto por más de **60 frames (a 30 fps)**. Si el mensaje hablado dura más de 2 segundos, aplica uno de estos 4 micro-resets:

1. **Micro Punch-In:** Zoom de cámara ligero mediante interpolación:
   ```tsx
   const scale = interpolate(frame, [0, 60], [1, 1.05], {
     extrapolateRight: "clamp",
   });
   ```
2. **Resaltado Cinético:** Un término o nodo se enciende con `accentPrimary` acompañado de una escala momentánea (`1.0 -> 1.15 -> 1.0`) usando un `spring` de rebote.
3. **Despliegue de Información Subordinada:** Aparece una línea conectora o un sello aclaratorio que expande el gráfico original.
4. **Barrido de Atención (Focus Shift):** Se reduce la opacidad del elemento anterior al `30%` mientras el nuevo elemento pasa al `100%`.

---

## 5. CATÁLOGO DE CLIFFHANGERS Y OPEN LOOPS PARA VIDEO REACTIVO

Un *open loop* es una pregunta o promesa que el cerebro no puede dejar incompleta. En Remotion, estos loops deben materializarse visualmente en pantalla, no solo en la voz.

### 5.1 Ganchos Visuales de Apertura (Segundos 0 a 3)
* **El Elemento Censurado / Silueteado:** Muestra el resultado final o la prueba física cubierta con una máscara de desenfoque (`filter: blur(24px)`) y una etiqueta `[REVELACIÓN EN 0:30]`. Despertará la necesidad de llegar al desenlace.
* **El Contador Inverso / Tensión Temporal:** Coloca en una esquina superior un cronómetro descendente o una barra de vaciado rápido que marque el momento del experimento o resolución.
* **El Split Desbalanceado:** Divide la pantalla en dos mitades donde una opción tiene un valor ridículamente alto frente a otra (`99% vs 1%`), obligando al usuario a esperar la explicación de la asimetría.

### 5.2 Micro-Cliffhangers Intermedios (Entre Escenas / Actos)
Inserta estos resortes justo antes de los puntos naturales de caída de retención (segundos 12-15 y 28-32):
* **Falso Final con Desvío:** La animación parece concluir una idea y un elemento visual colapsa, pero un sello de advertencia irrumpe en pantalla cortando la animación: *"Pero esto solo funciona si ignoramos el siguiente dato..."*.
* **El Sello de Incoherencia:** Cuando el narrador señale un error o paradoja, estampa una tarjeta roja de `[ERROR DE MEDICIÓN]` o `[PARADOJA]` con sonido de bloqueo seco, congelando el flujo por 10 frames antes de reactivarlo.
* **El Eslabón Faltante:** Muestra un diagrama de 3 pasos donde el Paso 2 es un bloque vacío con signo de interrogación `(?)` palpitante, que solo se llena tras explicar la teoría.

### 5.3 El Bucle Sin Costuras (Seamless Loop)
Para forzar visualizaciones repetidas ($>100\%$ de retención promedio):
* **Continuidad de Cámara:** Haz que la última transición del video sea un zoom rápido hacia un objeto (ej. la pantalla de un teléfono o un círculo negro central) que tenga la misma escala y posición exacta que el primer frame del video.
* **Enlace Semántico de Audio:** El guion debe terminar en una conjunción o frase incompleta que se cierre gramaticalmente con la primera frase del hook:
  * *Último segundo:* *"Y esta es exactamente la razón por la que..."*
  * *Primer segundo:* *"...tu cerebro te engaña al ver este color."*

---

## 6. SISTEMAS DE FÍSICA Y ANIMACIÓN REACTIVA EN CÓDIGO

Evita transiciones lineales puras (`linear`). Cada elemento reactivo debe regirse por físicas elásticas según su peso conceptual.

### 6.1 Configuraciones de Spring Estandarizadas

```tsx
import { spring } from "remotion";

// 1. Resorte Reactivo / Snappy (Hooks, botones, pop-ins de nodos y números)
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

// 2. Resorte Firme / Editorial (Tarjetas, diagramas, paneles de split screen)
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

// 3. Resorte Suave / Cinematic (Desplazamientos de cámara y zooms)
export const springCamera = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 26,
      mass: 1.4,
      stiffness: 75,
    },
  });
```

### 6.2 Efecto Shake / Impacto Reactivo
Cuando un elemento numérico o tarjeta golpee la pantalla, aplica una vibración en los 6 frames posteriores al impacto:

```tsx
export const getImpactShake = (frame: number, impactFrame: number): number => {
  const diff = frame - impactFrame;
  if (diff < 0 || diff > 8) return 0;
  // Decaimiento exponencial con oscilación alterna
  const decay = Math.exp(-diff * 0.45);
  return Math.sin(diff * 2.5) * 12 * decay;
};
```

---

## 7. MATRIZ DE REVISIÓN ANTES DE EXPORTAR (CHECKLIST REACTIVO)

Antes de dar por finalizada una composición en Remotion, verifica cada elemento contra esta lista:

- [ ] **Test de UI Real:** ¿Se ha probado con la máscara de botones de TikTok sobrepuesta sin que tape textos ni datos?
- [ ] **Límite de 2.0 Segundos:** ¿Hay algún lapso de más de 60 frames sin cambios de escala, aparición de capas o activación de acentos?
- [ ] **Legibilidad a Escala Real:** ¿Los metadatos y etiquetas son perfectamente legibles al reproducir el video a tamaño natural en un smartphone?
- [ ] **Reactividad Sonora:** ¿Cada aparición con `springSnappy` tiene un golpe sonoro (pop, click, swoosh) en su frame inicial exacto?
- [ ] **Open Loop en Frame 0:** ¿El hook plantea un conflicto o misterio visible en los primeros 90 frames?
- [ ] **Loop de Cierre:** ¿El frame de salida coincide visual o temáticamente con el frame de entrada para facilitar el bucle infinito?