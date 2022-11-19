import RepositoryIcon from "components/repositoryIcon/RepositoryIcon";
import VisibilityTag from "components/visibilityTag/VisibilityTag";
import { IRepository } from "types";
import styles from "./Repository.module.scss";

interface Iprops {
  repository: IRepository;
}
function Repository(props: Iprops) {
  const { repository } = props;
  return (
    <div className={styles.repositoryContainer}>
      <div className={styles.repositoryNameContainer}>
        <RepositoryIcon />
        <span className={styles.repositoryName}>{repository.name}</span>
        <VisibilityTag isPrivate={repository.private} />
      </div>
      <p className={styles.repositoryDescription}>{repository.description}</p>
      <div className={styles.bottom}>
        {repository.language && (
          <div className={styles.languageContainer}>
            <div className={styles.languageDot} />
            <p>{repository.language}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Repository;
