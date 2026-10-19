# Skill: Narrativa Empírica y Representación Visual de Conceptos

Usa esta skill para escribir el guion y decidir **cómo se representan las ideas en pantalla**. Tu objetivo es que el espectador *vea funcionar* la idea mediante diagramas, escalas, experimentos y contrastes, estilizados siempre con los tokens de `docs/style.json`.

---

## PARTE 1: ARQUITECTURA DE STORYTELLING (GUÍA MODULAR DE ACTOS)

> [!IMPORTANT]
> **Flexibilidad Narrativa y Criterio de Síntesis:**  
> **No todas las ideas requieren obligatoriamente una estructura rígida de 6 actos.** Antes de redactar el guion, **comprueba críticamente cuántos actos son estrictamente necesarios para transmitir con fuerza el mensaje**.  
> - Para conceptos directos, técnicos o dinámicas de impacto rápido, una estructura condensada de **3 o 4 actos** (por ejemplo: *Negación Cotidiana* + *Anclaje Empírico / Mecanismo* + *Cierre Circular*) suele ser más potente que forzar actos de relleno.  
> - Para temas históricos con debates complejos o mitos arraigados, el arco completo de 6 actos desplegará todo su potencial.  
> 
> Utiliza la siguiente progresión de **6 actos como guía de referencia y caja de herramientas modular**, seleccionando y combinando los actos que mejor sirvan a la claridad y ritmo de la idea:

### Acto 1: La Negación Cotidiana (Segundos 0 a 5)
- **Regla:** Empieza con una frase contundente de 4 a 7 palabras que contradiga algo que el espectador cree obvio, conectándola de inmediato con una experiencia física tangible.
- **Ejemplos del patrón:**
  - *"Nunca has tocado nada. Ni siquiera esta pantalla que tu dedo está rozando ahora mismo."*
  - *"Los mosquitos tienen favoritos. Pon a dos personas en el mismo cuarto: a una ni la tocan y a la otra se la comen viva."*
  - *"Las pirámides no las construyeron esclavos. Y de uno de los trabajadores conocemos hasta su diario."*

### Acto 2: La Cuantificación o el Viaje de Escala
- **Regla:** Antes de dar la teoría, dimensiona el fenómeno con números concretos o bajando por niveles de escala.
- **Ejemplos del patrón:**
  - *"Alguien lo midió: entre la persona que más les gustaba y la que menos, hubo 100 veces de diferencia."*
  - *"Bajemos un centímetro: la yema de tu dedo. Un milímetro: tu huella. Una décima de milímetro: tus células... hasta los átomos."*

### Acto 3: ElAnclaje Empírico (Lugar + Año + Nombre + Mecánica del Experimento)
- **Regla:** Prohibido decir frases vagas como *"según la ciencia"* o *"un estudio demostró"*. Siempre debes nombrar **la ciudad, el año y el investigador**, y describir **el objeto físico o procedimiento ingenioso** que usaron para medirlo.
- **Ejemplos del patrón:**
  - *"Nueva York, 2022. El laboratorio de Leslie Vosshall le pidió a voluntarios que llevaran una media de nylon en el brazo por 6 horas... luego pusieron las medias al fondo de un túnel y soltaron mosquitos."*
  - *"En 1990, el caballo de una turista tropezó con un muro de adobe al sur de Guiza. Debajo estaba el cementerio de los trabajadores..."*
  - *"En 1909, en Manchester, el equipo de Ernest Rutherford disparó partículas alfa contra una lámina de oro finísima..."*

### Acto 4: El Mecanismo Invisible (Paso a Paso Causal)
- **Regla:** Explica qué ocurre "bajo el capó" dividiendo el fenómeno en una cadena causal de 2 o 3 pasos simples.
- **Ejemplos del patrón:**
  - *"Para encontrarte, a lo lejos siguen el dióxido de carbono. Más cerca te buscan con la vista. Y a unos centímetros deciden por los ácidos carboxílicos de tu piel."*

### Acto 5: Desmitificación + El Matiz ("Aquí no todos están de acuerdo")
- **Regla:** Todo gran guion desmonta el mito popular explicando de dónde salió (ej. *"esa imagen viene de Heródoto y de una película de Hollywood de 1955"*, *"lo de la sangre tipo O viene de un estudio de 2004 que nadie ha podido confirmar"*). Inmediatamente después, muestra que el tema tiene **dos posturas reales enfrentadas**:
  - *"Un estudio con gemelos dice que se hereda; otro dice que lo deciden las bacterias de tu piel. Las dos ideas siguen en pie."*
  - *"Unos insisten en que comían bien y tenían honores; otros recuerdan que comer bien no es lo mismo que ser libre."*

### Acto 6: Cierre Circular + Pregunta Directa
- **Regla:** Regresa en una frase a la escena del Acto 1 y cierra con una pregunta corta de 5 a 8 palabras dirigida a la experiencia del espectador (*"¿Y tú qué sabías sobre...?"*, *"¿Piensas que te prefieren a ti?"*).

