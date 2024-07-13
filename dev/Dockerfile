FROM alpine:3.20

ENV NODE_VERSION 20.13.1-r0
ENV NPM_VERSION 10.8.0-r0

VOLUME ["/hebewerk-starter/node_modules"]

RUN apk -q update
RUN apk -q --no-progress add --no-cache curl git bash make \
    && apk -q --no-progress add nodejs="$NODE_VERSION" \
    && apk -q --no-progress add npm="$NPM_VERSION"

WORKDIR /hebewerk-starter
RUN echo $PWD

COPY package.json .
RUN npm install
COPY . .
RUN npm run build


ENTRYPOINT [""]
CMD "/bin/bash -c"