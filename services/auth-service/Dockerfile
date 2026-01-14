FROM node:20-alpine AS deps
WORKDIR /repo

# Workspace manifests
COPY package.json package-lock.json ./
COPY services/auth-service/package.json services/auth-service/package.json

# Install deps from root (workspace-aware)
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /repo
COPY . .
RUN npm run -w services/auth-service build

FROM node:20-alpine AS run
WORKDIR /repo
ENV NODE_ENV=production

COPY --from=build /repo/services/auth-service/dist services/auth-service/dist
COPY --from=build /repo/services/auth-service/prisma services/auth-service/prisma
COPY --from=build /repo/services/auth-service/package.json services/auth-service/package.json
COPY --from=deps  /repo/node_modules node_modules

EXPOSE 8080
CMD ["sh", "-c", "cd services/auth-service && npx prisma migrate deploy --schema=./prisma/schema.prisma && node dist/src/index.js"]
