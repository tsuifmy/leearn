use axum::{
    routing::post,
    Router,
};

use crate::handlers::ai_handler::{
    chat_with_ai, get_study_plan, get_learning_suggestions
};
use crate::database::Database;

pub fn ai_routes() -> Router<Database> {
    Router::new()
        .route("/chat", post(chat_with_ai))
        .route("/study-plan", post(get_study_plan))
        .route("/suggestions", post(get_learning_suggestions))
}
