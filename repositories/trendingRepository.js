import db from "../config/db.js"

export async function trending() {
  return await db.query(`
    SELECT hashtags.name AS hashtag, COUNT("hashtagId") AS frequency FROM "postshashtags" 
      JOIN hashtags ON "hashtagId"=hashtags.id 
      JOIN posts ON "postId"=posts.id 
    WHERE posts."createdAt" > now()
    GROUP BY hashtags.name
    ORDER BY frequency DESC
    LIMIT 10
  `);
}