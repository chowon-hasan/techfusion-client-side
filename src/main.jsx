import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./Router/Routes.jsx";
import Auth from "./Authprovider/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth>
        <RouterProvider router={routes} />
      </Auth>
    </QueryClientProvider>
  </React.StrictMode>
);
