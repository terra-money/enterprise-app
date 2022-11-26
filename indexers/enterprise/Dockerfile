FROM node:16 as builder_stage_1

WORKDIR /build

COPY package.json yarn.lock ./

# we are using a local version of yarn plus plugins
COPY .yarnrc.yml ./
COPY .yarn/plugins ./.yarn/plugins
COPY .yarn/releases ./.yarn/releases

RUN yarn install

###########################################################

FROM node:16 as builder_stage_2

COPY --from=builder_stage_1 /build /build

WORKDIR /build

COPY refs.json .
COPY indexers/shared/package.json ./indexers/shared/package.json
COPY indexers/enterprise/package.json ./indexers/enterprise/package.json

RUN yarn install

###########################################################

FROM node:16 as builder_stage_3

COPY --from=builder_stage_2 /build /build

WORKDIR /build

COPY indexers/shared ./indexers/shared
COPY indexers/enterprise ./indexers/enterprise

RUN yarn workspace @enterprise/indexers build

###########################################################
FROM public.ecr.aws/lambda/nodejs:16

WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder_stage_3 /build/indexers/enterprise/dist .
