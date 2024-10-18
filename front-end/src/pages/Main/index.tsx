import { memo } from "react";
import { Header } from "@/components/Header";

export const Main = memo(() => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="flex justify-center items-center w-full h-screen">
        <h1 className="text-4xl">Paste a link in url</h1>
      </div>
    </div>
  );
});
