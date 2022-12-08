import Link from "next/link";
import { Post } from "../types/post";
import { format, formatDistance, formatDistanceToNow } from "date-fns";
import { useUser } from "../lib/user";
import ja from "date-fns/locale/ja";

const PostItemCard = ({ post }: { post: Post }) => {
    const user = useUser(post?.authorId);

    return (
        <div className="rounded-md shadow p-4">
            <h2 className="line-clamp-3">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            {user && (
                <div className="flex items-center">
                    <img
                        src={user?.avatarURL}
                        className="w-10 h-10 block rounded-full"
                    />
                    <div>
                        <p className="truncate">{user.name}</p>
                        <p className="text-slate-500 text-sm">
                            {format(post.createdAt, "yyyy年MM月dd日")}
                        </p>
                        <p className="text-slate-500 text-sm">
                            {formatDistanceToNow(post.createdAt, {
                                locale: ja,
                            })}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostItemCard;
