// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
    | {
          revalidated: boolean;
      }
    | string;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    //     return res.status(401).json({ message: "Invalid token" });
    // }

    try {
        // ここで再生成するページを決める
        await res.revalidate(req.query.path as string);
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send("Error revalidating");
    }
};

export default handler;