FROM ubuntu:20.04
LABEL Maintainer="<nchinh.vn@gmail.com>" 

RUN apt update && \
    DEBIAN_FRONTEND=noninteractive apt install -y curl && \
    curl -sL https://deb.nodesource.com/setup_12.x |  bash -  && \
    DEBIAN_FRONTEND=noninteractive \
    apt install -y openssh-client  zlib1g zlib1g-dev \
                   git bash nodejs supervisor gcc g++ make autoconf automake libtool \
                   graphicsmagick ghostscript yarn nano vim unzip wget && \
    apt install -y tzdata && cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    echo Asia/Ho_Chi_Minh > /etc/timezone && \
    mkdir -p /var/www/html

RUN npm install -g --force yarn pdf2pic

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN echo ${NODE_ENV}
WORKDIR /var/www/html/
#COPY  .env.test /var/www/html/.env
# Build package basic
COPY package.json /var/www/html/package.json
RUN yarn install --frozen-lockfile
# Build all code
COPY  . /var/www/html
RUN yarn build

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
