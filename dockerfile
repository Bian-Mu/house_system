# 使用多阶段构建减小镜像体积
FROM node:22.12-alpine AS builder
WORKDIR /app

RUN npm install -g npm@10.9.0

RUN npm config set registry https://registry.npmmirror.com


COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# 修复 SPA 路由问题（如 History 模式）
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80