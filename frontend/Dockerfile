FROM node:20-alpine AS builder

WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY ./tsconfig.json ./vite.config.ts ./index.html ./
COPY ./src ./src

ARG VITE_API_BASE_URL=http://localhost:8080
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build


FROM nginx:1.28-bookworm

RUN apt-get update && apt-get upgrade -y --no-install-recommends \
    tar \
    libc-bin \
    libc6 \
    zlib1g \
    libaom3 \
    libxml2 \
    libssl3 \
    openssl \
    libgnutls30 \
    perl-base \
    libgcrypt20 \
    libldap-2.5-0 \
    libheif1 \
    libexpat1 \
    libpam-modules \
    libpam-modules-bin \
    libpam-runtime \
    libpam0g \
    gpgv \
    libtinfo6 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
