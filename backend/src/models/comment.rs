use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Comment {
    pub id: Uuid,
    pub content_id: Uuid,
    pub author_id: Uuid,
    pub content: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateCommentRequest {
    pub content_id: Uuid,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CommentResponse {
    pub id: Uuid,
    pub content_id: Uuid,
    pub author_id: Uuid,
    pub content: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl From<Comment> for CommentResponse {
    fn from(comment: Comment) -> Self {
        CommentResponse {
            id: comment.id,
            content_id: comment.content_id,
            author_id: comment.author_id,
            content: comment.content,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
        }
    }
}
