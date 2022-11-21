import Home from "pages/home/Home";
import Listing from "pages/listing/Listing";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/:username",
    element: <Listing />
  }
]);

export default router;
