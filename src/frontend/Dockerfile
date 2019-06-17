FROM node:12.2.0-alpine

RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

COPY ./src/frontend/package.json ./src/frontend/yarn.lock ./

RUN yarn global add react-scripts@3.0.1
RUN yarn install

COPY ./src/frontend/src ./src/frontend/public ./

EXPOSE 3000
CMD ["yarn", "start"]
