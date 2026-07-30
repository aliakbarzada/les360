# LEX360 — sitio legal estático multi-URL

El sitio usa HTML5 estático y semántico: encabezados, explicaciones, requisitos, procesos y preguntas frecuentes están disponibles en el código fuente sin depender de JavaScript. JavaScript solo aporta mejoras progresivas (menú, carrusel, modales y formularios).

## Estructura

```text
index.html                       Página institucional
servicios-legales/index.html    Catálogo general
 derecho-migratorio/index.html  Landing de campaña migratoria
 derecho-de-familia/index.html  Landing de campaña de familia
assets/css/style.css             Sistema visual compartido
assets/js/main.js                Interacciones progresivas
.htaccess                        HTTPS, alias heredados y URLs limpias
robots.txt / sitemap.xml         Descubrimiento e indexación
```

> Las carpetas `derecho-*` aparecen sin sangría real en el repositorio; cada una se publica como una URL limpia independiente.

## Publicación en cPanel

1. Copia todo el contenido a `public_html`, preservando las carpetas.
2. Activa el certificado SSL antes de habilitar la redirección HTTPS de `.htaccess`.
3. Comprueba `/servicios-legales/`, `/derecho-migratorio/` y `/derecho-de-familia/`.
4. Para asociar un dominio o subdominio solo a una campaña, usa en cPanel la carpeta de esa landing como **Document Root**.
5. Sustituye el dominio de los enlaces `canonical` y de `sitemap.xml` si el dominio de producción no es `lex360.cl`.

## Desarrollo local

```bash
python3 -m http.server 8000
```

Visita `http://localhost:8000/`. Las reglas `.htaccess` requieren Apache y por ello no se aplican en el servidor local de Python.
