FROM node:14.17-alpine AS build

WORKDIR /usr/src/app

ARG VUE_APP_AGGREGATOR_URL=

ARG VUE_APP_REGISTRY_URL=

ENV VUE_APP_AGGREGATOR_URL=${VUE_APP_AGGREGATOR_URL}

ENV VUE_APP_REGISTRY_URL=${VUE_APP_REGISTRY_URL}

COPY . .

RUN npm install -g npm@7.19.1 \
    && npm install

RUN npm run build

FROM node:14.17-alpine AS run


COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8080

CMD npx http-server ./dist
