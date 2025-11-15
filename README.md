# LEX360 Landing Pages

Este repositorio contiene las dos vistas solicitadas para el estudio jurídico LEX360:

- `index.html`: landing page principal con hero slider, sección de servicios, bloque "Quiénes Somos" y formulario de contacto.
- `areas.html`: página independiente con el detalle completo de las áreas de práctica y el formulario corto de postulación.

## Cómo visualizar los cambios

Para revisar los cambios en modo imagen (vista de navegador) solo necesitas un servidor estático muy simple:

```bash
python3 -m http.server 8000
```

Luego abre tu navegador en `http://localhost:8000/index.html` para la landing y `http://localhost:8000/areas.html` para la página de áreas. Ambas páginas son completamente responsivas, por lo que puedes usar las herramientas de desarrollo del navegador para simular tablets y teléfonos y así verificar el comportamiento del carrusel y las tarjetas de servicios.

Si prefieres abrir los archivos directamente sin servidor, basta con hacer doble clic en `index.html` o `areas.html` y tu navegador mostrará la vista estática; no obstante, el carrusel y algunas animaciones lucen mejor cuando se sirve desde `http.server` o cualquier servidor ligero.
