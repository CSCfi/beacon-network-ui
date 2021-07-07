FROM node:14-alpine AS build

WORKDIR /usr/src/app

COPY package.json .
COPY tsconfig.json ./
RUN npm install

COPY . ./

FROM build as start

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/ /usr/src/app/

EXPOSE 3000

CMD ["npm", "run", "serve"]