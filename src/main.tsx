import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { GlobalStyles } from "./globalStyles.ts";

import {createBrowserRouter, RouterProvider} from "react-router-dom" // https://reactrouter.com/en/main/start/tutorial

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />
    <QueryClientProvider client={ queryClient }>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>
);

// src/main.jsx

// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider} from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );