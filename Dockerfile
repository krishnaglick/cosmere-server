#Setup
FROM node:7.9.0

# Define working directory
WORKDIR /cosmere-server
ADD ./ /cosmere-server

ENV MONGO_URL '172.17.0.1:27017'

# Install Dependencies
RUN npm i -g pm2
RUN npm i
RUN npm run build
RUN npm run config:force

CMD ["npm", "run", "prod"]