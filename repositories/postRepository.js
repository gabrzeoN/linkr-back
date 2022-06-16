import db from "./../config/db.js";

export async function createPost(url, message, userId) {
    return  await db.query(`
        INSERT INTO posts(url, message, "userId")
        VALUES ($1, $2, $3)
    `, [url, message, userId])
}

export async function findPostId(userId){
    return await db.query(`SELECT * FROM posts WHERE "userId"=$1 
    ORDER BY id DESC LIMIT 1`,[userId]);
} 
