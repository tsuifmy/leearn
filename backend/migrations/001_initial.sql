-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    bio TEXT,
    avatar_url VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create contents table
CREATE TABLE contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    body TEXT NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    likes_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create content_likes table for tracking likes
CREATE TABLE content_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(content_id, user_id)
);

-- Create comments table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create friendships table
CREATE TABLE friendships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user1_id, user2_id),
    CHECK (user1_id != user2_id),
    CHECK (status IN ('pending', 'accepted', 'blocked'))
);

-- Create indexes for better performance
CREATE INDEX idx_contents_author_id ON contents(author_id);
CREATE INDEX idx_contents_created_at ON contents(created_at DESC);
CREATE INDEX idx_content_likes_content_id ON content_likes(content_id);
CREATE INDEX idx_content_likes_user_id ON content_likes(user_id);
CREATE INDEX idx_comments_content_id ON comments(content_id);
CREATE INDEX idx_comments_author_id ON comments(author_id);
CREATE INDEX idx_friendships_user1_id ON friendships(user1_id);
CREATE INDEX idx_friendships_user2_id ON friendships(user2_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contents_updated_at BEFORE UPDATE ON contents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_friendships_updated_at BEFORE UPDATE ON friendships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to update likes_count when content_likes changes
CREATE OR REPLACE FUNCTION update_content_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE contents SET likes_count = likes_count + 1 WHERE id = NEW.content_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE contents SET likes_count = likes_count - 1 WHERE id = OLD.content_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_content_likes_count_trigger
    AFTER INSERT OR DELETE ON content_likes
    FOR EACH ROW EXECUTE FUNCTION update_content_likes_count();
