import { useEffect, useState } from "react";
import "./App.css";
import RepositoryList from "./components/repositoryList/RepositoryList";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/girishsontakke/repos"
        );
        const data = await response.json();
        setRepositories(data);
      } catch (error) {}
    };

    fetchRepositories();
  }, []);
  return (
    <div>
      {repositories.length > 0 && (
        <RepositoryList repositories={repositories} />
      )}
    </div>
  );
}

export default App;
