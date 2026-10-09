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

## Qué sale solo y qué hay que rellenar

Sale solo en todas las guías (está en `assets/`): los 9 idiomas, la pantalla de idioma, el aviso del regalo arriba, la sección del regalo con 5REPEATING, el formulario de la lista del 7% conectado a Brevo, el "gracias" con banderas, el botón grande a todas las propiedades, las fotos que se amplían, el QR del Wi-Fi, las normas y la seguridad.

Hay que rellenar en el CONFIG de cada propiedad: nombre y zona, tipo (piso o casa), entrada (lockbox o cerradura), Wi-Fi, horarios, aparcamiento (y enlaces de Maps), cómo llegar, rutas con fotos, electrodomésticos, basura, incendio, farmacias, urgencias, cómo cerrar al salir y las recomendaciones. Lo que se deja vacío no sale. Lo que queda entre [CORCHETES] sale marcado para que se vea que falta.

Los textos de cada propiedad pueden ir en un solo idioma (inglés) o en los 9. Lo más rápido: rellenar en inglés y pedir a Claude las traducciones.

## Cambiar algo en todas las guías

- **Importante:** cada vez que cambies un archivo de `assets/`, sube el número `?v=` (por ejemplo de `20261009b` a `20261010a`) en el `index.html` de cada propiedad y de `_template`. Si no, Cloudflare y los móviles siguen mostrando la versión vieja.

- **Un texto:** en `assets/guide-i18n.js`, en los 9 idiomas.
- **Un campo nuevo en CONFIG:** añádelo primero en `_template/index.html` y después en cada propiedad.

## Idioma

- La primera vez, el huésped elige el idioma en la pantalla de bienvenida. La guía lo recuerda en su móvil.
- Si añades `?lang=es` al enlace, la guía se abre directamente en ese idioma.
- Códigos: en, es, fr, de, it, pt, zh, ar, ja.

## Lista de huéspedes (Brevo)

- La sección "Gracias" muestra el 5% (código 5REPEATING) a todos y un formulario para unirse a la lista "Returning guests" y recibir el 7% por email.
- Cerca del principio hay un aviso pequeño que lleva al formulario. El huésped puede cerrarlo.
- El formulario envía a Brevo: nombre, email, ciudades, motivo del viaje, consentimiento, PROPERTY (nombre de la propiedad) y GUIDE_LANGUAGE (idioma de la guía).
- La dirección del formulario de Brevo está en `assets/guide.js` (constante BREVO). Si alguna vez creas otro formulario en Brevo, cambia solo esa línea.
- Formulario en Brevo: "Guest guide signup", lista "Returning guests", doble confirmación.
- Email 1 (plantilla #1, doble opt-in): "Confirm your email for your 7% code". No lleva el código.
- Email 2 (plantilla #3, confirmación final): "Your 7% code is here", con 7FIRSTACCESS, botón y QR.
- Al pulsar el botón del email 1, el huésped va a booking.hollgroup.co.uk con 7FIRSTACCESS aplicado.
- Para probar otra vez en el mismo móvil, añade `?join=reset` al enlace de la guía. Usa siempre tu email real con +test (ibonholl+testN@gmail.com).
- Si un email no llega: Brevo, Transaccional, Email, Logs. Ahí se ve si se envió, se entregó o rebotó.

## No olvidar

- Nunca añadir la carpeta `guide` al `sitemap.xml`.
- Nunca poner códigos de acceso en una guía.
