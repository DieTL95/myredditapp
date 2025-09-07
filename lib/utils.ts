import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  fetchFrontPage,
  fetchPostsAction,
  fetchRedgifsAction,
  fetchUserInfo,
} from "./action";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { betterFetch } from "@better-fetch/fetch";
import { base64 } from "@better-auth/utils/base64";
import type { OAuth2Tokens, ProviderOptions } from "better-auth";
import type { Post, Gif, GalleryMetadata } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function relativeTimeFromElapsed(previous: number) {
  const current = Math.floor(new Date().getTime() / 1000.0);

  const msPerMinute = 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return (
      Math.round(elapsed / msPerMinute) +
      `${elapsed / msPerMinute < 2 ? " Minute ago" : " Minutes ago"}`
    );
  } else if (elapsed < msPerDay) {
    return (
      Math.round(elapsed / msPerHour) +
      `${elapsed / msPerHour < 2 ? " Hour ago" : " Hours ago"}`
    );
  } else if (elapsed < msPerMonth) {
    return (
      Math.round(elapsed / msPerDay) +
      `${elapsed / msPerDay < 2 ? " Day ago" : " Days ago"}`
    );
  } else if (elapsed < msPerYear) {
    return (
      Math.round(elapsed / msPerMonth) +
      `${elapsed / msPerMonth < 2 ? " Month ago" : " Months ago"}`
    );
  } else {
    return (
      Math.round(elapsed / msPerYear) +
      `${elapsed / msPerYear < 2 ? " Year ago" : " Years ago"}`
    );
  }
}

export const secMinHrConvert = (time: number) => {
  const long = time > 59;
  const superLong = time > 3600;
  if (time === 0) {
    return "0:00";
  }
  if (!long) {
    return (
      "0:" +
      Math.floor(time).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      })
    );
  }

  const hours = superLong && Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });

  if (superLong) {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

export const redditScopes = [
  "creddits",
  "modnote",
  "modcontributors",
  "modmail",
  "modconfig",
  "subscribe",
  "structuredstyles",
  "vote",
  "wikiedit",
  "mysubreddits",
  "submit",
  "modlog",
  "modposts",
  "modflair",
  "announcements",
  "save",
  "modothers",
  "read",
  "privatemessages",
  "report",
  "identity",
  "livemanage",
  "account",
  "modtraffic",
  "wikiread",
  "edit",
  "modwiki",
  "modself",
  "history",
  "flair",
];

export const usePosts = (
  value: string,
  sort: string,
  redditType: string,
  page?: string
) => {
  return useInfiniteQuery({
    queryKey: ["redditData", value, sort, page, redditType],

    queryFn: async ({ pageParam }) =>
      fetchPostsAction({ value, sort, redditType, page, pageParam }),
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    initialPageParam: "",
    getNextPageParam: (data) => data?.after,
  });
};

export const useFrontPage = () => {
  return useInfiniteQuery({
    queryKey: ["redditData"],

    queryFn: async ({ pageParam }) => fetchFrontPage({ pageParam }),
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    initialPageParam: "",
    getNextPageParam: (data) => data?.after,
  });
};

export const useUserInfo = (user: string) => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => fetchUserInfo(user),
  });
};

export async function refreshAccessToken({
  refreshToken,
  options,
  tokenEndpoint,
  authentication,
  extraParams,
  grantType = "refresh_token",
}: {
  refreshToken: string;
  options: ProviderOptions;
  tokenEndpoint: string;
  authentication?: "basic" | "post";
  extraParams?: Record<string, string>;
  grantType?: string;
}): Promise<OAuth2Tokens> {
  const body = new URLSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headers: Record<string, any> = {
    "content-type": "application/x-www-form-urlencoded",
    accept: "application/json",
  };

  body.set("grant_type", grantType);
  body.set("refresh_token", refreshToken);
  if (authentication === "basic") {
    headers["authorization"] = `Basic ${base64.encode(
      `${options.clientId}:${options.clientSecret}`
    )}`;
  } else {
    body.set("client_id", options.clientId);
    body.set("client_secret", options.clientSecret);
  }

  if (extraParams) {
    for (const [key, value] of Object.entries(extraParams)) {
      body.set(key, value);
    }
  }

  const { data, error } = await betterFetch<{
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
  }>(tokenEndpoint, {
    method: "POST",
    body,
    headers,
  });
  if (error) {
    throw error;
  }
  const tokens: OAuth2Tokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
    scopes: data.scope?.split(" "),
    idToken: data.id_token,
  };

  if (data.expires_in) {
    const now = new Date();
    tokens.accessTokenExpiresAt = new Date(
      now.getTime() + data.expires_in * 1000
    );
  }

  return tokens;
}

export const MediaHandleFunc = async (postData: Post, domain: string) => {
  if (domain === "reddit.com") {
    let mediaObject;
    const moredata: GalleryMetadata[] = [];

    if (postData.data.crosspost_parent_list) {
      mediaObject = postData.data.crosspost_parent_list[0]
        .media_metadata as GalleryMetadata[];
    } else if (!postData.data.crosspost_parent) {
      mediaObject = postData.data.media_metadata as GalleryMetadata[];
    }

    if (!mediaObject) {
      return;
    }

    for (const element in mediaObject as GalleryMetadata[]) {
      const data = mediaObject[element];
      console.log(data);
      if (data.status === "valid") {
        moredata.push(data);
      }
    }
    return moredata;
  } else if (domain === "i.redd.it") {
    return postData.data.url;
  } else if (domain === "v.redd.it") {
    if (postData.data.crosspost_parent_list !== undefined) {
      return postData.data.crosspost_parent_list[0].media.reddit_video;
    } else {
      return postData.data.media?.reddit_video;
    }
  } else if (postData.data.selftext) {
    return postData.data.selftext_html;
  } else if (domain.includes("redgifs.com")) {
    const url = postData.data.url;
    const regex = /(?:(?:ifr|watch|i)\/)(\w+)/gm;

    const id = regex.exec(url);
    if (!id) {
      return "null";
    }
    console.log(id);

    const gif: Gif = await fetchRedgifsAction(id[1]);

    console.log("Utils: ", gif);
    if (gif) {
      return gif;
    }
  }
};

export const imageResolutions = (images: {
  resolutions: {
    url: string;
    width: number;
    height: number;
  }[];
  source: {
    url: string;
    width: number;
    height: number;
  };
}) => {
  return images.resolutions[3]
    ? images.resolutions[3].url
    : images.resolutions[2]
      ? images.resolutions[2].url
      : images.resolutions[4]
        ? images.resolutions[4].url
        : images.resolutions[5]
          ? images.resolutions[5].url
          : images.source.url;
};
