use sqlx::{PgPool, FromRow};
use uuid::Uuid;
use anyhow::Result;
use crate::models::*;

#[derive(Clone)]
pub struct Database {
    pool: PgPool,
}

impl Database {
    pub async fn new(database_url: &str) -> Result<Self> {
        let pool = PgPool::connect(database_url).await?;
        
        // Run migrations - for development, we'll handle this manually
        // sqlx::migrate!("./migrations").run(&pool).await?;
        
        Ok(Database { pool })
    }

    // User operations
    pub async fn create_user(&self, request: &CreateUserRequest) -> Result<User> {
        let user = sqlx::query_as::<_, User>(
            r#"
            INSERT INTO users (username, email, password_hash, display_name, bio, avatar_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, username, email, password_hash, display_name, bio, avatar_url, created_at, updated_at
            "#
        )
        .bind(&request.username)
        .bind(&request.email)
        .bind("placeholder_hash") // In real app, hash the password
        .bind(&request.display_name)
        .bind(&request.bio)
        .bind(&request.avatar_url)
        .fetch_one(&self.pool)
        .await?;

        Ok(user)
    }

    pub async fn get_user_by_id(&self, id: Uuid) -> Result<Option<User>> {
        let user = sqlx::query_as::<_, User>(
            "SELECT * FROM users WHERE id = $1"
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await?;

        Ok(user)
    }

    pub async fn get_user_by_username(&self, username: &str) -> Result<Option<User>> {
        let user = sqlx::query_as::<_, User>(
            "SELECT * FROM users WHERE username = $1"
        )
        .bind(username)
        .fetch_optional(&self.pool)
        .await?;

        Ok(user)
    }

    pub async fn get_all_users(&self) -> Result<Vec<User>> {
        let users = sqlx::query_as::<_, User>(
            "SELECT * FROM users ORDER BY created_at DESC"
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(users)
    }

    pub async fn update_user(&self, id: Uuid, request: &UpdateUserRequest) -> Result<Option<User>> {
        let user = sqlx::query_as::<_, User>(
            r#"
            UPDATE users 
            SET display_name = COALESCE($2, display_name),
                bio = COALESCE($3, bio),
                avatar_url = COALESCE($4, avatar_url)
            WHERE id = $1
            RETURNING id, username, email, password_hash, display_name, bio, avatar_url, created_at, updated_at
            "#
        )
        .bind(id)
        .bind(&request.display_name)
        .bind(&request.bio)
        .bind(&request.avatar_url)
        .fetch_optional(&self.pool)
        .await?;

        Ok(user)
    }

    pub async fn delete_user(&self, id: Uuid) -> Result<bool> {
        let result = sqlx::query(
            "DELETE FROM users WHERE id = $1"
        )
        .bind(id)
        )
        .execute(&self.pool)
        .await?;

        Ok(result.rows_affected() > 0)
    }

    // Content operations
    pub async fn create_content(&self, request: &CreateContentRequest, author_id: Uuid) -> Result<Content> {
        let content = sqlx::query_as::<_, Content>(
            r#"
            INSERT INTO contents (title, body, content_type, tags, author_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, title, body, content_type, tags, author_id, likes_count, created_at, updated_at
            "#
        )
        .bind(&request.title)
        .bind(&request.body)
        .bind(&request.content_type)
        .bind(&request.tags)
        .bind(author_id)
        .fetch_one(&self.pool)
        .await?;

        Ok(content)
    }

    pub async fn get_content_by_id(&self, id: Uuid) -> Result<Option<Content>> {
        let content = sqlx::query_as::<_, Content>(
            "SELECT * FROM contents WHERE id = $1"
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await?;

        Ok(content)
    }

    pub async fn get_all_contents(&self) -> Result<Vec<Content>> {
        let contents = sqlx::query_as::<_, Content>(
            "SELECT * FROM contents ORDER BY created_at DESC"
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(contents)
    }

    pub async fn update_content(&self, id: Uuid, request: &CreateContentRequest) -> Result<Option<Content>> {
        let content = sqlx::query_as::<_, Content>(
            r#"
            UPDATE contents 
            SET title = $2, body = $3, content_type = $4, tags = $5
            WHERE id = $1
            RETURNING id, title, body, content_type, tags, author_id, likes_count, created_at, updated_at
            "#
        )
        .bind(id)
        .bind(&request.title)
        .bind(&request.body)
        .bind(&request.content_type)
        .bind(&request.tags)
        .fetch_optional(&self.pool)
        .await?;

        Ok(content)
    }

    pub async fn delete_content(&self, id: Uuid) -> Result<bool> {
        let result = sqlx::query(
            "DELETE FROM contents WHERE id = $1"
        )
        .bind(id)
        .execute(&self.pool)
        .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn like_content(&self, content_id: Uuid, user_id: Uuid) -> Result<bool> {
        let result = sqlx::query(
            r#"
            INSERT INTO content_likes (content_id, user_id)
            VALUES ($1, $2)
            ON CONFLICT (content_id, user_id) DO NOTHING
            "#
        )
        .bind(content_id)
        .bind(user_id)
        .execute(&self.pool)
        .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn unlike_content(&self, content_id: Uuid, user_id: Uuid) -> Result<bool> {
        let result = sqlx::query(
            "DELETE FROM content_likes WHERE content_id = $1 AND user_id = $2"
        )
        .bind(content_id)
        .bind(user_id)
        .execute(&self.pool)
        .await?;

        Ok(result.rows_affected() > 0)
    }

    // Comment operations
    pub async fn create_comment(&self, request: &CreateCommentRequest, author_id: Uuid) -> Result<Comment> {
        let comment = sqlx::query_as::<_, Comment>(
            r#"
            INSERT INTO comments (content_id, author_id, content)
            VALUES ($1, $2, $3)
            RETURNING id, content_id, author_id, content, created_at, updated_at
            "#
        )
        .bind(request.content_id)
        .bind(author_id)
        .bind(&request.content)
        .fetch_one(&self.pool)
        .await?;

        Ok(comment)
    }

    pub async fn get_comments_by_content_id(&self, content_id: Uuid) -> Result<Vec<Comment>> {
        let comments = sqlx::query_as::<_, Comment>(
            "SELECT * FROM comments WHERE content_id = $1 ORDER BY created_at ASC"
        )
        .bind(content_id)
        .fetch_all(&self.pool)
        .await?;

        Ok(comments)
    }

    // Friendship operations
    pub async fn create_friendship(&self, user1_id: Uuid, user2_id: Uuid) -> Result<Friendship> {
        let friendship = sqlx::query_as::<_, Friendship>(
            r#"
            INSERT INTO friendships (user1_id, user2_id, status)
            VALUES ($1, $2, 'pending')
            RETURNING id, user1_id, user2_id, status, created_at, updated_at
            "#
        )
        .bind(user1_id)
        .bind(user2_id)
        .fetch_one(&self.pool)
        .await?;

        Ok(friendship)
    }

    pub async fn get_friendships_by_user_id(&self, user_id: Uuid) -> Result<Vec<Friendship>> {
        let friendships = sqlx::query_as::<_, Friendship>(
            r#"
            SELECT id, user1_id, user2_id, status, created_at, updated_at
            FROM friendships 
            WHERE user1_id = $1 OR user2_id = $1
            ORDER BY created_at DESC
            "#
        )
        .bind(user_id)
        .fetch_all(&self.pool)
        .await?;

        Ok(friendships)
    }
}
