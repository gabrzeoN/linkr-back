export async function getPostsByUserId(req, res){
    const {id} = req.params;
    console.log(id);
    try {

        
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}