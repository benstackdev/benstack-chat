import { createBrowserRouter } from "react-router";
import Root from "./routes/root.tsx";
import { Home } from "./routes/home.tsx";
import { Signin } from "./routes/sign-in.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/sign-in",
        Component: Signin
      }
    ]
  },
]);

export default router;
