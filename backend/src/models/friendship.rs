use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "varchar", rename_all = "lowercase")]
pub enum FriendshipStatus {
    Pending,
    Accepted,
    Blocked,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Friendship {
    pub id: Uuid,
    pub user1_id: Uuid,
    pub user2_id: Uuid,
    pub status: FriendshipStatus,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateFriendshipRequest {
    pub user2_id: Uuid,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FriendshipResponse {
    pub id: Uuid,
    pub user1_id: Uuid,
    pub user2_id: Uuid,
    pub status: FriendshipStatus,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl From<Friendship> for FriendshipResponse {
    fn from(friendship: Friendship) -> Self {
        FriendshipResponse {
            id: friendship.id,
            user1_id: friendship.user1_id,
            user2_id: friendship.user2_id,
            status: friendship.status,
            created_at: friendship.created_at,
            updated_at: friendship.updated_at,
        }
    }
}
