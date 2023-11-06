# 使用 Node.js 16-alpine 映像
FROM --platform=linux/amd64 node:16-alpine
# 創建一個工作目錄
WORKDIR /app
# 複製 package.json 並安裝依賴
COPY package*.json ./
RUN npm install
# 安裝需要的框架 
RUN npm install express
RUN npm install sqlite3
RUN npm install cors
# 複製需要用的文件到容器中
COPY sql.js /app
COPY public /app/public
# 暴露端口
EXPOSE 8081
# 定義啟動指令
CMD ["node", "sql.js"]


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