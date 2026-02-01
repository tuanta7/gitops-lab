FROM node:25-slim as base
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM base as build
ENV NODE_ENV=development
RUN npm install
COPY . .

FROM base as prod
COPY --from=build /app/dist ./dist

WORKDIR /app/dist
CMD ["node", "index.js"]
