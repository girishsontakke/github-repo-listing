import Profile from "components/profile/Profile";
import RepositoryList from "components/repositoryList/RepositoryList";
import Spinner from "components/spinner/Spinner";
import LoadingContext from "context/LoadingContext";
import ProfileContext from "context/ProfileContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRepository } from "types";
import styles from "./Listing.module.scss";

function Listing() {
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const { profile, fetchProfile, profileError } = useContext(ProfileContext);
  const { profileLoading, repositoriesLoading, setRepositoriesLoading } =
    useContext(LoadingContext);
  const { username } = useParams();
  const navigate = useNavigate();

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
    if (username && username?.length > 0) fetchProfile(username);
  }, [fetchProfile, username]);

  useEffect(() => {
    fetchRepositories();
  }, [profile, fetchRepositories]);

  useEffect(() => {
    if (profileError) navigate("/");
  }, [profileError, navigate]);

  return profileLoading ? (
    <Spinner />
  ) : (
    <div className={styles.homeContainer}>
      <Profile profile={profile} />

      {/* render repositories if not loading */}
      {repositoriesLoading ? (
        <Spinner />
      ) : (
        repositories.length > 0 && (
          <RepositoryList repositories={repositories} />
        )
      )}
    </div>
  );
}

export default Listing;
