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

export async function obtainPosts (){
    return await db.query(`
        SELECT
            usr.id AS "userId",
            usr.name,
            usr.image AS "image",
            pst.id,
            pst.url,
            pst.message,
            pst."createdAt"
        FROM posts pst
        JOIN users usr
            ON usr.id = pst."userId"
        ORDER BY "createdAt" DESC
        LIMIT 20;
    `);
} 