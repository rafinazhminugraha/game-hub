// import axios from "axios";

// export default async function handler(req: any, res: any) {
//   try {
//     const response = await axios.get("https://api.rawg.io/api/games", {
//       params: {
//         key: process.env.RAWG_API_KEY,
//         ...req.query,
//       },
//     });

//     res.status(200).json(response.data);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// }