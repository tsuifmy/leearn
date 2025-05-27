# Leearn 后端 - Rust 版本

## 项目概述

这是 Leearn 平台的 Rust 后端实现，使用 Axum 网络框架构建。该项目从原来的 Node.js/TypeScript 后端迁移而来，提供了类型安全、高性能的 API 服务。

## 技术栈

- **Rust** - 系统编程语言，提供内存安全和性能
- **Axum** - 现代、人机工程学的 Web 框架
- **Tokio** - 异步运行时
- **Serde** - 序列化/反序列化库
- **UUID** - 唯一标识符生成
- **Chrono** - 日期时间处理

## 项目结构

```
src/
├── main.rs                 # 应用程序入口点
├── models/                 # 数据模型
│   ├── mod.rs
│   ├── user.rs            # 用户模型
│   ├── content.rs         # 内容模型
│   ├── comment.rs         # 评论模型
│   └── friendship.rs      # 友谊关系模型
├── handlers/               # 请求处理器
│   ├── mod.rs
│   ├── user_handler.rs    # 用户相关处理
│   ├── content_handler.rs # 内容相关处理
│   └── ai_handler.rs      # AI 功能处理
└── routes/                 # 路由定义
    ├── mod.rs
    ├── user_routes.rs     # 用户路由
    ├── content_routes.rs  # 内容路由
    └── ai_routes.rs       # AI 路由
```

## API 端点

### 用户管理
- `GET /api/users` - 获取所有用户
- `POST /api/users` - 创建新用户
- `GET /api/users/{id}` - 获取特定用户
- `PUT /api/users/{id}` - 更新用户信息

### 内容管理
- `GET /api/contents` - 获取所有内容
- `POST /api/contents` - 创建新内容
- `GET /api/contents/{id}` - 获取特定内容
- `POST /api/contents/{id}/like` - 点赞内容

### AI 功能
- `POST /api/ai/chat` - AI 聊天
- `POST /api/ai/study-plan` - 生成学习计划

## 运行项目

### 先决条件
- Rust 1.70+ 
- Cargo (Rust 包管理器)

### 启动开发服务器
```bash
cargo run
```

服务器将在 `http://localhost:3001` 启动。

### 运行测试
```bash
./test_api.sh
```

## 数据存储

当前使用内存存储（HashMap），适用于开发和测试。生产环境中应该集成真实的数据库（如 PostgreSQL）。

## 特性

✅ **完成的功能：**
- 用户 CRUD 操作
- 内容 CRUD 操作
- 点赞功能
- AI 聊天模拟
- AI 学习计划生成
- CORS 支持
- JSON API
- 错误处理
- 类型安全

🚧 **待实现功能：**
- 数据库集成
- 用户认证/授权
- 真实的 AI 集成
- 评论功能
- 友谊系统
- 文件上传
- 日志记录
- API 文档 (OpenAPI/Swagger)

## 与原 Node.js 版本的对比

### 优势
- **类型安全**: Rust 的类型系统防止运行时错误
- **性能**: 零成本抽象和内存效率
- **并发**: Tokio 提供高效的异步处理
- **内存安全**: 无垃圾回收的内存管理

### 迁移状态
- ✅ 基本 API 结构
- ✅ 用户和内容模型
- ✅ 核心 CRUD 操作
- ✅ AI 功能框架
- 🚧 数据库层
- 🚧 认证系统

## 开发

### 添加新的 API 端点
1. 在相应的 `models/` 文件中定义数据结构
2. 在 `handlers/` 中实现业务逻辑
3. 在 `routes/` 中定义路由
4. 在 `main.rs` 中注册路由

### 代码格式化
```bash
cargo fmt
```

### 代码检查
```bash
cargo clippy
```

## 部署

项目可以使用 Docker 容器化部署：

```dockerfile
FROM rust:1.70 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=builder /app/target/release/backend /usr/local/bin/backend
EXPOSE 3001
CMD ["backend"]
```

## 贡献

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 创建 Pull Request

## 许可证

MIT License
