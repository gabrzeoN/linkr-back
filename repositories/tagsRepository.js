import db from "../config/db.js";


async function getPosts(hashtag) {
  console.log(hashtag);
  return db.query(
    `
    SELECT
    users.id AS "userId",
    users.name,
    users.image AS "image",
    posts.id,
    posts.url,
    posts.message,
    posts."createdAt"
        FROM posts
        JOIN postshashtags ON postshashtags."postId" = posts.id
        JOIN hashtags ON hashtags.id = postshashtags."hashtagId"
        JOIN users ON users.id = posts."userId"
        WHERE hashtags.name = $1
        GROUP BY
            posts.id, users.name, users.image, users.id
        ORDER BY posts.id DESC
        LIMIT 20`,
        [hashtag]
    );
  }

export const tagRepository = {
    getPosts
  };