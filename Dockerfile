FROM oven/bun:1.4-alpine AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run check && bun run build
FROM oven/bun:1.4-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.vercel/output ./.vercel/output
COPY --from=build /app/package.json ./
COPY --from=build /app/migrations ./migrations
EXPOSE 3000
CMD ["bun", "run", "preview"]
