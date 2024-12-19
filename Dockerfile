# Install dependencies only when needed
FROM node:20.8.0-slim AS deps

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:20.8.0-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

ARG API_IP
ARG MAP_IP

RUN npm run build

# pull official base image
FROM node:20.8.0-slim AS runner

# set working directory
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

ARG API_IP
ENV NEXT_PUBLIC_API_IP=$API_IP

ARG MAP_IP
ENV NEXT_PUBLIC_MAP_IP=$MAP_IP

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.env.production ./.env.production

EXPOSE 3000
ENV PORT 3000

# start app
ENTRYPOINT ["node", "server.js"]