FROM node:14.17-alpine AS build

WORKDIR /usr/src/app

ARG VUE_APP_AGGREGATOR_URL=

ARG VUE_APP_REGISTRY_URL=

ARG VUE_APP_DEVELOPMENT=false

ARG VUE_APP_LOGIN_URL=

ARG VUE_APP_LOGOUT_URL=

ARG VUE_APP_JWT_AUDIENCE=

ARG VUE_APP_MATOMO_URL=

ARG VUE_APP_MATOMO_ID=

ARG VUE_APP_SECURITY_DOCUMENT=

ENV VUE_APP_AGGREGATOR_URL=${VUE_APP_AGGREGATOR_URL}

ENV VUE_APP_REGISTRY_URL=${VUE_APP_REGISTRY_URL}

ENV VUE_APP_DEVELOPMENT=${VUE_APP_DEVELOPMENT}

ENV VUE_APP_LOGIN_URL=${VUE_APP_LOGIN_URL}

ENV VUE_APP_LOGOUT_URL=${VUE_APP_LOGOUT_URL}

ENV VUE_APP_JWT_AUDIENCE=${VUE_APP_JWT_AUDIENCE}

ENV VUE_APP_MATOMO_URL=${VUE_APP_MATOMO_URL}

ENV VUE_APP_MATOMO_ID=${VUE_APP_MATOMO_ID}

ENV VUE_APP_SECURITY_DOCUMENT=${VUE_APP_SECURITY_DOCUMENT}

COPY . .

RUN npm install -g npm@7.20.0 \
    && npm install --production

RUN npm run build --production

FROM node:14.17-alpine AS run

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8080

CMD npx http-server --proxy http://localhost:8080? ./dist