use axum::{
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Debug, Deserialize)]
pub struct ChatRequest {
    pub question: String,
    pub context: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct StudyPlanRequest {
    pub subject: String,
    pub level: String,
    pub goals: String,
}

#[derive(Debug, Serialize)]
pub struct ChatResponse {
    pub question: String,
    pub answer: String,
    pub timestamp: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Serialize)]
pub struct StudyPlanResponse {
    pub subject: String,
    pub level: String,
    pub goals: String,
    pub plan: String,
    pub timestamp: chrono::DateTime<chrono::Utc>,
}

// 模拟 AI 服务，实际项目中应调用真实的 AI API
async fn ask_ai(question: &str) -> String {
    // 这里是模拟的 AI 响应，实际应调用 OpenAI、Claude 等 API
    format!("这是对问题「{}」的AI回答。在实际项目中，这里会调用真实的AI服务。", question)
}

pub async fn chat_with_ai(
    Json(payload): Json<ChatRequest>,
) -> Result<Json<ChatResponse>, StatusCode> {
    if payload.question.trim().is_empty() {
        return Err(StatusCode::BAD_REQUEST);
    }

    let answer = ask_ai(&payload.question).await;
    
    Ok(Json(ChatResponse {
        question: payload.question,
        answer,
        timestamp: chrono::Utc::now(),
    }))
}

pub async fn get_study_plan(
    Json(payload): Json<StudyPlanRequest>,
) -> Result<Json<StudyPlanResponse>, StatusCode> {
    let prompt = format!(
        "为{}水平的学习者制定{}学习计划，目标：{}",
        payload.level, payload.subject, payload.goals
    );
    
    let plan = ask_ai(&prompt).await;
    
    Ok(Json(StudyPlanResponse {
        subject: payload.subject,
        level: payload.level,
        goals: payload.goals,
        plan,
        timestamp: chrono::Utc::now(),
    }))
}

pub async fn get_learning_suggestions(
    Json(payload): Json<Value>,
) -> Result<Json<Value>, StatusCode> {
    let interests = payload.get("interests")
        .and_then(|v| v.as_array())
        .map(|arr| {
            arr.iter()
                .filter_map(|v| v.as_str())
                .collect::<Vec<_>>()
                .join(", ")
        })
        .unwrap_or_else(|| "通用知识".to_string());

    let suggestions = ask_ai(&format!("为对{}感兴趣的学习者推荐学习内容", interests)).await;
    
    Ok(Json(json!({
        "interests": interests,
        "suggestions": suggestions,
        "timestamp": chrono::Utc::now()
    })))
}
