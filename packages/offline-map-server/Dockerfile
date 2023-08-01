FROM node:lts

COPY dist /app/dist
COPY package.json /app
COPY client /app/client
COPY node_modules /app/node_modules

WORKDIR /app

CMD ["npm", "run", "start:prod"]

EXPOSE 3000