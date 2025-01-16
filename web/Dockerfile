ARG NODE_VERSION=22.12.0
ARG PNPM_VERSION=9.15.3
ARG ALPINE_VERSION=3.21
ARG NGINX_VERSION=1.27.3

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS build

RUN --mount=type=cache,target=/root/cache/.npm \
  npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --production

COPY . .

EXPOSE 5000

RUN pnpm build

FROM nginx:${NGINX_VERSION}-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD nginx -g "daemon off;"
