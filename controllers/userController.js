import { getUserPosts } from "../repositories/usersRepository";

export async function getPostsByUserId(req, res){
    const {id} = req.params;
    console.log(id);
    try {
        const userPosts = await getUserPosts(id);
        console.log(userPosts.rows);
        
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}