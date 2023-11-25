import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./views/HomePage";
import MainLayout from "./layouts/MainLayout";
import Prizes from "./views/Prizes";
import { prizesLoader } from "./api/getPrizesLoader";
import NotFoundPage from "./views/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: prizesLoader,
    id: "root",
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "prizes/:language/:year",
        loader: prizesLoader,
        element: <Prizes />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
