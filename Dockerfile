ARG NODE_VERSION=22.12.0 
ARG PNPM_VERSION=9.15.2
ARG ALPINE_VERSION=3.21

# STAGE: Base
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
WORKDIR /usr/local/app
RUN --mount=type=cache,target=/root/.npm \
  npm install -g pnpm@${PNPM_VERSION}


######## CLIENT STAGES #########

# STAGE: CLIENT BASE
FROM base AS client-base
COPY web/package.json web/pnpm-lock.yaml web/favicon.ico web/index.html web/tsconfig.json web/tsconfig.node.json web/vercel.json web/vite.config.ts web/tailwind.config.js web/postcss.config.js ./ 
RUN --mount=type=cache,id=pnpm,target=/usr/local/share/.cache/pnpm \
  pnpm install
COPY web/public ./public
COPY web/src ./src


# STAGE: Client/Web Dev
FROM client-base AS client-dev
CMD ["pnpm", "dev"]


# STAGE: Client production build
FROM client-base AS client-build
RUN pnpm build


######## BACKEND STAGES #########

# STAGE: Backend base
FROM base AS backend-base
COPY api/package.json api/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/usr/local/share/.cache/pnpm \
  pnpm install 
COPY api/node_modules ./node_modules
COPY api/ .


# STAGE: Backend Dev
FROM backend-base AS backend-dev
CMD ["pnpm", "dev"]


# STAGE: Backend Test
FROM backend-base AS backend-test
CMD ["pnpm", "test"]


# STAGE: Backend Build
FROM backend-base AS backend-build
RUN pnpm build


# STAGE: Production
FROM base AS production
ENV NODE_ENV=production
COPY --from=backend-build /usr/local/app/package.json /usr/local/app/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/usr/local/share/.cache/pnpm \
  pnpm install --prod
COPY --from=backend-build /usr/local/app/dist ./dist/api
COPY --from=client-build /usr/local/app/dist ./dist/client
EXPOSE 8000
CMD ["node", "dist/api/app.js"]
