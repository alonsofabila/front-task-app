FROM node:20-alpine
LABEL authors="jorge"

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]