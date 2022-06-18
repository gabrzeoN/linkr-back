import db from "../config/db.js";

export async function addPostHashtags(postId, hashtagId){
    return await db.query(`
        INSERT INTO postshashtags("postId", "hashtagId")
        VALUES ($1, $2)
    `, [postId, hashtagId]);
}

export async function deletePostHashtags(postId){
    return await db.query(`
        DELETE FROM postshashtags WHERE "postId"=$1
    `, [postId]);
}