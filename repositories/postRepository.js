import db from "./../config/db.js";

async function createPost(url, message, userId) {
    return db.query(`
        INSERT INTO posts(url, message, "userId")
        VALUES ($1, $2, $3)
    `, [url, message, userId])
}

async function findPostId(userId){
    return db.query(`SELECT * FROM posts WHERE "userId"=$1 
    ORDER BY "createdAt" DESC limit 1`,[userId]);
} 
const postRepository={
    createPost,
    findPostId

};

export default postRepository;