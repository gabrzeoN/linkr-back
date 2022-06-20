import db from "./../config/db.js";

export async function createPost(url, message, userId) {
    return  await db.query(`
        INSERT INTO posts(url, message, "userId")
        VALUES ($1, $2, $3)
    `, [url, message, userId])
}

export async function selectPostById(postId){
    const user = await db.query(`
        SELECT *
        FROM posts
        WHERE id = $1;`,
        [postId]
    );
    return user.rows[0];
}

export async function findPostId(userId){
    return await db.query(`
        SELECT * 
        FROM posts 
        WHERE "userId"=$1 
        ORDER BY id 
        DESC LIMIT 1`,[userId]);
} 
export async function getPostById(postId){
    return await db.query(`
        SELECT * 
        FROM posts 
        WHERE id=$1`,
        [postId]);
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

export async function updateMessage(postId, newMessage){
    return await db.query(`
        UPDATE posts 
        SET message=$1, "createdAt"=now()
        WHERE id=$2
    `, [newMessage, postId]);
}

export async function deletePostById(postId){
    return await db.query(`
        DELETE FROM posts 
        WHERE id=$1
    `, [postId]);
}
