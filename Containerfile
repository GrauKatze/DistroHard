FROM node

COPY . .

EXPOSE 3000

RUN yarn install

CMD ["node","index.js"]