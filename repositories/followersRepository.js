import db from "../config/db.js";

export async function selectFollow(followerId, followedId){
    const follow = await db.query(`
        SELECT *
        FROM followers
        WHERE "follower" = $1 AND "followed" = $2;`,
        [followerId, followedId]
    );
    return follow.rows[0];
}

export async function selectMyFollows(followerId){
    const follows = await db.query(`
        SELECT *
        FROM followers
        WHERE "follower" = $1`,
        [followerId]
    );
    return follows.rowCount;
}

export async function insertNewFollow(followerId, followedId){
    return await db.query(`INSERT INTO
        followers("follower", "followed")
        VALUES ($1, $2);`,
        [followerId, followedId]
    );
}

export async function deleteFollow(followerId, followedId){
    return await db.query(`
        DELETE FROM followers
        WHERE "follower" = $1 AND "followed" = $2;`,
        [followerId, followedId]
    );
}