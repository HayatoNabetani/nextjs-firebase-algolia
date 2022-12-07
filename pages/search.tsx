import algoliasearch from "algoliasearch/lite";
import { ReactNode } from "react";
// import {debounce} from "@types/debounce";
import {
    Hits,
    HitsProps,
    InstantSearch,
    SearchBox,
    SearchBoxProps,
    useInstantSearch,
} from "react-instantsearch-hooks-web";
import { Post } from "../types/post";
import { BeakerIcon } from "@heroicons/react/24/solid";

const searchClient = algoliasearch(
    "B1MTY8H7DW",
    "391d53e659d1507aea731032209983bb"
);

const Hit: HitsProps<Post>["hitComponent"] = ({ hit }) => {
    return <div>{hit.title}</div>;
};

const NoResultsBoundary = ({ children }: { children: ReactNode }) => {
    const { results } = useInstantSearch();
    if (!results.__isArtificial && results.nbHits === 0) {
        return <p>[{results.query}]の検索結果はありませんでした。</p>;
    }

    return <>{children}</>;
};

const Search = () => {
    const serach: SearchBoxProps["queryHook"] = (query, hook) => {
        hook(query);
    };
    return (
        <div>
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
                <NoResultsBoundary>
                    <Hits<Post> hitComponent={Hit} />
                </NoResultsBoundary>
            </InstantSearch>
        </div>
    );
};

export default Search;
