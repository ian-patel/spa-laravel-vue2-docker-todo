FROM php:7.3-fpm-alpine

# Get building dependencies for php extensions
RUN apk add --no-cache --virtual .run-deps \
    git \
    zlib \
    libmcrypt \
    libxml2 \
    imagemagick \
  && apk add --no-cache --virtual .build-deps \
    coreutils \
    zlib-dev \
    libzip-dev \
    libmcrypt-dev \
    libxml2-dev

# Get php extensions
RUN docker-php-source extract \
  && docker-php-ext-install -j$(nproc) \
    bcmath \
    mysqli \
    pdo_mysql \
    soap \
    mbstring \
    opcache \
  && docker-php-source delete \
  && apk del .build-deps
