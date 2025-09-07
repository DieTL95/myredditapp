import type { PostData } from "@/lib/types";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
const UserIconComponent = ({
  userIcon,
  post,
}: {
  userIcon?: string;
  post?: PostData;
}) => {
  const subIcon = post?.sr_detail?.icon_img
    ? post?.sr_detail?.icon_img
    : post?.sr_detail?.community_icon;
  const [userInfo, setUserInfo] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const defaultImg = `/user-icons/avatar_default_${userInfo}.png`;
  function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  useEffect(() => {
    const author = ref.current!;
    if (!subIcon) {
      const observer = new IntersectionObserver(
        (enteries) => {
          enteries.forEach(async (entry) => {
            if (entry.isIntersecting) {
              // const user = await fetchUserInfo(post.author);
              const randInt = getRandomInt(0, 7);
              console.log(randInt);
              setUserInfo(randInt);

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
        src={userIcon || subIcon || defaultImg}
        width={50}
        height={50}
        className="rounded-full"
        alt="User Icon"
      />
    </div>
  );
};

export default UserIconComponent;
