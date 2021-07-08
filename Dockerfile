FROM node:14.17-alpine AS build

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

ENV VUE_APP_AGGREGATOR_URL=

ENV  VUE_APP_REGISTRY_URL=

COPY . .

RUN npm install

RUN npm run build

FROM node:14.17-alpine AS run

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8080

CMD npx http-server ./dist
