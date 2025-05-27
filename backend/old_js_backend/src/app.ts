import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 连接MongoDB（开发环境可使用内存数据库）
// mongoose.connect('mongodb://localhost:27017/leearn');

app.get('/', (req, res) => {
  res.json({ message: 'Leearn 平台后端 API 启动成功', version: '1.0.0' });
});

// API 路由
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Leearn 后端服务已启动，端口: ${PORT}`);
  console.log(`📚 学乐无穷平台 - 因材施教，AI助力成长`);
});
