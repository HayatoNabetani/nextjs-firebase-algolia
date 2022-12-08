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
        control,
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
        //data:image/png;base64,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
        // 今画像の文字列になっている

        // const ref = doc(db, `users/${fbUser.uid}`);
        // setDoc(ref, data).then(() => {
        //     alert("ユーザーを作成しました。");
        //     router.push("/");
        // });
    };
    return (
        <div className="container">
            {isEditMode ? <h1>プロフィール編集</h1> : <h1>アカウント作成</h1>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <h2 className="block mb-0.5">プロフィール画像</h2>
                    <ImageSelecter control={control} name="avatarURL" />
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
