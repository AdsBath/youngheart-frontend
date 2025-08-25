FROM node:20-alpine3.18 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine3.18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine3.18 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Only copy needed files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3000
CMD ["npm", "start"]
