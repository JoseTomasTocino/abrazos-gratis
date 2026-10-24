# 🤗 AbrazosGratis

Landing de una sola página para repartir abrazos gratis. HTML, CSS y JS puro: sin build, sin dependencias, sin tracking.

## Qué hay dentro

| Fichero | Para qué |
| --- | --- |
| `index.html` | Toda la página |
| `styles.css` | Estilos (responsive + `prefers-reduced-motion`) |
| `app.js` | Contador de abrazos en `localStorage`, mensajes y corazones |
| `nginx.conf` | Config de nginx: gzip, cache, cabeceras de seguridad, `/healthz` |
| `Dockerfile` | Imagen final basada en `nginx:1.27-alpine` |

## Arrancarlo en local (sin Docker)

Cualquier servidor estático vale, por ejemplo:

```bash
npx serve .
```

Y abre <http://localhost:3000>.

## Docker

```bash
docker build -t abrazos-gratis .
docker run --rm -p 8080:80 abrazos-gratis
```

Abre <http://localhost:8080>.

Comprobar la salud del contenedor:

```bash
curl http://localhost:8080/healthz
```

### docker compose

```yaml
services:
  web:
    build: .
    image: abrazos-gratis
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
docker compose up -d --build
```

## Desplegarlo

La imagen solo expone el puerto **80** y sirve ficheros estáticos, así que encaja en casi cualquier sitio:

- **VPS** con Docker: `docker run -d --restart unless-stopped -p 80:80 abrazos-gratis` (detrás de Caddy/Traefik para el HTTPS).
- **Fly.io**: `fly launch --dockerfile Dockerfile` y ajustar `internal_port = 80` en `fly.toml`.
- **Render / Railway / Dokploy / Coolify**: nuevo servicio desde repo, tipo *Docker*, puerto 80.
- **GitHub Container Registry**:
  ```bash
  docker build -t ghcr.io/TU_USUARIO/abrazos-gratis:latest .
  docker push ghcr.io/TU_USUARIO/abrazos-gratis:latest
  ```

No necesita variables de entorno ni volumen: el estado del contador vive en el navegador de cada visitante.

## Notas

- Las fuentes vienen de Google Fonts; si no hay red, se cae a la fuente del sistema y la página sigue perfecta.
- El contador es local (`localStorage`), no hay backend ni base de datos. Si algún día quieres un contador global, hay que añadir una API.

## Licencia

Haz lo que quieras con esto. Los abrazos son gratis, el código también.
