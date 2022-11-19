import Profile from "components/profile/Profile";
import RepositoryList from "components/repositoryList/RepositoryList";
import { useEffect, useState } from "react";
import { Iprofile, IRepository } from "types";
import styles from "./Home.module.scss";

function Home() {
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [profile, setProfile] = useState<Iprofile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/saroj789`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {}
    };
    fetchProfile();
  }, []);

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
    fetchRepositories();
  }, [profile?.login]);

  return (
    <div className={styles.homeContainer}>
      <Profile profile={profile} />
      {repositories.length > 0 && (
        <RepositoryList repositories={repositories} />
      )}
    </div>
  );
}

export default Home;
