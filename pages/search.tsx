import algoliasearch from "algoliasearch/lite";
import { ReactElement, ReactNode, useEffect, useState } from "react";
// import {debounce} from "@types/debounce";
import {
    Configure,
    Hits,
    HitsProps,
    InstantSearch,
    Pagination,
    SearchBox,
    SearchBoxProps,
    useInstantSearch,
} from "react-instantsearch-hooks-web";
import { Post } from "../types/post";
import { BeakerIcon } from "@heroicons/react/24/solid";
import ja from "date-fns/locale/ja";
import { db } from "../firebase/client";
import { User } from "../types/user";
import { doc, getDoc } from "firebase/firestore";
import useSWR from "swr/immutable";
import Link from "next/link";
import { useUser } from "../lib/user";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/layout";
import PostItemCard from "../components/post-item-card";

const searchClient = algoliasearch(
    "B1MTY8H7DW",
    "391d53e659d1507aea731032209983bb"
);

const NoResultsBoundary = ({ children }: { children: ReactNode }) => {
    const { results } = useInstantSearch();
    if (!results.__isArtificial && results.nbHits === 0) {
        return <p>「{results.query}」の検索結果はありませんでした。</p>;
    }

    return (
        <div>
            {results.query && (
                <p className="text-sm text-slate-500 my-4">
                    「{results.query}」の検索結果が{results.nbHits}{" "}
                    件見つかりました
                </p>
            )}
            {children}
        </div>
    );
};

const Search: NextPageWithLayout = () => {
    const serach: SearchBoxProps["queryHook"] = (query, hook) => {
        hook(query);
    };
    return (
        <div className="container">
            <h1>検索</h1>
            <InstantSearch searchClient={searchClient} indexName="posts">
                {/* Todo: debounceでの検索ができないので、一旦飛ばす */}
                {/* <SearchBox queryHook={debounce(serach, 2000)} /> */}
                <SearchBox
                    classNames={{
                        root: "relative inline-block",
                        input: "rounded-full border-slate-300 pr-10",
                        submitIcon: "hidden",
                        resetIcon: "hidden",
                    }}
                    submitIconComponent={() => (
                        <span className="absolute right-0 p-2 w-10 top-1/2 -translate-y-1/2">
                            <BeakerIcon className="w-5 h-5 text-slate-500" />
                        </span>
                    )}
                    queryHook={serach}
                />
                <Configure hitsPerPage={2} />
                <NoResultsBoundary>
                    <Hits<Post>
                        classNames={{
                            list: "space-y-4 my-6",
                        }}
                        hitComponent={({hit}) => <PostItemCard post={hit} />}
                    />
                    <Pagination
                        classNames={{
                            list: "flex space-x-3",
                            link: "py-1 px-3 block",
                            disabledItem: "opacity-40",
                            selectedItem: "text-blue-500",
                        }}
                    />
                </NoResultsBoundary>
            </InstantSearch>
        </div>
    );
};

Search.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Search;
