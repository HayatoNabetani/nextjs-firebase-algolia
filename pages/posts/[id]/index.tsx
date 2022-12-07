import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import useSWR from "swr/immutable";
import Layout from "../../../components/layout";
import { useAuth } from "../../../context/auth";
import { db } from "../../../firebase/client";
import { adminDb } from "../../../firebase/server";
import { useUser } from "../../../lib/user";
import { Post } from "../../../types/post";
import { User } from "../../../types/user";
import { NextPageWithLayout } from "../../_app";

export const getStaticProps: GetStaticProps<{
    post: Post;
}> = async (context) => {
    // 先にデータを作っておくよー
    const snap = await adminDb.doc(`posts/${context.params?.id}`).get();
    const post = snap.data() as Post;

    return {
        props: {
            post: post,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

const PostDetailPage: NextPageWithLayout = ({
    post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const user = useUser(post?.authorId);
    const { fbUser } = useAuth();
    const isAuthor = fbUser?.uid === post?.authorId;

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
            {isAuthor && <Link href={`/posts/${post.id}/edit`}>編集</Link>}
        </div>
    );
};

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default PostDetailPage;
