import Button from "../components/button";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { User } from "../types/user";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

const CreateAccount = () => {
    const { isLoading, isLoggedIn } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<User>();

    const onSubmit: SubmitHandler<User> = (data: User) => {
        console.log(data);
    };

    if (isLoading) {
        return true;
    }

    if (!isLoggedIn) {
        router.push("/login");
        return null;
    }
    return (
        <div className="container">
            <h1>アカウント作成</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <Button type="submit">アカウント作成</Button>
            </form>
        </div>
    );
};

export default CreateAccount;
