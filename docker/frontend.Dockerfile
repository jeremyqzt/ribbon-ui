FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./front-end/package.json ./
COPY ./front-end/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY ./front-end/ ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY docker/nginx-fe.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]