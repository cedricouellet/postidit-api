FROM mariadb:10.6

COPY ./data/init/init.sql /docker-entrypoint-initdb.d/