import { useForm } from "react-hook-form";
import Button from "../components/button";
import { Post } from "../types/post";
import classNames from "classnames";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/client";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PostForm = ({ isEditMode }: { isEditMode: boolean }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<Post>();

    const { fbUser, isLoading } = useAuth();
    const router = useRouter();
    const editTargetId = router.query.id as string;

    useEffect(() => {
        if (editTargetId) {
            const ref = doc(db, `posts/${editTargetId}`);
            getDoc(ref).then((snap) => {
                const oldPost = snap.data() as Post;
                reset(oldPost);
            });
        }
    }, [editTargetId]);

    if (!fbUser) {
        if (!isLoading) {
            router.push("/login");
        }
        return null;
    }

    const onSubmit = (data: Post) => {
        console.log(data);
        const ref = isEditMode
            ? doc(db, `posts/${editTargetId}`)
            : doc(collection(db, "posts"));
        const post: Post = {
            id: isEditMode ? editTargetId : ref.id,
            title: data.title,
            body: data.body,
            createdAt: isEditMode ? data.createdAt : Date.now(),
            updatedAt: isEditMode ? Date.now() : null,
            authorId: fbUser.uid,
        };
        setDoc(ref, post).then(async () => {
            const path = `/posts/${post.id}`;
            const token = await auth.currentUser?.getIdToken(true);
            fetch(`/api/revalidate?path=${path}`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(`記事を${isEditMode ? "編集" : "投稿"}しました。`);
                })
                .catch((e) => {
                    console.log(e);
                    alert("ページの再生成に失敗しました。");
                });
        });
    };

    const deletePost = () => {
        const ref = doc(db, `posts/${editTargetId}`);
        return deleteDoc(ref).then(() => {
            alert("記事を削除しました。");
            router.push("/");
        });
    };

    return (
        <div>
            <h1>記事{isEditMode ? "編集" : "投稿"}</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block mb-0.5" htmlFor="name">
                        タイトル*：
                    </label>
                    <input
                        className={classNames(
                            "rounded border",
                            errors.title ? "border-red-500" : "border-slate-300"
                        )}
                        {...register("title", {
                            required: "必須です。",
                            maxLength: {
                                value: 100,
                                message: "100文字以内",
                            },
                        })}
                        autoComplete="title"
                        type="text"
                        name="title"
                        id="title"
                    />
                    {errors.title && (
                        <p className="text-red-500 mt-0.5">
                            {errors.title?.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block mb-0.5" htmlFor="profile">
                        本文*：
                    </label>
                    <textarea
                        defaultValue=""
                        className={classNames(
                            "rounded border",
                            errors.body ? "border-red-500" : "border-slate-300"
                        )}
                        {...register("body", {
                            required: "必須です。",
                            maxLength: {
                                value: 255,
                                message: "255文字以内",
                            },
                        })}
                        name="body"
                        id="body"
                    />
                    {errors.body && (
                        <p className="text-red-500 mt-0.5">
                            {errors.body?.message}
                        </p>
                    )}
                </div>
                <Button type="submit">{isEditMode ? "更新" : "投稿"}</Button>
                <button type="button" onClick={deletePost}>
                    削除
                </button>
            </form>
        </div>
    );
};

export default PostForm;
