import NavBar from "components/navBar/NavBar";
import { RouterProvider } from "react-router-dom";
import router from "router";
import "./App.css";

function App() {
  return (
    <div>
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
