FROM node:alpine
WORKDIR /opt/app
ADD package.json yarn.lock tsconfig.json /opt/app/
RUN cd /opt/app && yarn install
ADD src /opt/app/src
RUN yarn build-ts
ENTRYPOINT yarn run start