import classNames from "classnames";
import { doc, setDoc } from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadString,
} from "firebase/storage";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";
import Layout from "../components/layout";
import { useAuth } from "../context/auth";
import { db, storage } from "../firebase/client";
import { User } from "../types/user";

import ImageSelecter from "./image-selecter";

const UserForm = ({ isEditMode }: { isEditMode: boolean }) => {
    const { isLoading, fbUser, user } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<User>();

    useEffect(() => {
        if (isEditMode && user) {
            reset(user);
        }
    }, [isEditMode, user]);

    if (isLoading) {
        return null;
    }
    if (!fbUser) {
        return null;
    }
    // このままだと、途中で切れてしまったら、変な挙動があり得る。 => 本来はサーバーでやるのがいいかもね。
    const onSubmit: SubmitHandler<User> = async (data: User) => {
        if (data.avatarURL?.match(/^data:/)) {
            const imageRef = ref(storage, `/users/${fbUser.uid}/avater`);
            await uploadString(imageRef, data.avatarURL, "data_url");
            data.avatarURL = await getDownloadURL(imageRef);
        }

        if (!data.avatarURL && user?.avatarURL) {
            const imageRef = ref(storage, `/users/${fbUser.uid}/avater`);
            await deleteObject(imageRef);
        }

        const documentRef = doc(db, `users/${fbUser.uid}`);
        return setDoc(documentRef, data).then(() => {
            alert(isEditMode ? `更新しました。` : `ユーザーを作成しました。`);
            if (!isEditMode) {
                router.push("/");
            }
        });
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

                <Button disabled={isSubmitting} type="submit">
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
