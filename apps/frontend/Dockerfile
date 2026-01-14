FROM node:20-alpine AS deps
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/frontend/package.json apps/frontend/package.json
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /repo
COPY . .
RUN npm run -w apps/frontend build

FROM node:20-alpine AS run
WORKDIR /repo
ENV NODE_ENV=production

COPY --from=build /repo/apps/frontend/.next apps/frontend/.next
COPY --from=build /repo/apps/frontend/public apps/frontend/public
COPY --from=build /repo/apps/frontend/package.json apps/frontend/package.json
COPY --from=build /repo/apps/frontend/next.config.ts apps/frontend/next.config.ts
COPY --from=deps  /repo/node_modules node_modules

EXPOSE 8080
CMD ["sh","-c","node node_modules/next/dist/bin/next start apps/frontend -p ${PORT:-8080}"]
