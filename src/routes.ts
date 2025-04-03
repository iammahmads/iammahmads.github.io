import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home";
import App from "./App";
import NotFound from "./pages/not-found";
import Spinner from "./components/spinner";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: Spinner,
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
