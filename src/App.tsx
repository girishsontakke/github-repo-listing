import NavBar from "components/navBar/NavBar";
import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "router";
import "./App.css";

function App() {
  const [user, setUser] = useState<string | null>(null);
  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
