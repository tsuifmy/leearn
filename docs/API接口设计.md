# API接口设计文档

## 1. 接口概述

### 1.1 基本信息
- **基础URL**: `http://localhost:3001/api`
- **协议**: HTTP/HTTPS
- **数据格式**: JSON
- **认证方式**: JWT Token
- **字符编码**: UTF-8

### 1.2 通用响应格式
```typescript
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}
```

### 1.3 状态码规范
- `200`: 请求成功
- `201`: 创建成功
- `400`: 请求参数错误
- `401`: 未授权
- `403`: 禁止访问
- `404`: 资源不存在
- `500`: 服务器内部错误

## 2. 认证相关接口

### 2.1 用户注册
```
POST /api/auth/register
```

**请求参数:**
```typescript
interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

**响应示例:**
```json
{
  "success": true,
  "message": "注册成功",
  "data": {
    "user": {
      "id": "60f1b2b3c4a5b6789",
      "username": "学习者001",
      "email": "user@example.com",
      "avatar": null,
      "createdAt": "2025-05-26T08:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2.2 用户登录
```
POST /api/auth/login
```

**请求参数:**
```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

### 2.3 刷新Token
```
POST /api/auth/refresh
```

**请求头:**
```
Authorization: Bearer <refresh_token>
```

### 2.4 退出登录
```
POST /api/auth/logout
```

## 3. 用户管理接口

### 3.1 获取用户信息
```
GET /api/users/profile
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "id": "60f1b2b3c4a5b6789",
    "username": "学习者001",
    "email": "user@example.com",
    "avatar": "https://cdn.example.com/avatars/001.jpg",
    "bio": "热爱学习的程序员",
    "interests": ["编程", "数学", "英语"],
    "level": 3,
    "points": 1250,
    "friendsCount": 12,
    "createdAt": "2025-05-26T08:00:00.000Z"
  }
}
```

### 3.2 更新用户信息
```
PUT /api/users/profile
```

**请求参数:**
```typescript
interface UpdateProfileRequest {
  username?: string;
  bio?: string;
  avatar?: string;
  interests?: string[];
}
```

### 3.3 搜索用户
```
GET /api/users/search?q={keyword}&page={page}&limit={limit}
```

### 3.4 获取用户列表
```
GET /api/users?page={page}&limit={limit}&sort={sort}
```

## 4. 内容管理接口

### 4.1 发布内容
```
POST /api/contents
```

**请求参数:**
```typescript
interface CreateContentRequest {
  title: string;
  body: string;
  tags: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  type: 'article' | 'video' | 'audio' | 'course';
  attachments?: string[];
}
```

### 4.2 获取内容列表
```
GET /api/contents?page={page}&limit={limit}&tags={tags}&difficulty={difficulty}&sort={sort}
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "contents": [
      {
        "id": "60f1c3d4e5f6a7b8c9",
        "title": "JavaScript基础入门",
        "summary": "从零开始学习JavaScript...",
        "author": {
          "id": "60f1b2b3c4a5b6789",
          "username": "小明",
          "avatar": "https://cdn.example.com/avatars/001.jpg"
        },
        "tags": ["JavaScript", "前端", "编程入门"],
        "difficulty": 2,
        "type": "article",
        "likesCount": 42,
        "favoritesCount": 15,
        "viewCount": 288,
        "rating": 4.5,
        "createdAt": "2025-05-26T08:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 156,
      "totalPages": 16
    }
  }
}
```

### 4.3 获取内容详情
```
GET /api/contents/{id}
```

### 4.4 更新内容
```
PUT /api/contents/{id}
```

### 4.5 删除内容
```
DELETE /api/contents/{id}
```

### 4.6 点赞内容
```
POST /api/contents/{id}/like
```

### 4.7 收藏内容
```
POST /api/contents/{id}/favorite
```

### 4.8 评分内容
```
POST /api/contents/{id}/rating
```

**请求参数:**
```typescript
interface RatingRequest {
  score: number; // 1-5分
  review?: string;
}
```

## 5. 评论系统接口

### 5.1 发表评论
```
POST /api/comments
```

**请求参数:**
```typescript
interface CreateCommentRequest {
  contentId: string;
  content: string;
  parentId?: string; // 回复评论的ID
}
```

### 5.2 获取评论列表
```
GET /api/comments?contentId={contentId}&page={page}&limit={limit}
```

### 5.3 删除评论
```
DELETE /api/comments/{id}
```

### 5.4 点赞评论
```
POST /api/comments/{id}/like
```

## 6. 社交功能接口

### 6.1 发送好友请求
```
POST /api/social/friend-request
```

**请求参数:**
```typescript
interface FriendRequestRequest {
  userId: string;
  message?: string;
}
```

### 6.2 处理好友请求
```
PUT /api/social/friend-request/{id}
```

**请求参数:**
```typescript
interface HandleFriendRequestRequest {
  action: 'accept' | 'reject';
}
```

### 6.3 获取好友列表
```
GET /api/social/friends?page={page}&limit={limit}
```

### 6.4 删除好友
```
DELETE /api/social/friends/{userId}
```

### 6.5 获取好友动态
```
GET /api/social/feed?page={page}&limit={limit}
```

## 7. 学习小组接口

### 7.1 创建小组
```
POST /api/groups
```

**请求参数:**
```typescript
interface CreateGroupRequest {
  name: string;
  description: string;
  avatar?: string;
  tags: string[];
  isPrivate: boolean;
}
```

### 7.2 加入小组
```
POST /api/groups/{id}/join
```

### 7.3 退出小组
```
DELETE /api/groups/{id}/leave
```

### 7.4 获取小组列表
```
GET /api/groups?page={page}&limit={limit}&tags={tags}
```

### 7.5 获取小组成员
```
GET /api/groups/{id}/members
```

## 8. 消息系统接口

### 8.1 发送私信
```
POST /api/messages
```

**请求参数:**
```typescript
interface SendMessageRequest {
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'file';
}
```

### 8.2 获取消息列表
```
GET /api/messages?userId={userId}&page={page}&limit={limit}
```

### 8.3 标记消息已读
```
PUT /api/messages/{id}/read
```

### 8.4 获取未读消息数
```
GET /api/messages/unread-count
```

## 9. AI助教接口

### 9.1 AI问答
```
POST /api/ai/chat
```

**请求参数:**
```typescript
interface ChatRequest {
  question: string;
  context?: string;
  conversationId?: string;
}
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "answer": "JavaScript是一种高级编程语言...",
    "conversationId": "conv_12345",
    "suggestions": [
      "JavaScript的历史发展",
      "JavaScript基础语法",
      "JavaScript与其他语言的区别"
    ]
  }
}
```

### 9.2 生成学习计划
```
POST /api/ai/study-plan
```

**请求参数:**
```typescript
interface StudyPlanRequest {
  subject: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  timeAvailable: number; // 每天可学习时间（分钟）
  duration: number; // 学习周期（天）
}
```

### 9.3 内容推荐
```
GET /api/ai/recommend?type={type}&limit={limit}
```

**类型参数:**
- `content`: 内容推荐
- `friends`: 好友推荐
- `groups`: 小组推荐

### 9.4 学习分析
```
GET /api/ai/analysis
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "learningTime": {
      "daily": 120, // 分钟
      "weekly": 840,
      "monthly": 3600
    },
    "progress": {
      "completedCourses": 5,
      "inProgressCourses": 3,
      "totalPoints": 1250
    },
    "strengths": ["编程", "逻辑思维"],
    "improvements": ["英语口语", "数学应用"],
    "recommendations": [
      "建议每天增加30分钟英语学习",
      "可以尝试参与更多编程实战项目"
    ]
  }
}
```

## 10. 文件上传接口

### 10.1 上传头像
```
POST /api/upload/avatar
```

**请求格式**: `multipart/form-data`

### 10.2 上传内容附件
```
POST /api/upload/attachment
```

### 10.3 上传小组头像
```
POST /api/upload/group-avatar
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.example.com/uploads/avatar_12345.jpg",
    "filename": "avatar_12345.jpg",
    "size": 1024000,
    "mimeType": "image/jpeg"
  }
}
```

## 11. 统计分析接口

### 11.1 获取用户统计
```
GET /api/stats/user
```

### 11.2 获取内容统计
```
GET /api/stats/content
```

### 11.3 获取学习进度
```
GET /api/stats/progress
```

## 12. 搜索接口

### 12.1 全局搜索
```
GET /api/search?q={keyword}&type={type}&page={page}&limit={limit}
```

**类型参数:**
- `all`: 全部
- `content`: 内容
- `user`: 用户
- `group`: 小组

### 12.2 高级搜索
```
POST /api/search/advanced
```

**请求参数:**
```typescript
interface AdvancedSearchRequest {
  keyword: string;
  filters: {
    type?: string[];
    tags?: string[];
    difficulty?: number[];
    dateRange?: {
      start: string;
      end: string;
    };
    author?: string;
  };
  sort: {
    field: 'relevance' | 'date' | 'popularity' | 'rating';
    order: 'asc' | 'desc';
  };
}
```

## 13. 通知系统接口

### 13.1 获取通知列表
```
GET /api/notifications?page={page}&limit={limit}&type={type}
```

### 13.2 标记通知已读
```
PUT /api/notifications/{id}/read
```

### 13.3 标记所有通知已读
```
PUT /api/notifications/read-all
```

### 13.4 删除通知
```
DELETE /api/notifications/{id}
```

## 14. 系统设置接口

### 14.1 获取系统配置
```
GET /api/system/config
```

### 14.2 获取标签列表
```
GET /api/system/tags
```

### 14.3 举报内容
```
POST /api/system/report
```

**请求参数:**
```typescript
interface ReportRequest {
  targetType: 'content' | 'user' | 'comment';
  targetId: string;
  reason: string;
  description?: string;
}
```

## 15. 错误码定义

| 错误码 | 说明 |
|--------|------|
| 10001 | 用户名已存在 |
| 10002 | 邮箱已注册 |
| 10003 | 用户名或密码错误 |
| 10004 | Token已过期 |
| 10005 | Token无效 |
| 20001 | 内容不存在 |
| 20002 | 无权限操作此内容 |
| 20003 | 内容已删除 |
| 30001 | 文件格式不支持 |
| 30002 | 文件大小超过限制 |
| 40001 | AI服务暂时不可用 |
| 40002 | 请求频率过高 |

## 16. 接口测试

### 16.1 测试环境
- **开发环境**: `http://localhost:3001/api`
- **测试环境**: `https://test-api.leearn.com/api`
- **生产环境**: `https://api.leearn.com/api`

### 16.2 测试工具
- **Postman**: 接口调试和测试
- **Swagger**: API文档和在线测试
- **Jest**: 自动化测试
- **Artillery**: 性能测试

### 16.3 测试用例
每个接口都应包含以下测试用例：
- 正常请求测试
- 参数验证测试
- 权限验证测试
- 错误处理测试
- 边界条件测试

---

本API设计文档将随着项目开发进度持续更新和完善。
