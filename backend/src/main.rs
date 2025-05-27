use axum::{
    response::Json,
    routing::get,
    Router,
};
use serde::Serialize;
use tower_http::cors::{Any, CorsLayer};
use tracing_subscriber;
use dotenv::dotenv;
use std::env;

mod handlers;
mod models;
mod routes;
mod database;

use database::Database;
use routes::{ai_routes, content_routes, user_routes};

#[derive(Serialize)]
struct ApiResponse {
    message: String,
    version: String,
    database_status: String,
}

async fn root() -> Json<ApiResponse> {
    Json(ApiResponse {
        message: "Leearn 平台后端 API 启动成功".to_string(),
        version: "2.0.0".to_string(),
        database_status: "Connected".to_string(),
    })
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 加载环境变量
    dotenv().ok();
    
    // 初始化日志
    tracing_subscriber::fmt::init();

    // 连接数据库
    let database_url = env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgresql://postgres:password@localhost:5432/leearn_db".to_string());
    
    let db = Database::new(&database_url).await?;
    
    // 添加 CORS 中间件
    let cors = CorsLayer::new()
        .allow_methods(Any)
        .allow_headers(Any)
        .allow_origin(Any);

    // 构建路由
    let app = Router::new()
        .route("/", get(root))
        .nest("/api/users", user_routes())
        .nest("/api/contents", content_routes())
        .nest("/api/ai", ai_routes())
        .with_state(db)
        .layer(cors);

    // 启动服务器
    let port = env::var("PORT").unwrap_or_else(|_| "3001".to_string());
    let addr = format!("0.0.0.0:{}", port);
    
    tracing::info!("🚀 Leearn 后端服务已启动，端口: {}", port);
    tracing::info!("📚 学乐无穷平台 - 因材施教，AI助力成长");
    tracing::info!("🗄️ 数据库连接已建立: {}", database_url);

    let listener = tokio::net::TcpListener::bind(&addr).await?;
    axum::serve(listener, app).await?;
    
    Ok(())
}
