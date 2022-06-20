import { trending } from "../repositories/trendingRepository.js";

export async function getTrending(req, res) {
  const { limit } = req.params;

  try {
    const { rows: trendingHashtags } = await trending(limit);

    res.send(trendingHashtags);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}