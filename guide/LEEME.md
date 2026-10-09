# Guías de huésped (carpeta `guide`)

## Qué hay aquí

- `_template/` → **plantilla maestra**. Nunca se rellena con datos reales. Su `.htaccess` impide abrirla desde la web.
- `assets/` → archivos compartidos por todas las guías:
  - `guide-i18n.js`: todas las frases en los 9 idiomas. Cambiar una frase aquí la cambia en todas las propiedades.
  - `guide.js`: construye la página. No se toca.
  - `guide.css`: el diseño.
- Una carpeta por propiedad, por ejemplo `digbeth-7f3a9c/`, con su `index.html`.

## Crear la guía de una propiedad nueva

1. Copia la carpeta `_template` y renómbrala con el nombre de la propiedad y 6 letras o números al azar, por ejemplo `skyline-k29xq4`.
2. En la copia, **borra el archivo `.htaccess`**. Si no lo borras, la guía no se podrá abrir.
3. Rellena solo el bloque `CONFIG` del `index.html`.
4. Si la propiedad tiene lockbox, añade la foto de la zona como `lockbox-area.jpg` en esa misma carpeta.
5. Commit en GitHub. El enlace para los huéspedes será `https://hollgroup.co.uk/guide/skyline-k29xq4/`.

## Cambiar algo en todas las guías

- **Un texto:** en `assets/guide-i18n.js`, en los 9 idiomas.
- **Un campo nuevo en CONFIG:** añádelo primero en `_template/index.html` y después en cada propiedad.

## Idioma

- La primera vez, el huésped elige el idioma en la pantalla de bienvenida. La guía lo recuerda en su móvil.
- Si añades `?lang=es` al enlace, la guía se abre directamente en ese idioma.
- Códigos: en, es, fr, de, it, pt, zh, ar, ja.

## No olvidar

- Nunca añadir la carpeta `guide` al `sitemap.xml`.
- Nunca poner códigos de acceso en una guía.
