FROM mcr.microsoft.com/playwright:v1.53.0-jammy

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run format:check
RUN npm run lint

CMD ["npx", "playwright", "test"]