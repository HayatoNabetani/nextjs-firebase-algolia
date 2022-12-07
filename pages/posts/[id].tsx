import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr/immutable";
import { db } from "../../firebase/client";
import { useUser } from "../../lib/user";
import { Post } from "../../types/post";
import { User } from "../../types/user";

const PostDetailPage = () => {
    const [post, setPost] = useState<Post>();
    const router = useRouter();
    const postId = router.query.id;

    const user = useUser(post?.authorId);

    useEffect(() => {
        const ref = doc(db, `posts/${postId}`);
        getDoc(ref).then((snap) => {
            setPost(snap.data() as Post);
        });
    }, [postId]);

    if (!post) {
        return null;
    }

    return (
        <div className="container">
            <div className="aspect-video rounded-md bg-slate-200 mb-4"></div>
            <h1>{post.title}</h1>
            {user && (
                <div className="flex mb-4">
                    <div className="w-10 h-10 mr-2 bg-slate-400 rounded-full"></div>
                    <div className="flex-1">
                        <p>{user.name}</p>
                        <p className="text-slate-500">
                            {format(post.createdAt, "yyyy年MM月dd日")}
                        </p>
                    </div>
                </div>
            )}
            <p>{post.body}</p>
        </div>
    );
};

export default PostDetailPage;
