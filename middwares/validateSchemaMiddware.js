export default function validSchema(sch){
    return (req, res, next) => {
        const {error} = sch.validate(req.body, {abortEarly: false});
        if(error){
            return res.status(422).send(error.details.map(detail => detail.message));
        }
        next();
    }
}