---

## PARTE 2: CÓMO REPRESENTAR LOS ELEMENTOS EN EL VIDEO (REGLAS DE PUESTA EN ESCENA)

### Regla Fundamental: Cero "Karaoke" de Subtítulos
No coloques subtítulos transcribiendo todo lo que dice la voz. **La pantalla es un cuaderno visual donde solo se dibuja la evidencia.** El texto en pantalla solo sirve para:
1. Nombrar el lugar y el año (`Manchester • 1909`).
2. Etiquetar las partes de un diagrama (`núcleo`, `nube de electrones`, `ácidos carboxílicos`).
3. Mostrar la conclusión lógica con una flecha (`→ casi vacío`, `→ 100x más`).

### 7 Formas de Representar Ideas en Remotion (Combinar según el Guion)

1. **Representación de "La Prueba de Laboratorio" (Esquema Mecánico):**
   - Cuando el guion cuente cómo se hizo un experimento (Acto 3), **no pongas una ilustración decorativa de un científico**. Dibuja en SVG el aparato experimental en vista esquemática (el tubo en Y, la lámina frente al cañón de partículas, el barco bajando de la cantera de Tura por el Nilo hasta Guiza) y anima cómo los elementos viajan de un punto a otro.

2. **Representación de Grupos y Poblaciones (Abstracción en Nodos Numerados):**
   - Cuando el guion hable de voluntarios, muestras, canciones o probabilidades (*"1 de cada 8.000"*, *"todas contra todas"*), represéntalos como **fichas o círculos numerados** (`01`, `19`, `33`) organizados en una grilla o torneo. Usa `accentPrimary` para destacar al nodo ganador o anómalo y `accentSecondary` o `textMuted` para el resto.

3. **Representación de Escalas y Capas Ocultas (Zoom Continuo con Regla):**
   - Cuando pases de lo macro a lo micro (del dedo al átomo, o de una pirámide al grano de piedra caliza), coloca un indicador de escala en `monoFont` en un lateral (`1 cm` -> `1 mm` -> `10⁻¹⁰ m`) mientras la cámara atraviesa capas sucesivas mediante `scale` exponencial.

4. **Representación de Causas en Etapas (Línea de Progresión Espacial):**
   - Si algo ocurre en 3 fases (ej. a 10 metros huele el CO2 -> a 2 metros ve el contraste -> a 5 cm detecta el calor), dibuja una regla de distancia y mueve el sujeto a través de las 3 zonas mientras se activan ondas o indicadores en cada umbral.

5. **Representación de Mitos Desmentidos (Tachado Editorial y Sello):**
   - Cuando menciones el mito popular (*"sangre dulce"*, *"100,000 esclavos"*), escríbelo primero en pantalla como si fuera cierto y, en el frame exacto en que el narrador lo niega, **táchalo con un trazo firme de tinta** (`accentHighlighter` o `accentPrimary`) o estampa una etiqueta con marco `[SIN CONFIRMAR • 2004]` mientras aparece debajo el dato corregido (`20,000 trabajadores`).

6. **Representación de "Dos Posturas en Debate" (Pantalla Dividida Viva):**
   - En el Acto 5, cuando presentes las dos explicaciones científicas rivales, divide el lienzo en dos mitades (izquierda/derecha o arriba/abajo) separadas por una línea de `gridAndBorders`. En la mitad A anima la primera hipótesis (usando `accentPrimary`) y en la mitad B anima la segunda (usando `accentSecondary`), manteniendo ambas activas mientras el narrador las compara.

7. **Representación de Fechas y Magnitudes (Odómetro y Máquina de Escribir):**
   - Toda fecha histórica (`1955`, `2012`, `450 a. C.`) o cifra clave (`99,999%`, `+9 dB`) debe entrar mediante un rodillo numérico vertical (`<OdometerNumber />`) o escribirse carácter por carácter con un cursor sólido (`<TypewriterLabel />`), nunca con un simple fade-in estático.

---

## PARTE 3: COREOGRAFÍA DE SONIDO VINCULADA A LA REPRESENTACIÓN

Cada representación visual lleva su respuesta sonora en el frame exacto:
- **Aparición de ficha/nodo o recorte ilustrado (`bouncy`):** `pop` orgánico suave.
- **Trazado de ruta en mapa, flecha de diagrama o tachado de mito (`snappy`):** `highlighter` / trazo de pluma sobre papel.
- **Cambio de escala o viaje de cámara entre nodos del experimento (`smoothCamera`):** `camera` swoosh grave.
- **Rodillo de año o cifra (`<OdometerNumber />`):** clics sutiles de contador mecánico.
- **Estampado de evidencia o cambio de acto:** `slide` de hoja de papel o golpe suave sobre mesa.