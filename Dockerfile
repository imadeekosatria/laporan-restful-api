# Stage 1: Build dependencies
FROM oven/bun:alpine AS deps

WORKDIR /app

COPY package.json ./
RUN bun install

# Stage 2: Copy source and build app
FROM oven/bun:alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.docker .env

RUN bun pm cache rm

RUN apk update && apk add openssl

RUN bunx prisma generate
# RUN bunx prisma db pull
# RUN bunx prisma migrate deploy

# Stage 3: Production image
FROM oven/bun:alpine AS prod

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma migrate deploy && bun dev"]
# CMD ["bun", "run", "start"]