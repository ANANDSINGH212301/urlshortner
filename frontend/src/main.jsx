import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routing/RouteTree.js";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast"; // ✅ import toaster

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ add Toaster */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
