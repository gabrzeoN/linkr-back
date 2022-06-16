import db from "./../config/db.js";

async function createPost(url, message, id) {
    return db.query(`
        INSERT INTO posts(url, message, "userId")
        VALUES ($1, $2, $3)
    `, [url, message, id])
}

async function selectPostById(postId){
    const user = await db.query(`
        SELECT *
        FROM posts
        WHERE id = $1;`,
        [postId]
    );
    return user.rows[0];
}

const postRepository={
    createPost,
    selectPostById
};

export default postRepository;