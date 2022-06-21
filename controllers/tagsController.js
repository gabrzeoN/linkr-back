import { tagRepository } from "../repositories/tagsRepository.js";

export async function getTagPosts(req, res) {
  const { hashtag } = req.params;
  try {
    const result = await tagRepository.getPosts(hashtag);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
}