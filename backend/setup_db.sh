#!/bin/bash

# 数据库设置脚本
echo "🚀 开始设置 Leearn PostgreSQL 数据库..."

# 检查 PostgreSQL 是否安装
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL 未安装，正在安装..."
    
    # 更新包管理器
    sudo -i apt update
    
    # 安装 PostgreSQL
    sudo -i apt install -y postgresql postgresql-contrib
    
    # 启动 PostgreSQL 服务
    sudo -i systemctl start postgresql
    sudo -i systemctl enable postgresql
    
    echo "✅ PostgreSQL 安装完成"
else
    echo "✅ PostgreSQL 已安装"
fi

# 启动 PostgreSQL 服务（如果未运行）
sudo -i systemctl start postgresql

# 设置 PostgreSQL 用户和数据库
echo "🔧 配置数据库..."

# 切换到 postgres 用户并执行 SQL 命令
sudo -i -u postgres psql -c "
-- 创建数据库用户（如果不存在）
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres') THEN
        CREATE ROLE postgres WITH LOGIN PASSWORD 'password';
        ALTER ROLE postgres CREATEDB;
    END IF;
END
\$\$;

-- 设置密码
ALTER USER postgres PASSWORD 'password';

-- 创建数据库（如果不存在）
SELECT 'CREATE DATABASE leearn_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'leearn_db')\gexec
"

echo "✅ 数据库配置完成"

# 测试连接
echo "🧪 测试数据库连接..."
export PGPASSWORD=password
if psql -h localhost -U postgres -d leearn_db -c "SELECT 1;" &> /dev/null; then
    echo "✅ 数据库连接测试成功"
else
    echo "❌ 数据库连接测试失败"
    exit 1
fi

echo "🎉 数据库设置完成！"
echo "📝 连接信息:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: leearn_db"
echo "   Username: postgres"
echo "   Password: password"
echo ""
echo "🔗 DATABASE_URL: postgresql://postgres:password@localhost:5432/leearn_db"
