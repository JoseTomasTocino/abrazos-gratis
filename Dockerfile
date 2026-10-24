# ---------- build ----------
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="abrazos-gratis" \
      org.opencontainers.image.description="Landing estática de Abrazos Gratis" \
      org.opencontainers.image.source="https://github.com/JoseTomasTocino/abrazos-gratis"

# Config propia: gzip, cache de estáticos y cabeceras de seguridad básicas
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Solo los ficheros que deben servirse
COPY index.html styles.css app.js /usr/share/nginx/html/

# nginx:alpine ya trae un usuario nginx; el master necesita root para el puerto 80
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --spider --tries=1 http://127.0.0.1/ || exit 1

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
