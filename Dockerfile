FROM node:22-alpine AS builder
WORKDIR /app


COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build
RUN npm prune --production

FROM node:22-alpine AS production

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup -g 1001 -S nodejs && \
    adduser -S expressjs -u 1001 -G nodejs

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY --from=builder --chown=expressjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=expressjs:nodejs /app/dist ./dist
COPY --from=builder --chown=expressjs:nodejs /app/package.json ./

COPY --chown=expressjs:nodejs src/public ./dist/public
COPY --chown=expressjs:nodejs src/views ./dist/views

USER expressjs

EXPOSE 3000

# Use dumb-init to handle PID 1 and signal forwarding
ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "dist/index.js"]
