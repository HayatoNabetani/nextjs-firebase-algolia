// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
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
        // "Bearer xxxxx"

        // todo : 最初だけinitializeAppしないといけないのか、調査
        // initializeApp({
        //     credential: cert(
        //         JSON.parse(process.env.FIREBASE_ADMIN_KEY as string)
        //     ),
        // });
        const token = req.headers.authorization?.split(" ")?.[1] as string;
        await getAuth().verifyIdToken(token);
        await res.revalidate(req.query.path as string);
        return res.json({ revalidated: true });
    } catch (e) {
        console.log(e);
        return res.status(500).send("Error revalidating");
    }
};

export default handler;
