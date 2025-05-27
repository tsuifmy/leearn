use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Content {
    pub id: Uuid,
    pub title: String,
    pub body: String,
    pub content_type: String,
    pub tags: Vec<String>,
    pub author_id: Uuid,
    pub likes_count: i32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateContentRequest {
    pub title: String,
    pub body: String,
    pub content_type: String,
    pub tags: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ContentResponse {
    pub id: Uuid,
    pub title: String,
    pub body: String,
    pub content_type: String,
    pub tags: Vec<String>,
    pub author_id: Uuid,
    pub likes_count: i32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl From<Content> for ContentResponse {
    fn from(content: Content) -> Self {
        ContentResponse {
            id: content.id,
            title: content.title,
            body: content.body,
            content_type: content.content_type,
            tags: content.tags,
            author_id: content.author_id,
            likes_count: content.likes_count,
            created_at: content.created_at,
            updated_at: content.updated_at,
        }
    }
}
