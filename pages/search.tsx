import algoliasearch from "algoliasearch/lite";
// import {debounce} from "@types/debounce";
import {
    Hits,
    HitsProps,
    InstantSearch,
    SearchBox,
    SearchBoxProps,
} from "react-instantsearch-hooks-web";
import { Post } from "../types/post";

const searchClient = algoliasearch(
    "B1MTY8H7DW",
    "391d53e659d1507aea731032209983bb"
);

const Hit: HitsProps<Post>["hitComponent"] = ({ hit }) => {
    return <div>{hit.title}</div>;
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
                <SearchBox queryHook={serach} />
                <Hits<Post> hitComponent={Hit} />
            </InstantSearch>
        </div>
    );
};

export default Search;
