import { obtainPosts } from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

export async function getPost(req, res){

    /* const metadata = null; */

    try {
        const result = await obtainPosts();
        if (result.rowCount === 0) {
            return send("There are no posts yet");
        }
        const posts = result.rows;
        res.send(posts);
    } catch (e) {
        res.send("An error occurred. Please, try again later").status(500);
    }

}