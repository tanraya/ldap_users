FROM node:12.2.0-alpine

RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

ENV PATH /usr/src/frontend/node_modules/.bin:$PATH

COPY src/frontend/* ./

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

EXPOSE 3000
CMD ["npm", "start"]
