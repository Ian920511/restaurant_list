# 我的餐廳清單

![Index page about Restaurant List](./public/images/index.PNG)


## 介紹

這是一個餐廳清單，可以尋找餐廳、查看資訊。

---
## 功能
+ 能一次瀏覽所有餐廳
+ 可以查看餐廳的資訊
  - 圖片
  - 地址
  - 電話
  - 評分
+ 可以使用中文名字、英文名字及分類來尋找餐廳

---
## 開始使用

1.先確認有安裝 node.js 與 npm

2.開啟終端機(Terminal)，clone此專案

   ```bash
   git clone https://github.com/Ian920511/restaurant_list.git
   ```
   
3.初始化

   ```bash
   cd restaurant_list //進入存放檔案的資料夾
   npm install  //安裝插件
   ```
   
4.安裝完成後，輸入

   ```bash
   npm run start
   ```
   
5.看見此行訊息則代表順利運行

   ```bash
   Sever is on http://localhost:3000
   ```
   
6.進入網頁即可

   ```bash
   http://localhost:3000
   ```

7.若需要暫停，則輸入

   ```bash
   ctrl + c
   ```

---
## 規格
+ 程式編輯器: [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/ "Visual Studio Code") 
+ 使用框架: [express](https://www.npmjs.com/package/express)@4.16.4
+ 模板引擎: [express-handlebars](https://www.npmjs.com/package/express-handlebars)@3.0.0
