import { createBrowserRouter } from "react-router";
import Root from "./routes/root.tsx";
import { Home } from "./routes/home.tsx";
import { Signup } from "./routes/sign-up.tsx";
import { AdminPage } from "./components/pages/admin.tsx";
import { AdminSignIn } from "./routes/admin-sign-in.tsx";

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
        path: "sign-up",
        Component: Signup
      },
      {
        path: "admin",
        Component: AdminPage,
        children: [
          {
            path: "sign-in",
            Component: AdminSignIn
          }
        ]
      }
    ]
  },
]);

export default router;
