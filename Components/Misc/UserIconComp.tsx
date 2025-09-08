import { fetchUserInfo } from "@/lib/action";
import type { Comments, PostData, UserInfo } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
const UserIconComponent = ({
  userIcon,
  post,
  reply,
}: {
  userIcon?: string;
  post?: PostData;
  reply?: Comments;
}) => {
  const subIcon = post?.sr_detail?.icon_img
    ? post?.sr_detail?.icon_img
    : post?.sr_detail?.community_icon;
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const ref = useRef<HTMLDivElement>(null);
  const defaultImg = `/user-icons/avatar_default_0.png`;
  // function getRandomInt(min: number, max: number) {
  //   const minCeiled = Math.ceil(min);
  //   const maxFloored = Math.floor(max);
  //   return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  // }

  useEffect(() => {
    const author = ref.current!;
    if (reply) {
      const observer = new IntersectionObserver(
        (enteries) => {
          enteries.forEach(async (entry) => {
            if (entry.isIntersecting) {
              const user = await fetchUserInfo(reply.author);
              setUserInfo(user);
              observer.unobserve(author);
            }
          });
        },
        {
          rootMargin: "50% 0% 50% 0%",
          root: null,
        }
      );

      observer.observe(author);

      return () => observer.unobserve(author);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref}>
      <Image
        src={userIcon || subIcon || userInfo?.icon_img || defaultImg}
        width={50}
        height={50}
        className="rounded-full"
        alt="User Icon"
      />
    </div>
  );
};

export default UserIconComponent;
