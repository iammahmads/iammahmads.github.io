import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home";
import App from "./App";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
