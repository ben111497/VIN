# 使用官方 Node.js 镜像作为基础镜像
FROM node:14
# 安装 MySQL 客户端
RUN apt-get update && apt-get install -y default-mysql-client
# 设置工作目录
WORKDIR /app
# 将应用程序依赖项复制到容器
COPY package*.json ./
RUN npm install express
RUN npm install cors
RUN npm install mysql2
# 复制应用程序文件到容器
COPY . .

# 暴露端口
EXPOSE 3000

# 启动 Node.js 服务器
CMD ["node", "db.js"]


# 生成鏡像
# docker build -t #path .
# docker build -t test-8086 .

# 查看已生成的鏡像
# docker image ls

# 運行鏡像
# docker run $packageName
# docker run -p 8086:8086 test-8086

# 上傳鏡像到 docker hub
# docker tag 5f88412215ec yushulin/$repo
# docker push yushulin/$repo

# https://labs.play-with-docker.com/