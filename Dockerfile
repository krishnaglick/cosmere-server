#Setup
FROM node:7.9.0

# Define working directory
WORKDIR /cosmere-server
ADD ./ /cosmere-server

ENV MONGO_URL '0.0.0.0:27017'

# Install Dependencies
RUN npm i -g pm2
RUN npm i
RUN npm run build
RUN npm run config

CMD ["npm", "run", "prod"]