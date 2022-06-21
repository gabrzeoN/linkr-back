import urlMetadata from "url-metadata";
import {createPost, findPostId, getPostById, obtainPosts, updateMessage, deletePostById} from "../repositories/postRepository.js";
import { addPostHashtags, deletePostHashtags } from "../repositories/postHashRepository.js";
import {deleteLike} from "./../repositories/likesRepository.js"


export async function getPost(req, res){
    try {
        const result = await obtainPosts();
        if(result.rowCount === 0) {
            return res.sendStatus(200);
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

export async function updatePost(req, res){
    const {postId, userId, newMessage} = req.body;
    const {hashtags} = res.locals;
    console.log(req.body);
    try {
        await deletePostHashtags(postId);
        await updateMessage(postId, newMessage);

        if(hashtags){
            for(let i = 0; i < hashtags.length; i++){
                let hashtagId = hashtags[i];
                await addPostHashtags(postId, hashtagId);
            }
        }
        const newpost = await getPostById(postId);
        res.status(200).send(newpost.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).send("An error occurred. Please, try again later");
    }
}

export async function deletePost(req, res){
    const {postId} = req.params;
    const {userId} = res.locals.session;
    console.log(postId);
    try {
        await deleteLike(userId, postId);
        await deletePostHashtags(postId);
        await deletePostById(postId);
        res.sendStatus(200);

    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }
}

export async function getPostsByUser(req, res){
    const {id} = req.params;
    console.log(req.params);
    const userPosts = [];

    try {
        const result = await obtainPostsByUser(id);
        console.log("aaaaa", result.rows);
        if(result.rowCount === 0) {
            return res.sendStatus(200);
        }
        const posts = [...result.rows];
        
        for(let i = 0; i < result.rows.length; i++){
                const metadata = await urlMetadata(result.rows[i].url);
                result.rows[i] = {
                ...result.rows[i],
                metadata: {
                    title: metadata.title,
                    image: metadata.image,
                    description: metadata.description
                }};

                userPosts.push(result.rows[i]);
                console.log("ccccc", userPosts);
            
        }
        console.log("bbbb", userPosts);

        return res.status(200).send(userPosts);
    } catch (e) {
        return res.send("An error occurred. Please, try again later").status(500);
    }
}