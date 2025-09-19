# 1. Base Image: Use a specific Node.js version for consistency.
# Using slim variant to keep the image size smaller.
FROM node:20-slim AS base

# 2. Set Environment Variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 3. Dependencies Stage: Install dependencies first to leverage Docker cache.
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod=false

# 4. Builder Stage: Build the Next.js application.
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Environment variables needed for build
# ARG ...
RUN pnpm build

# 5. Runner Stage: Create the final, smaller image for production.
FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy built assets from the builder stage.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user to run the app.
USER nextjs

# Expose the port the app will run on.
EXPOSE 3000

# The command to start the app.
CMD ["node", "server.js"]
