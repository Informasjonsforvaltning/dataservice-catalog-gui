FROM node:22.8.0 AS build
RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
COPY audit-resolve.json ./
RUN npm install -g npm-audit-resolver@next
RUN npm set progress=false && \
  npm config set depth 0 && \
  npm ci
RUN check-audit --production --audit-level=moderate
COPY babel.config.js tsconfig.json tsconfig.webpack.json jest.config.js ./
COPY webpack ./webpack
COPY test ./test
COPY src ./src
RUN npm test
RUN npm run build:dev
