import urlMetadata from "url-metadata";
import {createPost, findPostId, obtainPosts} from "../repositories/postRepository.js";
import { addPostHashtags } from "../repositories/postHashRepository.js";

export async function getPost(req, res){
    try {
        const result = await obtainPosts();
        if(result.rowCount === 0) {
            return res.send("There are no posts yet").status(200);
        }
        const posts = [...result.rows];
        for(let i = 0; i < result.rows.length; i++){
            const metadata = await urlMetadata(posts[i].url);
            posts[i] = {
                ...posts[i],
                metadata: {
                    title: metadata.title,
                    image: metadata.image,
                    description: metadata.description
                }
            };
        }
        return res.status(200).send(posts);
    } catch (e) {
        return res.send("An error occurred. Please, try again later").status(500);
    }
}

export async function addPost(req, res){
    const {userId} = res.locals.session;
    const {hashtags} = res.locals;
    const {url, message} = req.body;
    try {
        await createPost(url, message, userId);  
        if(hashtags){
            for(let i = 0; i < hashtags.length; i++){
                let hashtagId = hashtags[i];
                const postsUserList = await findPostId(userId);
                let postId = postsUserList.rows[0].id; 
                await addPostHashtags(postId, hashtagId);
            }
        }
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }
}



