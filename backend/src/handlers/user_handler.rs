use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::models::{User, CreateUserRequest, UserResponse, UpdateUserRequest};
use crate::database::Database;

pub async fn get_users(State(db): State<Database>) -> Result<Json<Vec<UserResponse>>, StatusCode> {
    match db.get_all_users().await {
        Ok(users) => {
            let user_responses: Vec<UserResponse> = users
                .into_iter()
                .map(|user| user.into())
                .collect();
            Ok(Json(user_responses))
        }
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn create_user(
    State(db): State<Database>,
    Json(payload): Json<CreateUserRequest>,
) -> Result<(StatusCode, Json<Value>), StatusCode> {
    // 检查用户名是否已存在
    if let Ok(Some(_)) = db.get_user_by_username(&payload.username).await {
        return Ok((
            StatusCode::BAD_REQUEST,
            Json(json!({ "message": "用户名已存在", "error": "用户名重复" }))
        ));
    }

    match db.create_user(&payload).await {
        Ok(user) => {
            let user_response: UserResponse = user.into();
            Ok((
                StatusCode::CREATED,
                Json(json!({ "message": "用户创建成功", "user": user_response }))
            ))
        }
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn get_user_by_id(
    State(db): State<Database>,
    Path(user_id): Path<Uuid>,
) -> Result<Json<UserResponse>, StatusCode> {
    match db.get_user_by_id(user_id).await {
        Ok(Some(user)) => {
            let user_response: UserResponse = user.into();
            Ok(Json(user_response))
        }
        Ok(None) => Err(StatusCode::NOT_FOUND),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn update_user(
    State(db): State<Database>,
    Path(user_id): Path<Uuid>,
    Json(payload): Json<UpdateUserRequest>,
) -> Result<Json<Value>, StatusCode> {
    match db.update_user(user_id, &payload).await {
        Ok(Some(user)) => {
            let user_response: UserResponse = user.into();
            Ok(Json(json!({ "message": "用户信息更新成功", "user": user_response })))
        }
        Ok(None) => Err(StatusCode::NOT_FOUND),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn delete_user(
    State(db): State<Database>,
    Path(user_id): Path<Uuid>,
) -> Result<Json<Value>, StatusCode> {
    match db.delete_user(user_id).await {
        Ok(true) => Ok(Json(json!({ "message": "用户删除成功" }))),
        Ok(false) => Err(StatusCode::NOT_FOUND),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}
