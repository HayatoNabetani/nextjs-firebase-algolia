import { useForm } from "react-hook-form";
import Button from "../components/button";
import { Post } from "../types/post";
import classNames from "classnames";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

const CreatePost = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Post>();

    const { fbUser, isLoading } = useAuth(); //配達依頼
    const router = useRouter();

    if (!fbUser) {
        if (!isLoading) {
            router.push("/login");
        }
        return null;
    }

    const onSubmit = (data: Post) => {
        console.log(data);
        const ref = doc(collection(db, "posts"));
        const post: Post = {
            id: ref.id,
            title: data.title,
            body: data.body,
            createdAt: Date.now(),
            updatedAt: null,
            authorId: fbUser.uid,
        };
        setDoc(ref, post).then(() => {
            alert("記事を作成しました。");
        });
    };

    return (
        <div>
            <h1>記事投稿</h1>

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
                                value: 50,
                                message: "50文字以内",
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
                <Button type="submit">アカウント作成</Button>
            </form>
        </div>
    );
};

export default CreatePost;
