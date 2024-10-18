import { useAuthSession } from "@/providers/AuthProvider";
import { Button } from "@/ui/button";
import { memo } from "react";

export const Header = memo(() => {
  const { logout, user } = useAuthSession();
  return (
    <header className="z-0 fixed flex justify-end items-center gap-2 px-4 py-2 w-full">
      <div>
        hello, <strong>{user?.username}</strong>
      </div>
      <Button variant="outline" onClick={logout}>
        Logout
      </Button>
    </header>
  );
});
