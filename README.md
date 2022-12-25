# 我的餐廳清單

![Index page about Restaurant List](./public/images/index.PNG)

## 介紹

這是一個餐廳清單，可以尋找餐廳、查看資訊、新增資料。

---

## 功能

- 能一次瀏覽所有餐廳
- 可以查看餐廳的資訊
  - 圖片
  - 地址
  - 電話
  - 評分
- 可以使用中文名字、英文名字及分類來尋找餐廳
- 可以新增餐廳
- 可以刪除餐廳
- 可以修改餐廳

---

## 開始使用

1.先確認有安裝 node.js 與 npm

2.開啟終端機(Terminal)，clone 此專案

```bash
git clone https://github.com/Ian920511/restaurant_list.git
```

3.初始化

```bash
cd restaurant_list //進入存放檔案的資料夾
npm install  //安裝插件
```

4.新增 .env 檔，設定環境變數連線 MongoDB

```bash
MONGODB_URI = mongodb+srv://<使用者帳號>:<使用者密碼>@<資料庫伺服器位置>/<資料庫名稱>
```

5.安裝完成後，需新增種子資料，輸入

```bash
npm run seed
```

6.完成後，輸入

```bash
npm run dev
```

7.看見此行訊息則代表順利運行

```bash
Sever is on http://localhost:3000
```

8.進入網頁即可

```bash
http://localhost:3000
```

9.若需要暫停伺服器，則輸入

```bash
ctrl + c
```

---

## 規格

- 程式編輯器: [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/ "Visual Studio Code")
- 使用框架: [express](https://www.npmjs.com/package/express)@4.16.4
- 模板引擎: [express-handlebars](https://www.npmjs.com/package/express-handlebars)@3.0.0
- 資料庫: [MongoDB]
- 編程資料庫: [Mongoose](https://mongoosejs.com/)@5.9.7
- 環境變數: [dotenv](https://www.npmjs.com/package/dotenv)@16.0.3
- 重構程式碼: [method-override](https://www.npmjs.com/package/method-override)@3.0.0
