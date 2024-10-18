import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "@/providers/RouterProvider";
import { AuthProvider } from "@/providers/AuthProvider";

import { Toaster } from "@/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
