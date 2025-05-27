use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::models::{Content, CreateContentRequest, ContentResponse};
use crate::database::Database;

pub async fn get_contents(State(db): State<Database>) -> Result<Json<Vec<ContentResponse>>, StatusCode> {
    match db.get_all_contents().await {
        Ok(contents) => {
            let content_responses: Vec<ContentResponse> = contents
                .into_iter()
                .map(|content| content.into())
                .collect();
            Ok(Json(content_responses))
        }
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn create_content(
    State(db): State<Database>,
    Json(payload): Json<CreateContentRequest>,
) -> Result<(StatusCode, Json<Value>), StatusCode> {
    // 这里假设作者 ID，实际项目中应从认证信息获取
    let author_id = Uuid::new_v4(); // 临时 ID，实际应从 JWT 或 session 获取
    
    match db.create_content(&payload, author_id).await {
        Ok(content) => {
            let content_response: ContentResponse = content.into();
            Ok((
                StatusCode::CREATED,
                Json(json!({ "message": "内容创建成功", "content": content_response }))
            ))
        }
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn get_content_by_id(
    State(db): State<Database>,
    Path(content_id): Path<Uuid>,
) -> Result<Json<ContentResponse>, StatusCode> {
    match db.get_content_by_id(content_id).await {
        Ok(Some(content)) => {
            let content_response: ContentResponse = content.into();
            Ok(Json(content_response))
        }
        Ok(None) => Err(StatusCode::NOT_FOUND),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn update_content(
    State(db): State<Database>,
    Path(content_id): Path<Uuid>,
    Json(payload): Json<CreateContentRequest>,
) -> Result<Json<Value>, StatusCode> {
    match db.update_content(content_id, &payload).await {
        Ok(Some(content)) => {
            let content_response: ContentResponse = content.into();
            Ok(Json(json!({ "message": "内容更新成功", "content": content_response })))
        }
        Ok(None) => Err(StatusCode::NOT_FOUND),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn delete_content(
    State(db): State<Database>,
    Path(content_id): Path<Uuid>,
) -> Result<Json<Value>, StatusCode> {
    match db.delete_content(content_id).await {
        Ok(true) => Ok(Json(json!({ "message": "内容删除成功" }))),
        Ok(false) => Err(StatusCode::NOT_FOUND),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn like_content(
    State(db): State<Database>,
    Path(content_id): Path<Uuid>,
    Json(payload): Json<Value>,
) -> Result<Json<Value>, StatusCode> {
    // 这里假设用户 ID，实际项目中应从认证信息获取
    let user_id = payload.get("user_id")
        .and_then(|v| v.as_str())
        .and_then(|s| Uuid::parse_str(s).ok())
        .unwrap_or_else(|| Uuid::new_v4());
    
    match db.like_content(content_id, user_id).await {
        Ok(true) => Ok(Json(json!({ "message": "点赞成功" }))),
        Ok(false) => Ok(Json(json!({ "message": "已经点赞过了" }))),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn unlike_content(
    State(db): State<Database>,
    Path(content_id): Path<Uuid>,
    Json(payload): Json<Value>,
) -> Result<Json<Value>, StatusCode> {
    let user_id = payload.get("user_id")
        .and_then(|v| v.as_str())
        .and_then(|s| Uuid::parse_str(s).ok())
        .unwrap_or_else(|| Uuid::new_v4());
    
    match db.unlike_content(content_id, user_id).await {
        Ok(true) => Ok(Json(json!({ "message": "取消点赞成功" }))),
        Ok(false) => Ok(Json(json!({ "message": "尚未点赞" }))),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}
