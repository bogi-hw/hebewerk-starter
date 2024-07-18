# instead of `FROM node:latest`, we use a fixed version, were we definitely know, that it works.
FROM node@sha256:b632a1ec41a0927d19a432c525641b9a4451251d0b0b63f1d764810a562ea4e1

WORKDIR /app

# Do a clean install of all npm (production-) packages from package-lock.json
COPY package-lock.json /app
RUN npm ci --ignore-scripts --only=production && npm cache clean --force

# Performance: Separate layer for web/dist (it's a large chunk of ~1.5MB. So we want the rest to be unaffected of it)
COPY ./web/dist /app/web/dist

COPY . /app

#Database:
RUN mkdir /app/db
# You must also give the volume a name when starting the container via -v myNamedVolume:/app/db to make it persistent across image pulls (i.e. via watchtower)
VOLUME /app/db

# Start it:
ENV NODE_ENV production
CMD npm run start
EXPOSE 3000/tcp