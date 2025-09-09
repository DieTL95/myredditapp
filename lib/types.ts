import type { Dispatch, SetStateAction } from "react";

export type QueriesPages = {
  pagesParam: [];
  pages: [RedditData];
};

export type PostData = {
  author: string;
  archived: boolean;
  clicked: boolean;
  created: number;
  created_utc: number;
  crosspost_parent: string;
  crosspost_parent_list?: [PostData];
  domain: string;
  distinguished: string;
  is_video: boolean;
  is_self: boolean;
  is_gallery: boolean;
  id: string;
  likes: boolean | null;
  link_flair_text: string;
  media_only: boolean;
  name: string;
  removal_reason: string;
  removed_by: string;
  removed_by_category: string;
  report_reasons: string;
  saved: false;
  num_comments: number;
  num_crossposts: number;
  over_18: boolean;
  permalink: string;
  post_hint: string;
  score: number;
  selftext: string;
  selftext_html: string;
  sr_detail?: Subreddit;
  subreddit: string;
  stickied: boolean;
  title: string;
  url: string;
  thumbnail: string;
  visited: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media_metadata: any;
  gallery_data?: {
    items: [
      {
        media_id: string;
      },
    ];
  };
  media: {
    reddit_video: {
      fallback_url: string;
      duration: number;
      width: number;
      height: number;
      dash_url: string;
      has_audio: boolean;
    };
  };
  secure_media: {
    oembed: {
      height: number;
      width: number;
      thumnail_url: string;
      type: string;
    };
  };
  preview?: {
    images: [
      {
        resolutions: { url: string; width: number; height: number }[];
        source: {
          url: string;
          width: number;
          height: number;
        };
        variants: {
          nsfw: {
            resolutions: { url: string; width: number; height: number }[];
            source: {
              url: string;
              width: number;
              height: number;
            };
          };
          obfuscated: {
            resolutions: { url: string; width: number; height: number }[];
            source: {
              url: string;
              width: number;
              height: number;
            };
          };
          gif: {
            resolutions: { url: string; width: number; height: number }[];
            source: {
              url: string;
              width: number;
              height: number;
            };
          };
          mp4: {
            resolutions: { url: string; width: number; height: number }[];
            source: {
              url: string;
              width: number;
              height: number;
            };
          };
        };
      },
    ];
    reddit_video_preview: {
      height: number;
      width: number;
      fallback_url: string;
      duration?: number;
    };
  };
};

export type Post = {
  kind: string;
  data: PostData;
};

export type GalleryData = {
  items: {
    media_id: string;
  }[];
};

export type RedditData = {
  after: string;
  before: string;
  children: [];
};

export type Gfy =
  | {
      content_urls: {
        mp4: {
          url: string;
          width: number;
          height: number;
        };
      };

      gifName: string;
      height: number;
      width: number;

      duration: number;
    }
  | undefined;

export type Gif =
  | {
      urls: {
        hd: string;
        sd: string;
        poster: string;
        thumbnail: string;
      };
      duration: number;
      height: number;
      width: number;
      hasAudio: boolean;
    }
  | undefined;

export type RedditQueries = {
  redditType: string | undefined;
  value: string | undefined;
  sort: string | undefined;
  after: string | undefined;
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  setAfter: Dispatch<SetStateAction<string | undefined>>;
};

export type SubCardType = {
  kind: string;

  data: {
    user_flair_background_color: null;
    submit_text_html: string;
    restrict_posting: boolean;
    user_is_banned: boolean;
    free_form_reports: boolean;
    wiki_enabled: boolean;
    user_is_muted: boolean;
    user_can_flair_in_sr: boolean;
    display_name: string;
    header_img: null;
    title: string;
    allow_galleries: boolean;
    icon_size: null;
    primary_color: string;
    icon_img: string;
    display_name_prefixed: string;
    accounts_active: number;
    public_traffic: boolean;
    user_flair_richtext: [];
    name: string;
    quarantine: boolean;
    hide_ads: boolean;
    prediction_leaderboard_entry_type: number;
    emojis_enabled: boolean;
    advertiser_category: string;
    public_description: string;
    comment_score_hide_mins: number;
    allow_predictions: boolean;
    user_has_favorited: boolean;
    user_flair_template_id: null;
    community_icon: string;
    banner_background_image: string;
    original_content_tag_enabled: boolean;
    community_reviewed: boolean;
    submit_text: string;
    description_html: string;
    spoilers_enabled: boolean;
    comment_contribution_settings: { allowed_media_types: string[] };
    allow_talks: boolean;
    header_size: null;
    user_flair_position: string;
    all_original_content: boolean;
    has_menu_widget: boolean;
    is_enrolled_in_new_modmail: null;
    key_color: string;
    can_assign_user_flair: boolean;
    created: number;
    wls: null;
    show_media_preview: boolean;
    submission_type: string;
    user_is_subscriber: boolean;
    allowed_media_in_comments: [];
    allow_videogifs: boolean;
    should_archive_posts: boolean;
    user_flair_type: string;
    allow_polls: boolean;
    collapse_deleted_comments: boolean;
    emojis_custom_size: null;
    public_description_html: string;
    allow_videos: boolean;
    is_crosspostable_subreddit: null;
    notification_level: null;
    should_show_media_in_comments_setting: boolean;
    can_assign_link_flair: boolean;
    accounts_active_is_fuzzed: boolean;
    allow_prediction_contributors: boolean;
    submit_text_label: string;
    link_flair_position: string;
    user_sr_flair_enabled: boolean;
    user_flair_enabled_in_sr: boolean;
    allow_discovery: boolean;
    accept_followers: boolean;
    user_sr_theme_enabled: boolean;
    link_flair_enabled: boolean;
    disable_contributor_requests: boolean;
    subreddit_type: string;
    suggested_comment_sort: string;
    banner_img: string;
    user_flair_text: null;
    banner_background_color: string;
    show_media: boolean;
    id: string;
    user_is_moderator: boolean;
    over18: boolean;
    header_title: string;
    description: string;
    submit_link_label: string;
    user_flair_text_color: null;
    restrict_commenting: boolean;
    user_flair_css_class: null;
    allow_images: boolean;
    lang: string;
    url: string;
    created_utc: number;
    banner_size: null;
    mobile_banner_image: string;
    user_is_contributor: boolean;
    allow_predictions_tournament: boolean;
  };
};

