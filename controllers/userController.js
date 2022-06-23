import urlMetadata from "url-metadata";
import { getUserPosts } from "../repositories/usersRepository.js";


export async function getPostsByUserId(req, res){
    const {id} = req.params;
    console.log(id);
    try {
        const userPosts = await getUserPosts(parseInt(id));
        console.log(userPosts.rows);
        if(userPosts.rowCount === 0) return res.sendStatus(200);

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
        return res.status(200).send(posts);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}