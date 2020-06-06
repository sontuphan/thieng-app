FROM node:12.18.0

WORKDIR /home/thieng-app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-prod

EXPOSE 3000
CMD [ "npm", "run", "serve" ]
