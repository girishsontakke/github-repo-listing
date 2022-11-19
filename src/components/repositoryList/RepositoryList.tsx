import { IRepository } from "types";
import Repository from "../repository/Repository";

interface Iprops {
  repositories: IRepository[];
}
function RepositoryList(props: Iprops) {
  const { repositories } = props;

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      {repositories.map((repository) => (
        <Repository key={repository.id} repository={repository} />
      ))}
    </div>
  );
}

export default RepositoryList;
