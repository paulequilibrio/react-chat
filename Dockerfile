FROM node:15.11.0 AS build
WORKDIR /app
COPY react-chat/package.json /app/
RUN yarn install
COPY react-chat /app
RUN yarn build

FROM nginx:1.18.0
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
