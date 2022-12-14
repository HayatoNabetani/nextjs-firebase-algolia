import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import Layout from "../components/layout";
import PostItemCard from "../components/post-item-card";
import { useAuth } from "../context/auth";
import { adminDb } from "../firebase/server";
import styles from "../styles/Home.module.css";
import { Post } from "../types/post";
import { NextPageWithLayout } from "./_app";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
;
// Import Swiper styles
import "swiper/css";

export const getStaticProps: GetStaticProps<{
    posts: Post[];
}> = async (context) => {
    const snap = await adminDb
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(20)
        .get();
    const posts = snap.docs.map((doc) => doc.data() as Post);

    return {
        props: {
            posts: posts,
        },
    };
};

const Home: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts }) => {
    const { user } = useAuth();
    console.log(user);
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div>
                    <div className="relative">
                        <Swiper
                            modules={[Navigation, Pagination, Keyboard]}
                            loop
                            navigation={{
                                nextEl: "#next",
                                prevEl: "#prev",
                            }}
                            keyboard
                            pagination={{
                                el: "#pagination",
                                bulletClass:
                                    "w-2 h-2 rounded-full block bg-slate-300 cursor-pointer",
                                bulletActiveClass: "!bg-blue-500",
                                clickable: true,
                            }}
                            spaceBetween={50}
                            slidesPerView={1}
                        >
                            {new Array(5).fill(null).map((_, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="bg-slate-200 aspect-video grid place-items-center">
                                            <p className="text-3xl font-bold text-blue-500">
                                                {index}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>

                        <div
                            id="next"
                            className="p-4 absolute top-1/2 z-10 right-0 -translate-y-1/2"
                        >
                            <ArrowRightIcon className="w-8 h-8 opacity-40" />
                        </div>
                        <div
                            id="prev"
                            className="p-4 absolute top-1/2 z-10 left-0 -translate-y-1/2"
                        >
                            <ArrowLeftIcon className="w-8 h-8 opacity-40" />
                        </div>
                    </div>

                    <div
                        id="pagination"
                        className="flex space-x-2 justify-center mt-4"
                    ></div>
                </div>

                <h2>???????????????</h2>
                {posts?.length ? (
                    <ul className="space-y-3">
                        {posts?.map((post: Post) => (
                            <li key={post.id}>
                                <PostItemCard post={post} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>???????????????????????????</p>
                )}
            </main>
        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Home;
