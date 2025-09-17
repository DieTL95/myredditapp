"use client";

import PostSubmittionComponent from "@/Components/Submittions/PostSubmittionComp";

const SubmittionPage = ({ page }: { page: string }) => {
  return <PostSubmittionComponent page={page} />;
};

export default SubmittionPage;
