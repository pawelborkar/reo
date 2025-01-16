ARG NODE_VERSION=22.12.0
ARG PNPM_VERSION=9.15.3
ARG ALPINE_VERSION=3.21

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}

RUN --mount=type=cache,target=/root/.npm \
  npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile 

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

EXPOSE 8000

RUN pnpm build 

CMD while ! nc -z db 5432; do sleep 1; done; npx prisma migrate deploy && pnpm start


