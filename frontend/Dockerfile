FROM node:20-alpine AS builder

RUN apk upgrade --no-cache libcrypto3 libssl3 libxml2 libexpat zlib libpng nghttp2-libs c-ares musl musl-utils

WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY ./tsconfig.json ./vite.config.ts ./index.html ./
COPY ./src ./src

ARG VITE_API_BASE_URL=http://localhost:8080
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build


FROM nginx:1.27-alpine

RUN apk upgrade --no-cache libcrypto3 libssl3 libxml2 libexpat zlib libpng nghttp2-libs c-ares musl musl-utils

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
