import Profile from "components/profile/Profile";
import { useEffect, useState } from "react";
import { Iprofile, IRepository } from "types";
import "./App.css";
import RepositoryList from "./components/repositoryList/RepositoryList";

function App() {
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [profile, setProfile] = useState<Iprofile | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        if (profile != null) {
          const response = await fetch(
            `https://api.github.com/users/${profile?.login}/repos`
          );
          const data = await response.json();
          setRepositories(data);
        }
      } catch (error) {}
    };

    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/saroj789`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {}
    };
    fetchProfile();
    fetchRepositories();
  }, [profile?.login]);

  return (
    <div style={{ display: "flex", gap: "30px", padding: "20px 10%" }}>
      <Profile profile={profile} />
      {repositories.length > 0 && (
        <RepositoryList repositories={repositories} />
      )}
    </div>
  );
}

export default App;
