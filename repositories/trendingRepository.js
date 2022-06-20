import db from "../config/db.js"

export async function trending(limit) {
  return await db.query(`
    SELECT hashtags.name AS hashtag, COUNT("hashtagId") AS frequency FROM "postshashtags" 
      JOIN hashtags ON "hashtagId"=hashtags.id 
      JOIN posts ON "postId"=posts.id 
    WHERE posts."createdAt" > now() - interval '1 day' 
    GROUP BY hashtags.name
    ORDER BY frequency DESC
    LIMIT $1
  `, [limit]);
}