import classNames from "classnames";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";
import Layout from "../components/layout";
import { useAuth } from "../context/auth";
import { db } from "../firebase/client";
import { User } from "../types/user";


import ImageSelecter from "./image-selecter";

const UserForm = ({ isEditMode }: { isEditMode: boolean }) => {
    const { isLoading, fbUser } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<User>();

    if (isLoading) {
        return null;
    }
    if (!fbUser) {
        return null;
    }


    const onSubmit: SubmitHandler<User> = (data: User) => {
        console.log(data);
        const ref = doc(db, `users/${fbUser.uid}`);
        setDoc(ref, data).then(() => {
            alert("ユーザーを作成しました。");
            router.push("/");
        });
    };
    return (
        <div className="container">
            {isEditMode ? <h1>プロフィール編集</h1> : <h1>アカウント作成</h1>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <h2 className="block mb-0.5">プロフィール画像</h2>
                    <ImageSelecter />
                </div>
                <div>
                    <label className="block mb-0.5" htmlFor="name">
                        名前*：
                    </label>
                    <input
                        className={classNames(
                            "rounded border",
                            errors.name ? "border-red-500" : "border-slate-300"
                        )}
                        {...register("name", {
                            required: "必須です。",
                            maxLength: {
                                value: 50,
                                message: "50文字以内",
                            },
                        })}
                        autoComplete="name"
                        type="text"
                        name="name"
                        id="name"
                    />
                    {errors.name && (
                        <p className="text-red-500 mt-0.5">
                            {errors.name?.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block mb-0.5" htmlFor="nickname">
                        ニックネーム*：
                    </label>
                    <input
                        className={classNames(
                            "rounded border",
                            errors.name ? "border-red-500" : "border-slate-300"
                        )}
                        {...register("nickname", {
                            required: "必須です。",
                            maxLength: {
                                value: 50,
                                message: "50文字以内",
                            },
                        })}
                        autoComplete="off"
                        type="text"
                        name="nickname"
                        id="nickname"
                    />
                    {errors.nickname && (
                        <p className="text-red-500 mt-0.5">
                            {errors.nickname?.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block mb-0.5" htmlFor="profile">
                        プロフィール*：
                    </label>
                    <textarea
                        defaultValue=""
                        className={classNames(
                            "rounded border",
                            errors.name ? "border-red-500" : "border-slate-300"
                        )}
                        {...register("profile", {
                            required: "必須です。",
                            maxLength: {
                                value: 255,
                                message: "255文字以内",
                            },
                        })}
                        name="profile"
                        id="profile"
                    />
                    <p className="text-sm text-slate-400 leading-none">
                        {watch("profile")?.length || 0} / 255
                    </p>
                    {errors.profile && (
                        <p className="text-red-500 mt-0.5">
                            {errors.profile?.message}
                        </p>
                    )}
                </div>

                <Button type="submit">
                    {isEditMode ? "更新" : "アカウント作成"}
                </Button>
            </form>
        </div>
    );
};

UserForm.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default UserForm;
