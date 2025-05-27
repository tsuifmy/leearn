#!/bin/bash

# Leearn 后端 API 测试脚本

BASE_URL="http://localhost:3001"

echo "🧪 开始测试 Leearn 后端 API..."
echo "================================"

# 测试根路径
echo "📍 测试根路径..."
curl -s "$BASE_URL/" | jq .
echo -e "\n"

# 测试获取所有用户
echo "👥 测试获取所有用户..."
curl -s "$BASE_URL/api/users" | jq .
echo -e "\n"

# 测试创建用户
echo "➕ 测试创建用户..."
USER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "email": "alice@example.com", "password": "password123"}')
echo "$USER_RESPONSE" | jq .
USER_ID=$(echo "$USER_RESPONSE" | jq -r '.user.id // .id // empty')
echo "用户 ID: $USER_ID"
echo -e "\n"

# 测试获取特定用户
if [ ! -z "$USER_ID" ]; then
    echo "🔍 测试获取特定用户..."
    curl -s "$BASE_URL/api/users/$USER_ID" | jq .
    echo -e "\n"
fi

# 测试获取所有内容
echo "📝 测试获取所有内容..."
curl -s "$BASE_URL/api/contents" | jq .
echo -e "\n"

# 测试创建内容
echo "➕ 测试创建内容..."
if [ ! -z "$USER_ID" ]; then
    CONTENT_RESPONSE=$(curl -s -X POST "$BASE_URL/api/contents" \
      -H "Content-Type: application/json" \
      -d "{\"title\": \"Alice的第一篇文章\", \"body\": \"这是一篇关于学习的心得体会\", \"author\": \"$USER_ID\", \"tags\": [\"学习\", \"心得\"]}")
    echo "$CONTENT_RESPONSE" | jq .
    CONTENT_ID=$(echo "$CONTENT_RESPONSE" | jq -r '.content.id // .id // empty')
    echo "内容 ID: $CONTENT_ID"
    echo -e "\n"
fi

# 测试点赞功能
if [ ! -z "$CONTENT_ID" ] && [ ! -z "$USER_ID" ]; then
    echo "👍 测试点赞功能..."
    curl -s -X POST "$BASE_URL/api/contents/$CONTENT_ID/like" \
      -H "Content-Type: application/json" \
      -d "{\"user_id\": \"$USER_ID\"}" | jq .
    echo -e "\n"
    
    echo "🔍 查看点赞后的内容状态..."
    curl -s "$BASE_URL/api/contents/$CONTENT_ID" | jq .
    echo -e "\n"
fi

# 测试AI聊天
echo "🤖 测试AI聊天..."
curl -s -X POST "$BASE_URL/api/ai/chat" \
  -H "Content-Type: application/json" \
  -d '{"question": "请解释一下什么是Rust编程语言"}' | jq .
echo -e "\n"

# 测试AI学习计划
echo "📚 测试AI学习计划..."
curl -s -X POST "$BASE_URL/api/ai/study-plan" \
  -H "Content-Type: application/json" \
  -d '{"subject": "Rust编程", "level": "初级", "goals": "掌握Rust基础语法和所有权概念"}' | jq .
echo -e "\n"

echo "✅ API 测试完成！"
