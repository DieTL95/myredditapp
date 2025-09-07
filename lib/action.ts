"use server";

import { headers } from "next/headers";
import type {
  Gif,
  PostWithComments,
  RedditData,
  SubmittionType,
  SubCardType,
  SubSearchType,
  UserInfo,
} from "./types";
import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const getRedditToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      accounts: {
        where: {
          userId: session?.user.id,
        },
        select: {
          id: true,
        },
      },
    },
  });
  const account = await db.account.findUnique({
    where: {
      id: user?.accounts[0].id,
    },
  });
  const now = new Date(Date.now());

  if (!user) {
    redirect("/signin");
  }

  if (!account?.accessTokenExpiresAt) {
    console.log("awwwwwyyyyyy");
    return;
  }
  if (account.accessTokenExpiresAt > now) {
    return account.accessToken;
  }

  if (account?.accessTokenExpiresAt < now) {
    console.log("awawawawa");
    const res = await auth.api.refreshToken({
      body: {
        providerId: "reddit",
        userId: session?.user.id,
        accountId: account.id,
      },
    });

    console.log(res);
  }
};

export const fetchMeAction = async () => {
  const accessToken = await getRedditToken();

  try {
    const res = await fetch(`https://oauth.reddit.com/api/v1/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      const data = await res.json();

      return data;
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const fetchUserInfo = async (userName: string) => {
  const accessToken = await getRedditToken();

  try {
    const res = await fetch(
      `https://oauth.reddit.com/user/${userName}/about?raw_json=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        cache: "force-cache",
      }
    );

    if (res.ok) {
      const { data } = await res.json();

      return data as UserInfo;
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const fetchSubredditInfo = async (subreddit: string) => {
  const accessToken = await getRedditToken();

  try {
    const res = await fetch(
      `https://oauth.reddit.com/r/${subreddit}/about?raw_json=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();

      return data as SubCardType;
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const subSearchAcion = async (query: string) => {
  const accessToken = await getRedditToken();

  try {
    const res = await fetch(
      `https://oauth.reddit.com/api/search_subreddits?query=${query}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return data as SubSearchType;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchFrontPage = async ({ pageParam }: { pageParam: string }) => {
  const accessToken = await getRedditToken();

  try {
    const res = await fetch(
      `https://oauth.reddit.com/best?limit=10&raw_json=1&sr_detail=true&after=${pageParam}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }
    );

    if (res.ok) {
      const { data } = await res.json();

      return data as RedditData;
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const fetchPostsAction = async ({
  value,
  sort,
  pageParam,
  redditType,
  page,
}: {
  value: string;
  sort?: string | undefined;
  pageParam: string | undefined;
  redditType: string | undefined;
  page: string | undefined;
}) => {
  const accessToken = await getRedditToken();

  if (value == undefined) {
    throw new Error("Failed.");
  }
  console.log("Server Values:", value, sort, pageParam, redditType);
  try {
    const res = await fetch(
      redditType === "search"
        ? `https://oauth.reddit.com/search?q=${value}&include_over_18=on&raw_json=1&sr_detail=true&t=all&sort=${sort}&after=${pageParam}`
        : redditType === "subreddits"
          ? `https://oauth.reddit.com/search_subreddits?query=${value}`
          : redditType === "subreddit"
            ? `https://oauth.reddit.com/r/${value}/${sort}?t=all&raw_json=1&sr_detail=true&after=${pageParam}`
            : redditType === "user"
              ? `https://oauth.reddit.com/user/${value}/${page}?raw_json=1&sr_detail=true&sort=${sort}&after=${pageParam}`
              : "undefined",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          authorization: `bearer ${accessToken}`,
        },
      }
    );

    if (res.ok) {
      const { data } = await res.json();
      return data as RedditData;
    }
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};

export const fetchCommentsAction = async (id: string) => {
  const accessToken = await getRedditToken();

  try {
    const res = await fetch(
      `https://oauth.reddit.com/comments/${id}?raw_json=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();

      return data as PostWithComments;
    }
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};

export const submitAction = async ({
  title,
  text,

  subreddit,
  kind,
  modhash,
}: SubmittionType) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }
  try {
    const res = await fetch(`https://oauth.reddit.com/api/submit/`, {
      method: "POST",
      body: `title=${title}&text=${text}&sr=${subreddit}&kind=${kind}&modhash=${modhash}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      const { jquery } = await res.json();

      console.log(jquery);
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Error: ${error}`);
  }
};

export const voteAction = async (id: string, dir: number) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }

  try {
    const res = await fetch(
      `https://oauth.reddit.com/api/vote?id=${id}&dir=${dir}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }
    );

    if (res.ok) {
      return {
        error: false,
        message: "Voted!",
      };
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const friendUnAction = async (username: string, state: boolean) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }

  try {
    const res = await fetch(
      `https://oauth.reddit.com/api/v1/me/friends/${username}`,
      {
        method: state === false ? "PUT" : "DELETE",
        body: JSON.stringify({
          name: username,
        }),

        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }
    );

    console.log(res);
    if (res.ok) {
      revalidatePath(`/user/${username}`);
      return {
        error: false,
        message: state === true ? "Unfriended!" : "Friended",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
};

export const subscribeAction = async (subreddit: string, state: boolean) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }

  console.log(subreddit, state);

  try {
    const res = await fetch(`https://oauth.reddit.com/api/subscribe/`, {
      method: "POST",
      body: `action=${state === true ? "unsub" : "sub"}&sr=${subreddit}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `bearer ${accessToken}`,
      },
    });

    console.log(res);
    if (res.ok) {
      revalidatePath(`/r/${subreddit}`);
      return {
        error: false,
        message: state === true ? "Unsubbed!" : "Subbed",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
};

export const deleteAction = async (id: string, modhash: string) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }

  try {
    const res = await fetch(
      `https://oauth.reddit.com/api/del?id=${id}&uh=${modhash}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }
    );

    if (res.ok) {
      return {
        error: false,
        message: "Successfly deleted.",
      };
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const fetchRedgifsAction = async (id: string) => {
  if (!id) {
    return;
  }

  const token = await getRedGifsToken();
  console.log(token);

  try {
    const res = await fetch(`https://api.redgifs.com/v2/gifs/${id}`, {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);
    if (res.ok) {
      const gif = await res.json();
      console.log(gif);
      return gif.gif as Gif;
    }
  } catch (error) {
    console.log(error);
  }
};

export async function getRedGifsToken() {
  try {
    const res = await fetch("https://api.redgifs.com/v2/auth/temporary");
    if (res.ok) {
      const jsonData = await res.json();

      return jsonData.accessToken;
    }
  } catch (error) {
    throw new Error("Couldn't create token" + error);
  }
}
