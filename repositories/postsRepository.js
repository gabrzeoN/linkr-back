import db from "../config/db.js";

export async function insertNewPost (userId, userImage, url, message){
    return await db.query(`
    
        INSERT INTO posts(userId, "userImage", "url", "message")
        VALUES ($1, $2, $3, $4);

    `, [userId, userImage, url, message]);
}

export async function obtainPosts (){
    return await db.query(`
    
        SELECT * FROM posts
        ORDER BY "createdAt" DESC,
        LIMIT 20;

    `);

    /* return posts.rows; */
} 
