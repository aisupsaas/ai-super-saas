# services/auth-service/Dockerfile
FROM node:22-alpine

WORKDIR /app

# Install deps first (better caching)
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Copy the rest of the service
COPY . .

# Generate Prisma client + build TS
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build

ENV NODE_ENV=production
EXPOSE 8080

CMD ["npm", "start"]
