// 在存儲庫的根目錄下創建一個名為 store-data.js 的文件

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/store-data', (req, res) => {
  const userData = req.body.data;

  // 在這裡添加代碼來處理接收到的數據，例如儲存到數據庫

  console.log('接收到的數據:', userData);

  res.json({ message: '數據已儲存' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
