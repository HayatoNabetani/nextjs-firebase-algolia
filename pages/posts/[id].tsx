import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr/immutable";
import { db } from "../../firebase/client";
import { Post } from "../../types/post";
import { User } from "../../types/user";

const PostDetailPage = () => {
    const [post, setPost] = useState<Post>();
    const router = useRouter();
    const postId = router.query.id;

    const { data: user } = useSWR<User>(
        post?.authorId && `users/${post.authorId}`,
        async () => {
            const ref = doc(db, `users/${post?.authorId}`);
            const snap = await getDoc(ref);
            return snap.data() as User;
        }
    );

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
            <h1>{post.title}</h1>
            {user && (
                <div className="flex">
                    <p>{user.name}</p>
                </div>
            )}
        </div>
    );
};

export default PostDetailPage;
