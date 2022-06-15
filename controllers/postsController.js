import { insertNewPost, obtainPosts } from "../repositories/postsRepository";

export async function createPost(req, res){

    const { userId, url, message } = req.body;

    try {
        await insertNewPost(userId, url, message);
        res.sendStatus(201);
    } catch (e) {
        res.send(e).status(500);
    }

}

export async function getPost(req, res){

    try {
        await obtainPosts();
        res.sendStatus(201);
    } catch (e) {
        res.send(e).status(500);
    }

}