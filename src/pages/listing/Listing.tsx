import Pagination from "components/pagination/Pagination";
import Profile from "components/profile/Profile";
import RepositoryList from "components/repositoryList/RepositoryList";
import Spinner from "components/spinner/Spinner";
import LoadingContext from "context/LoadingContext";
import ProfileContext from "context/ProfileContext";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IRepository } from "types";
import styles from "./Listing.module.scss";

function Listing() {
  // component state
  const [repositories, setRepositories] = useState<IRepository[]>([]);

  // context state and actions
  const { profile, fetchProfile, profileError } = useContext(ProfileContext);
  const { profileLoading, repositoriesLoading, setRepositoriesLoading } =
    useContext(LoadingContext);

  // react-router-dom hooks
  const { username } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    let page = searchParams.get("page");
    if (typeof page === "string") {
      try {
        return parseInt(page);
      } catch (error) {}
    }
    return page;
  }, [searchParams]);

  // fetches public repos of the provided user
  const fetchRepositories = useCallback(async () => {
    try {
      if (profile) {
        setRepositoriesLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${profile.login}/repos?per_page=10&page=${currentPage}`
        );
        setRepositoriesLoading(false);
        const data = await response.json();
        setRepositories(data);
      }
    } catch (error) {
      setRepositories([]);
      setRepositoriesLoading(false);
    }
  }, [profile, setRepositoriesLoading, currentPage]);

  useEffect(() => {
    if (username && username?.length > 0) fetchProfile(username);
  }, [fetchProfile, username]);

  useEffect(() => {
    fetchRepositories();
  }, [profile, fetchRepositories]);

  if (profileError) navigate("/");

  const onPageChange = (pageNumber: number) => {
    navigate({ search: `?page=${pageNumber}` });
  };

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
          <div className={styles.repositoriesWrapper}>
            <RepositoryList repositories={repositories} />
            {profile && (
              <div className={styles.paginationWrapper}>
                <Pagination
                  totalCount={profile.public_repos}
                  currentPage={
                    typeof currentPage === "number" ? currentPage : 1
                  }
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Listing;
