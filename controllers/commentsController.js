import { createComment, listComments, numberComments } from "../repositories/commentsRepository.js";


export async function postComment(req, res) {
    const { userId } = res.locals.session
    const { text, postId } = req.body
    try {
        await createComment(text, postId, userId);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error.message)
        return res.sendStatus(500);
    }
}

export async function getComments(req, res) {
    const { postId } = req.params
    try {
        const comments = await listComments(postId);
        res.status(200).send(comments.rows)
    } catch (error) {
        console.log(error.message)
        return res.sendStatus(500);
    }
}

export async function commentsCounter(req, res) {
    const id = req.params.postId
    try {
        const comments = await numberComments(id)
        const counter = comments.toString()
        return res.status(200).send(counter);
    } catch (error) {
        console.log(error.message)
        return res.sendStatus(500);
    }
}