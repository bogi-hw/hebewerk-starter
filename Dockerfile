FROM node@sha256:b632a1ec41a0927d19a432c525641b9a4451251d0b0b63f1d764810a562ea4e1
WORKDIR /app
COPY package-lock.json /app
RUN npm ci --ignore-scripts --only=production && npm cache clean --force

# Extra layer for client/dist (performance)
COPY ./web/dist /app/web/dist

COPY . /app

RUN mkdir /app/db
# You must also give the volume a name when starting the container via -v myNamedVolume:/app/db to make it persistent across image pulls (i.e. via watchtower)
VOLUME /app/db

ENV NODE_ENV production
CMD npm run start
EXPOSE 3000/tcp