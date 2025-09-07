import { createContext, useContext } from "react";
import type { RedditData, RedditQueries } from "./types";

export const QueriesContext = createContext<RedditQueries | undefined>(
  undefined
);

export function useQueriesContent() {
  const queries = useContext(QueriesContext);
  if (queries === undefined) {
    throw new Error("Context Error");
  }
  return queries;
}


export const PostsContext = createContext<RedditData | undefined>(
  undefined
);

export function usePostsContent() {
  const post = useContext(PostsContext);
  if (post === undefined) {
    throw new Error("Context Error");
  }
  return post;
}
