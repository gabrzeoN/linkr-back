import db from "./../config/db.js";

async function createPost(url, message, id) {
    return db.query(`
        INSERT INTO posts(url, message, "userId")
        VALUES ($1, $2, $3)
    `, [url, message, id])
}

const postRepository={
    createPost
};

export default postRepository;