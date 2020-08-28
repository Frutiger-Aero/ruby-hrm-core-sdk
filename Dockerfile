FROM node:12.8.0-alpine

RUN apk add bash;\
    mkdir -p /opt/app &&\
    addgroup app &&\
    adduser -D -G app app &&\
    chown app:app /opt/app
WORKDIR /opt/app
USER app

ADD ./.npmrc /opt/app/.npmrc
ADD ./package-lock.json /opt/app/package-lock.json
ADD ./package.json /opt/app/package.json
ADD ./tslint.json /opt/app/tslint.json
ADD ./tsconfig.json /opt/app/tsconfig.json
RUN set -xe; \
    npm install

COPY . ./
RUN set -xe; \
    npm run build


CMD [ "/opt/app/entrypoint.sh"  ]

