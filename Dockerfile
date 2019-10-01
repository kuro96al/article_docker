FROM node:8.11.3-alpine

WORKDIR /app
RUN npm config set unsafe-perm true
RUN apk update && \
    npm install -g npm \
    npm install -g @vue/cli \
    npm install -g firebase-tools \
    npm install -g firebase \
    npm install -g vue-nl2br \
    && rm -rf /var/lib/apt/lists/*

RUN apk add git
RUN git clone https://github.com/kuro96al/article_docker.git
WORKDIR /app/article2
RUN npm install 

COPY . .

EXPOSE 8080
CMD ["npm","run","serve","--fix"]