export type SubSearchType = {
  subreddits: {
    active_user_count: number;
    allow_chat_post_creation: boolean;
    allow_images: boolean;
    icon_img: string;
    is_chat_post_feature_enabled: boolean;
    key_color: string;
    name: string;
    subscriber_count: number;
  }[];
};

export type PostWithComments = [
  {
    data: RedditData;
    kind: string;
  },
  {
    data: Replies;
    kind: string;
  },
];

export type GalleryMetadata = {
  e: string;
  id: string;
  m: string;
  o: [
    {
      u: string;
      x: number;
      y: number;
    },
  ];
  p: {
    u: string;
    x: number;
    y: number;
  }[];

  s: {
    gif?: string;
    mp4?: string;
    u: string;
    x: number;
    y: number;
  };

  status: string;
};

export type Comments = {
  archived: boolean;
  author: string;
  author_is_blocked: boolean;
  author_flair_type: string;
  author_fullname: string;
  author_patreon_flair: boolean;
  author_premium: boolean;
  banned_by: string;
  before: string;
  body: string;
  body_html: string;
  can_mod_post: boolean;
  can_gild: boolean;
  collapsed: boolean;
  collapsed_because_crowd_control: boolean;
  controversiality: number;
  created_utc: number;
  created: number;
  distinguished: string;
  depth: number;
  downs: number;
  edited: boolean;
  gilded: number;
  id: string;
  is_submitter: boolean;
  link_id: string;
  link_title: string;
  link_url: string;
  likes: boolean | null;
  locked: boolean;
  name: string;
  no_follow: boolean;
  parent_id: string;
  permalink: string;
  replies: Replies;
  subreddit_id: string;
  subreddit: string;
  saved: boolean;
  send_replies: boolean;
  score: number;
  stickied: boolean;
  score_hidden: boolean;
  subreddit_type: string;
  subreddit_name_prefixed: string;
  ups: number;
};

export type Replies = {
  kind: string;
  data: {
    after: string;
    modhash: string;
    before: string;
    children: RepliesChildren;
  };
};

export type RepliesChildren = {
  kind: string;
  data: Comments;
}[];

export type VotesPropType = {
  likes: boolean | null;
  name: string;
  score: number;
  archived: boolean;
};

export type UserResType = {
  kind: string;
  data: UserInfo;
};

export type UserInfo = {
  is_employee: boolean;
  is_friend: boolean;
  is_suspended: boolean;
  subreddit: Subreddit;
  snoovatar_size: null;
  awardee_karma: number;
  id: string;
  verified: boolean;
  is_gold: boolean;
  is_mod: boolean;
  awarder_karma: number;
  has_verified_email: boolean;
  icon_img: string;
  hide_from_robots: boolean;
  link_karma: number;
  pref_show_snoovatar: boolean;
  is_blocked: boolean;
  total_karma: number;
  accept_chats: boolean;
  name: string;
  created: number;
  created_utc: number;
  snoovatar_img: string;
  comment_karma: number;
  accept_followers: boolean;
  has_subscribed: boolean;
  accept_pms: boolean;
};

export type Subreddit = {
  default_set: boolean;
  user_is_contributor: boolean;
  banner_img?: string;
  user_is_banned: boolean;
  free_form_reports: boolean;
  community_icon: null;
  show_media: boolean;
  icon_color: string;
  user_is_muted: null;
  display_name: string;
  header_img?: null;
  title?: string;
  previous_names: string[];
  over_18: boolean;
  icon_size: number[];
  primary_color: string;
  icon_img: string;
  description: string;
  submit_link_label: string;
  header_size: null;
  restrict_posting: boolean;
  restrict_commenting: boolean;
  subscribers: number;
  submit_text_label: string;
  is_default_icon: boolean;
  link_flair_position: string;
  display_name_prefixed: string;
  key_color: string;
  name: string;
  is_default_banner: boolean;
  url: string;
  quarantine: boolean;
  banner_size: number[];
  user_is_moderator: boolean;
  accept_followers: boolean;
  public_description: string;
  link_flair_enabled: boolean;
  disable_contributor_requests: boolean;
  subreddit_type: string;
  user_is_subscriber: boolean;
};

export type SubmittionType = {
  title: string;
  url?: string;
  text?: string;
  richtext_json?: JSON;
  nsfw?: boolean;
  subreddit: string;
  parent?: string;
  modhash: string;
  kind: "link" | "self" | "image" | "video" | "videogif";
};
