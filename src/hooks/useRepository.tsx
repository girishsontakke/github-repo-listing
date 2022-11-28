import LoadingContext from "context/LoadingContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { Iprofile, IRepository } from "types";

function useRepository(profile: Iprofile | null, currentPage: number | string) {
  const [repositories, setRepositories] = useState<IRepository[]>([]);

  const { setRepositoriesLoading } = useContext(LoadingContext);

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
    fetchRepositories();
  }, [profile, fetchRepositories]);

  return {
    repositories
  };
}

export default useRepository;
