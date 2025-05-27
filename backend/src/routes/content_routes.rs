use axum::{
    routing::{get, post, put, delete},
    Router,
};

use crate::handlers::content_handler::{
    get_contents, create_content, get_content_by_id, update_content, delete_content, like_content, unlike_content
};
use crate::database::Database;

pub fn content_routes() -> Router<Database> {
    Router::new()
        .route("/", get(get_contents).post(create_content))
        .route("/{id}", get(get_content_by_id).put(update_content).delete(delete_content))
        .route("/{id}/like", post(like_content).delete(unlike_content))
}
