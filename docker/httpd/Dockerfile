FROM php:8.2-apache

# ミドルウェアのインストール
RUN apt update \
&& apt install -y zlib1g-dev libzip-dev libcurl4-openssl-dev libxml2-dev libonig-dev unzip \
&& docker-php-ext-install zip ctype curl dom fileinfo filter mbstring pdo pdo_mysql mysqli session xml

# modRewriteを有効化
RUN a2enmod rewrite

# Composerのインストール
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node コマンド
COPY --from=node:lts /usr/local/bin /usr/local/bin

# npm コマンド
COPY --from=node:lts /usr/local/lib /usr/local/lib

# ドキュメントルートを変更する
ADD docker/httpd/config/000-default.conf /etc/apache2/sites-available/

# コンテナログイン時のディレクトリ
WORKDIR /var/www
