import Button from "../components/button";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { User } from "../types/user";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { ChangeEvent, ReactElement, useCallback, useState } from "react";
import Layout from "../components/layout";
import { useDropzone } from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/24/solid";
import AvatarEditor from "react-avatar-editor";

const UserForm = ({ isEditMode }: { isEditMode: boolean }) => {
    const { isLoading, fbUser } = useAuth();
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<File>();
    const [scale, setScale] = useState<number>(1.5);

    const onDropAccepted = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        setSelectedImage(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        onDropAccepted,
        accept: {
            "image/png": [],
            "image/jpeg": [],
        },
    });

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

    const handleScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setScale(parseFloat(e.target.value));
    };

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
                    <div
                        className={classNames(
                            "aspect-square w-40 grid content-center hover:cursor-pointer hover:bg-blue-100 border-slate-300 border-2 rounded-md border-dashed",
                            isDragAccept && "bg-blue-200"
                        )}
                        {...getRootProps()}
                    >
                        <div className="text-center">
                            <PhotoIcon className="w-10 mx-auto h-10 text-slate-400" />
                            <p className="text-slate-400 text-sm">画像を選択</p>
                        </div>
                        <input className="hidden" {...getInputProps()} />
                    </div>
                    {selectedImage && (
                        <div>
                            <AvatarEditor
                                image={selectedImage}
                                width={250}
                                height={250}
                                border={50}
                                borderRadius={125}
                                color={[255, 255, 255, 0.6]} // RGBA
                                scale={scale}
                                rotate={0}
                            />
                            <input
                                type="range"
                                min={1}
                                max={ 2} 
                                step={0.1} 
                                // defalutValue={1.5}
                                onChange={handleScaleChange}
                            />
                        </div>
                    )}
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
