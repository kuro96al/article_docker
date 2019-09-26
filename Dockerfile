FROM node:8.11.3-alpine

WORKDIR /app
RUN npm config set unsafe-perm true
RUN apk update && \
    npm install -g npm \
    npm install -g @vue/cli \
    npm install -g firebase-tools \
    npm install -g firebase \
    && rm -rf /var/lib/apt/lists/*

RUN apk add git
RUN git clone https://github.com/kuro96al/article.git && cd $(basename $_ .git)
RUN npm install 
RUN npm run serve
CMD ["/bin/ash"]
