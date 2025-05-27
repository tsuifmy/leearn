use axum::{
    routing::{get, post, put, delete},
    Router,
};

use crate::handlers::user_handler::{
    get_users, create_user, get_user_by_id, update_user, delete_user
};
use crate::database::Database;

pub fn user_routes() -> Router<Database> {
    Router::new()
        .route("/", get(get_users).post(create_user))
        .route("/{id}", get(get_user_by_id).put(update_user).delete(delete_user))
}
