# landing-nori

Sitio de marketing de **Nori** (software para laboratorios clínicos y de patología), publicado en https://wsnori.com.

Hecho con [Astro](https://docs.astro.build) y Tailwind CSS 4. Genera un sitio 100 % estático.

## Requisitos

- Node.js `>= 22.12.0`
- npm

## Desarrollo local

```sh
npm install        # instalar dependencias (solo la primera vez o al cambiar package.json)
npm run dev        # servidor de desarrollo en http://localhost:4321
```

Para dejar el servidor corriendo en segundo plano:

```sh
npx astro dev --background
npx astro dev status   # ver si está corriendo
npx astro dev logs     # ver logs
npx astro dev stop     # detenerlo
```

## Build de producción

```sh
npm run build      # genera el sitio estático en dist/
npm run preview    # sirve dist/ en http://localhost:4321 para revisarlo antes de publicar
```

El build:

- Genera HTML estático de cada página en `dist/`.
- Optimiza las imágenes importadas desde `src/assets/` (WebP en varios tamaños).
- Crea `dist/sitemap-index.xml` y `dist/sitemap-0.xml` con `@astrojs/sitemap`.
- Copia todo lo que está en `public/` (incluido `robots.txt` y `og-image.jpg`) tal cual.

## Despliegue

Sube el **contenido** de `dist/` a la raíz del servidor web (nginx). No se necesita Node en el servidor.

Configuración recomendada del servidor:

- Redirigir `http://` → `https://` y `www.wsnori.com` → `https://wsnori.com` con un 301 directo.
- Las URLs usan `/` final (`trailingSlash: 'always'`), p. ej. `/precios/`. nginx las sirve como `precios/index.html`.

Ejemplo mínimo de nginx:

```nginx
server {
    listen 80;
    server_name wsnori.com www.wsnori.com;
    return 301 https://wsnori.com$request_uri;
}

server {
    listen 443 ssl;
    server_name www.wsnori.com;
    # ssl_certificate ...
    return 301 https://wsnori.com$request_uri;
}

server {
    listen 443 ssl;
    server_name wsnori.com;
    # ssl_certificate ...
    root /var/www/wsnori/dist;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

> Si el HTTPS lo termina un balanceador de AWS (ELB/ALB), las redirecciones a `https://` y de `www` se configuran en el listener del balanceador y nginx solo necesita el último bloque escuchando en el puerto 80.

## SEO

- El dominio se define en `astro.config.mjs` (`site`). Las URLs canónicas, Open Graph y el sitemap dependen de él; si cambia el dominio, cámbialo ahí.
- Metadatos y datos estructurados (JSON-LD) viven en `src/layouts/Layout.astro`. Cada página puede pasar `title`, `description`, `image`, `breadcrumb` y `schema` a través de `MarketingLayout`.
- Después de publicar, envía `https://wsnori.com/sitemap-index.xml` en Google Search Console → Sitemaps.

## Estructura

```text
src/
  assets/       imágenes optimizadas por Astro (usar con <Image />)
  components/   secciones, layout y componentes de UI
  data/         textos y datos de la empresa (content.ts)
  layouts/      Layout base (SEO) y MarketingLayout (header + footer)
  pages/        una página por archivo → una ruta
  styles/       CSS global y tema de Tailwind
public/         archivos estáticos copiados tal cual
```
