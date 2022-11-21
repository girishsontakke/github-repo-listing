import Profile from "components/profile/Profile";
import RepositoryList from "components/repositoryList/RepositoryList";
import LoadingContext from "context/LoadingContext";
import ProfileContext from "context/ProfileContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRepository } from "types";
import styles from "./Listing.module.scss";

function Listing() {
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const { profile, fetchProfile } = useContext(ProfileContext);
  const { profileLoading, repositoriesLoading, setRepositoriesLoading } =
    useContext(LoadingContext);
  const { username } = useParams();

  // fetches public repos of the provided user
  const fetchRepositories = useCallback(async () => {
    try {
      if (profile) {
        setRepositoriesLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${profile.login}/repos`
        );
        setRepositoriesLoading(false);
        const data = await response.json();
        setRepositories(data);
      }
    } catch (error) {
      setRepositories([]);
      setRepositoriesLoading(false);
    }
  }, [profile, setRepositoriesLoading]);

  useEffect(() => {
    if (username) fetchProfile(username);
  }, [fetchProfile, username]);

  useEffect(() => {
    fetchRepositories();
  }, [profile, fetchRepositories]);

  return profileLoading ? (
    <div>loading</div>
  ) : (
    <div className={styles.homeContainer}>
      <Profile profile={profile} />
      {repositoriesLoading ? (
        <div>loading</div>
      ) : (
        repositories.length > 0 && (
          <RepositoryList repositories={repositories} />
        )
      )}
    </div>
  );
}

export default Listing;
