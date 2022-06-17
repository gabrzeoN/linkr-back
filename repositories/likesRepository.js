import db from "../config/db.js";

export async function selectLike(userId, postId){
    const like = await db.query(`
        SELECT *
        FROM likes
        WHERE "whoLiked" = $1 AND "postId" = $2;`,
        [userId, postId]
    );
    return like.rows[0];
}

export async function insertNewLike(userId, postId){
    return await db.query(`INSERT INTO
        likes("whoLiked", "postId")
        VALUES ($1, $2);`,
        [userId, postId]
    );
}

export async function deleteLike(userId, postId){
    return await db.query(`
        DELETE FROM likes
        WHERE "whoLiked" = $1 AND "postId" = $2;`,
        [userId, postId]
    );
}

export async function countLikesByPost(userId, postId){
    const like = await db.query(`
        SELECT COUNT(*)
        FROM likes
        WHERE "whoLiked" = $1 AND "postId" = $2;`,
        [userId, postId]
    );
    return like.rows[0];
}