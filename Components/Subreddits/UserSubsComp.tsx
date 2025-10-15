import { useUserSubs } from "@/lib/utils";

const UserSubsComponent = () => {
  const { data } = useUserSubs();
  console.log(data);
  return (
    <div>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page?.children.map((subs) => (
            <div key={subs.data.id}>{subs.data.title}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserSubsComponent;
