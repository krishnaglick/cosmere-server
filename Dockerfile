#Setup
FROM node:7.9.0

# Define working directory
WORKDIR /cosmere-server
ADD ./ /cosmere-server

# Install Dependencies
RUN npm i -g pm2
RUN npm i -g yarn
RUN yarn
RUN npm run build

CMD ["npm", "run", "prod"]