import Pagination from "components/pagination/Pagination";
import Profile from "components/profile/Profile";
import RepositoryList from "components/repositoryList/RepositoryList";
import Spinner from "components/spinner/Spinner";
import LoadingContext from "context/LoadingContext";
import ProfileContext from "context/ProfileContext";
import useRepository from "hooks/useRepository";
import { useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import styles from "./Listing.module.scss";

function Listing() {
  // context state and actions
  const { profile, fetchProfile, profileError } = useContext(ProfileContext);
  const { profileLoading, repositoriesLoading } = useContext(LoadingContext);

  // react-router-dom hooks
  const { username } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    let page = searchParams.get("page") || 1;
    if (typeof page === "string") {
      try {
        page = parseInt(page);
      } catch (error) {
        return 1;
      }
    }
    return Number.isNaN(page) ? 1 : page;
  }, [searchParams]);

  const { repositories } = useRepository(profile, currentPage);

  useEffect(() => {
    if (username && username?.length > 0) fetchProfile(username);
  }, [fetchProfile, username]);

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
