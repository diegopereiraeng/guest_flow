FROM node:20-alpine AS builder

WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY ./tsconfig.json ./vite.config.ts ./index.html ./
COPY ./src ./src

ARG VITE_API_BASE_URL=http://localhost:8080
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build


FROM nginx:1.27-alpine

# Upgrade Alpine packages to remediate CVEs:
# CVE-2026-31789 (libcrypto3, libssl3), CVE-2025-49794 (libxml2),
# CVE-2025-59375 (libexpat), CVE-2026-22184 (zlib), CVE-2026-25646 (libpng),
# CVE-2026-27135 (nghttp2-libs), CVE-2026-33630 (c-ares),
# CVE-2026-40200 (musl, musl-utils)
RUN apk upgrade --no-cache

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
