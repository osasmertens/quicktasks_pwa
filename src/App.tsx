import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { UserProvider } from "./providers/UserProvider";

export const App: FC = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};
