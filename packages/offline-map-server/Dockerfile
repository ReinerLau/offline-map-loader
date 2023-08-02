FROM node:lts

COPY dist /app/dist
COPY package.json /app
# COPY pnpm-lock.yaml /app
COPY client /app/client

WORKDIR /app

# RUN npm install pnpm -g
RUN npm install --omit=dev --force

CMD ["npm", "run", "start:prod"]

EXPOSE 3000