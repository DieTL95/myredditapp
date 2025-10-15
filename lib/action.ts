"use server";

import { headers } from "next/headers";
import type {
  PostWithComments,
  RedditData,
  SubmittionType,
  SubCardType,
  SubSearchType,
  UserInfo,
  Gfy,
  UserSubType,
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

export const fetchUserInfo = async (username: string) => {
  const accessToken = await getRedditToken();

  try {
    const res = await fetch(
      `https://oauth.reddit.com/user/${username}/about?raw_json=1`,
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
  if (!res.ok) {
    const data = await res.json();
    return data as SubCardType;
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
      return data as SubSearchType;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserSubs = async (pageParam: string) => {
  const accessToken = await getRedditToken();

  try {
    const res = await fetch(
      `https://oauth.reddit.com/subreddits/mine/subscriber?raw_json=1&after=${pageParam}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }
    );

    if (res.ok) {
      const data: UserSubType = await res.json();
      return data.data;
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
  redditType,
  subreddit,
  restrict,
  page,
  pageParam,
}: {
  value: string;
  sort?: string | undefined;
  redditType: string | undefined;
  subreddit?: string;
  restrict?: string;
  page: string | undefined;
  pageParam: string | undefined;
}) => {
  const accessToken = await getRedditToken();

  if (value == undefined) {
    throw new Error("Failed.");
  }
  console.log(
    "Server Values:",
    value,
    sort,
    subreddit,
    restrict,
    redditType,
    pageParam
  );
  try {
    const res = await fetch(
      redditType === "search"
        ? `https://oauth.reddit.com${subreddit ? `/r/${subreddit}` : ""}/search?q=${value}${restrict ? `&restrict_sr=${restrict}` : ""}&include_over_18=on&raw_json=1&sr_detail=true&t=all&sort=${sort}&after=${pageParam}`
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

export const fetchCommentsAction = async (
  id: string,
  comment?: string,
  context?: number
) => {
  const accessToken = await getRedditToken();

  try {
    const res = await fetch(
      `https://oauth.reddit.com/comments/${id}?${comment ? `comment=${comment}&context=${context}&` : ""}raw_json=1`,
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

export const getSubRules = async (subreddit: string) => {
  const accessToken = await getRedditToken();

  const ass = await fetch(
    `https://oauth.reddit.com/r/${subreddit}/about/rules`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${accessToken}`,
      },
    }
  );

  console.log(ass);

  if (ass.ok) {
    const res = await ass.json();
    return res;
  }
};

export const commentSubmitAction = async (
  text: string,

  thing_id: string
) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }

  try {
    const res = await fetch(`https://oauth.reddit.com/api/comment`, {
      method: "POST",
      body: `text=${text}&thing_id=${thing_id}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      const { jquery } = await res.json();
      console.log(jquery);
      console.log(jquery[18][3][0]);
      return jquery[18][3][0];
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Error: ${error}`);
  }
};

export const postSubmitAction = async ({
  title,
  text,
  subreddit,
  kind,
}: SubmittionType) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }

  try {
    const res = await fetch(`https://oauth.reddit.com/api/submit/`, {
      method: "POST",
      body: `title=${title}&text=${text}&sr=${subreddit}&kind=${kind}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      const { jquery } = await res.json();

      console.log(jquery);
      return jquery;
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

export const deleteAction = async (id: string) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }

  try {
    const res = await fetch(`https://oauth.reddit.com/api/del?id=${id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${accessToken}`,
      },
    });

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

export const blockUserAction = async (account: string, name: string) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }

  try {
    const res = await fetch(`https://oauth.reddit.com/api/block_user`, {
      method: "POST",
      body: `account_id=${account}&api_type=json&name=${name}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `bearer ${accessToken}`,
      },
    });

    console.log(res);

    if (res.ok) {
      return {
        error: false,
        message: `${name} blocked.`,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: `Blocking failed. Error: ${error}`,
    };
  }
};

export const unblockUserAction = async (account: string) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      accounts: {
        select: {
          accountId: true,
        },
      },
    },
  });

  try {
    const res = await fetch(`https://oauth.reddit.com/api/unfriend`, {
      method: "POST",
      body: `id=t2_${account}&executed=removed&container=t2_${user?.accounts[0].accountId}&type=enemy`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `bearer ${accessToken}`,
      },
    });

    console.log(res);

    if (res.ok) {
      return {
        error: false,
        message: `user unblocked.`,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: `Blocking failed. Error: ${error}`,
    };
  }
};

export const uploadImageAction = async (
  filepath: string,
  mime: string,
  subreddit: string
) => {
  const accessToken = await getRedditToken();

  if (!accessToken) {
    redirect("/signin");
  }

  try {
    const res = await fetch(`https://oauth.reddit.com/api/media/asset`, {
      method: "POST",
      body: `filepath=${filepath}&minetype=${mime}&sr=${subreddit}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `bearer ${accessToken}`,
      },
    });

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

export const fetchRedgifsAction = async (id: string): Promise<Gfy> => {
  if (!id) {
    return;
  }
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // const user = await db.user.findUnique({
  //   where: {
  //     id: session?.user.id,
  //   },
  //   include: {
  //     redgifToken: {
  //       select: {
  //         accessToken: true,
  //       },
  //     },
  //   },
  // });

  // let count = 0;
  // console.log("DB Token: ", user?.redgifToken?.accessToken);

  const res = await fetch(`https://api.redgifs.com/v1/gifs/${id}`);

  // console.log(`Count: ${count}`, "Res: ", res);
  // if (!res.ok && count < 2) {
  //   await getRedGifsToken();
  //   count++;
  //   await fetchRedgifsAction(id);
  // }

  if (res.ok) {
    const { gfyItem } = await res.json();
    console.log(gfyItem);
    return gfyItem as Gfy;
  }
};

export async function getRedGifsToken() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Can't generate access token to guests.");
  }

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      redgifToken: {
        select: {
          accessToken: true,
        },
      },
    },
  });

  if (user?.redgifToken) {
    await db.redgifsToken.delete({
      where: {
        userId: session.user.id,
      },
    });
  }

  const now = new Date(Date.now());

  try {
    const res = await fetch("https://api.redgifs.com/v2/auth/temporary");
    if (res.ok) {
      const expires = new Date(now.setDate(now.getDate() + 1));

      const jsonData = await res.json();
      console.log("Fetched Token: ", jsonData);
      const data = await db.redgifsToken.create({
        data: {
          accessToken: jsonData.token,
          ipAddress: jsonData.addr,
          redgifSession: jsonData.session,
          userAgent: jsonData.agent,
          userId: session.user.id,
          expiresAt: expires,
        },
      });
      return data.accessToken;
    }
  } catch (error) {
    throw new Error("Couldn't create token" + error);
  }
}
