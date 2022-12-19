FROM node:16.14

WORKDIR /app

COPY package.json .
RUN yarn set version berry \
  && yarn install
COPY . .

EXPOSE 3001

# Start the main process.
CMD yarn start