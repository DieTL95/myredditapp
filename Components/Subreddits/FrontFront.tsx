"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FrontPageComponent from "./FrontPageComp";

const FrontFrontComp = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FrontPageComponent />
    </QueryClientProvider>
  );
};

export default FrontFrontComp;
