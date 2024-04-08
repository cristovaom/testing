FROM node:20.11.0

WORKDIR /

COPY . .

RUN rm -rf node_modules
RUN npm install
RUN npm run dev
# RUN npm run build

# RUN mkdir -p /var/www/html

# RUN mv dist/* /var/www/html

# VOLUME /var/www/html

# WORKDIR /

# RUN rm -rf /tmp/react

# CMD ["node", "dist/main.js"]
# EXPOSE 8080
