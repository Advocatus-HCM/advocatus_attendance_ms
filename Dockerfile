FROM node:lts

WORKDIR "/app"

COPY . .

EXPOSE 8003

CMD ["sh", "-c", "npm install && npm run dev"]