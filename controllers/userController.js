import urlMetadata from "url-metadata";
import { getUserById, getUserPosts } from "../repositories/usersRepository.js";

export async function getPostsByUserId(req, res){
    const {id} = req.params;
    console.log("id", id);
    
    try {
        const userData = await getUserById(parseInt(id));
        if(userData.rowCount === 0) return res.status(404).send("user not found");

        const userPosts = await getUserPosts(parseInt(id));
        console.log(userPosts);
        if(userPosts.rowCount === 0) return res.status(200).send({userData: userData.rows[0], posts:[]});

        const posts = [...userPosts.rows];
        for(let i = 0; i < userPosts.rows.length; i++){
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
        console.log(posts);
        return res.status(200).send({userData: userData.rows[0], posts:posts});
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}