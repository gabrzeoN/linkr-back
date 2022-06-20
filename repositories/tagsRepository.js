import db from "../config/db.js";

async function getPosts(hashtag) {
  return db.query(
    `
  SELECT posts.id, url, "userId", message
  FROM posts
  JOIN postshashtags
  ON posts.id = postshashtags."postId"
  JOIN hashtags
  ON postshashtags."hashtagId" = hashtags.id
  WHERE hashtags.name = $1`,
    [hashtag]
  );
}

export const tagRepository = {
    getPosts
  };