import ProfileContext from "context/ProfileContext";
import { useContext } from "react";
import styles from "./Home.module.scss";

function Home() {
  const { profileError } = useContext(ProfileContext);

  return (
    <div className="container">
      {profileError && <span className={styles.error}>profile not found</span>}
      <h1>
        Enter a Github username to see the public repositories of the user.
      </h1>
    </div>
  );
}

export default Home;
