# ─────────────────────────────────────────────────────────────────────────────
# Stage 1: install all dependencies (dev + prod)
# ─────────────────────────────────────────────────────────────────────────────
FROM node:24-alpine AS deps

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.5.0 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2: compile TypeScript → dist/
# ─────────────────────────────────────────────────────────────────────────────
FROM deps AS builder

COPY . .
RUN pnpm build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 3: lean production image
# ─────────────────────────────────────────────────────────────────────────────
FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@10.5.0 --activate

# Production dependencies only
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Compiled output from the builder stage
COPY --from=builder /app/dist ./dist

# Run as a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000

# The OTEL bootstrap is the first import in dist/main.js so no --require flag
# is needed. Set OTEL_ENABLED=true in the environment to activate telemetry.
CMD ["node", "dist/main.js"]
