import { IRepository } from "types";
import Repository from "../repository/Repository";
import styles from "./RepositoryList.module.scss";

interface Iprops {
  repositories: IRepository[];
}
function RepositoryList(props: Iprops) {
  const { repositories } = props;

  return (
    <div className={styles.repositoriesContainer}>
      {repositories.map((repository) => (
        <Repository key={repository.id} repository={repository} />
      ))}
    </div>
  );
}

export default RepositoryList;
